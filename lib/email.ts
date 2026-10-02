import "server-only";
import { Resend } from "resend";
import { isProduction, serverEnv } from "@/lib/server-env";

type Mail = { subject: string; text: string; html: string; replyTo?: string };

export class EmailNotConfiguredError extends Error {}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Builds a plain, accessible HTML table for an enquiry. All values are escaped. */
export function fieldsToHtml(title: string, fields: [label: string, value: string][]): string {
  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0;color:#56667e;font-weight:600">${escapeHtml(label)}</th>` +
        `<td style="padding:6px 0;color:#07182f;white-space:pre-wrap">${escapeHtml(value || "—")}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;font-size:14px"><h2 style="color:#06162e">${escapeHtml(title)}</h2><table>${rows}</table></div>`;
}

export function fieldsToText(title: string, fields: [label: string, value: string][]): string {
  return `${title}\n\n${fields.map(([l, v]) => `${l}: ${v || "—"}`).join("\n")}`;
}

let client: Resend | null = null;
function resend(): Resend | null {
  if (!serverEnv.RESEND_API_KEY) return null;
  client ??= new Resend(serverEnv.RESEND_API_KEY);
  return client;
}

/**
 * Sends a notification to the XBPL inbox.
 * - E2E=1: no-op (tests never send mail).
 * - Not configured in development: logs to the console so forms can be tried locally.
 * - Not configured in production: throws, and the action shows a friendly error.
 */
export async function sendNotification(mail: Mail): Promise<void> {
  if (serverEnv.E2E) return;
  const api = resend();
  if (!api || !serverEnv.CONTACT_TO_EMAIL || !serverEnv.CONTACT_FROM_EMAIL) {
    if (!isProduction) {
      console.warn(`[email] Not configured; would send:\n${mail.text}`);
      return;
    }
    throw new EmailNotConfiguredError("Email environment variables are missing.");
  }
  const { error } = await api.emails.send({
    from: serverEnv.CONTACT_FROM_EMAIL,
    to: serverEnv.CONTACT_TO_EMAIL,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    replyTo: mail.replyTo,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}

/** Adds a newsletter subscriber to the Resend segment when configured; otherwise notifies the inbox. */
export async function addSubscriber(email: string): Promise<void> {
  if (serverEnv.E2E) return;
  const api = resend();
  if (api && serverEnv.RESEND_SEGMENT_ID) {
    const { error } = await api.contacts.create({
      email,
      unsubscribed: false,
      segments: [{ id: serverEnv.RESEND_SEGMENT_ID }],
    });
    if (error) throw new Error(`Resend error: ${error.message}`);
    return;
  }
  const fields: [string, string][] = [["Email", email]];
  await sendNotification({
    subject: "New insights subscriber",
    text: fieldsToText("New newsletter sign-up", fields),
    html: fieldsToHtml("New newsletter sign-up", fields),
  });
}

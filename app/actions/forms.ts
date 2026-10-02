"use server";

import { headers } from "next/headers";
import { contact } from "@/content/pages/contact";
import {
  addSubscriber,
  EmailNotConfiguredError,
  fieldsToHtml,
  fieldsToText,
  sendNotification,
} from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  contactSchema,
  MIN_FILL_MS,
  newsletterSchema,
  type ContactInput,
  type FormResult,
  type NewsletterInput,
} from "@/lib/validation";

const GENERIC_ERROR = "Sorry, something went wrong. Please try again, or email us directly.";
const RATE_LIMITED =
  "You've sent several requests in a short time. Please try again in a few minutes.";

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/** Bots that fill the honeypot or submit instantly get a fake success and nothing is sent. */
function looksAutomated(website: string | undefined, startedAt: number): boolean {
  return Boolean(website) || Date.now() - startedAt < MIN_FILL_MS;
}

function flattenErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

export async function submitContact(input: ContactInput): Promise<FormResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error.issues),
    };
  }
  const data = parsed.data;
  if (looksAutomated(data.website, data.startedAt)) return { ok: true };

  if (!(await checkRateLimit("contact", await clientIp()))) {
    return { ok: false, message: RATE_LIMITED };
  }

  const interest =
    contact.form.interests.find((i) => i.value === data.interest)?.label ?? data.interest;
  const fields: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Interested in", interest],
    ["Message", data.message],
  ];
  const title = `New enquiry: ${interest}`;

  try {
    await sendNotification({
      subject: `${title} (${data.company})`,
      text: fieldsToText(title, fields),
      html: fieldsToHtml(title, fields),
      replyTo: data.email,
    });
    return { ok: true };
  } catch (err) {
    console.error(
      "[contact] send failed",
      err instanceof EmailNotConfiguredError ? err.message : err,
    );
    return { ok: false, message: GENERIC_ERROR };
  }
}

export async function subscribeNewsletter(input: NewsletterInput): Promise<FormResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
      fieldErrors: flattenErrors(parsed.error.issues),
    };
  }
  const data = parsed.data;
  if (looksAutomated(data.website, data.startedAt)) return { ok: true };

  if (!(await checkRateLimit("newsletter", await clientIp()))) {
    return { ok: false, message: RATE_LIMITED };
  }

  try {
    await addSubscriber(data.email);
    return { ok: true };
  } catch (err) {
    console.error("[newsletter] subscribe failed", err);
    return { ok: false, message: GENERIC_ERROR };
  }
}

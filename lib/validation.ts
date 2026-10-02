import * as z from "zod/mini";
import { contact } from "@/content/pages/contact";

/**
 * Shared form schemas: the client uses them for instant feedback, and the server
 * re-validates every submission with the same rules (the client is never trusted).
 *
 * Written with `zod/mini` (tree-shakable) because this module ships to the browser;
 * full `zod` is several hundred KB and is only used server-side.
 */

// Strip control characters (keeping newlines/tabs in messages) and trim.
const clean = (v: string) =>
  v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
const singleLine = (v: string) => clean(v).replace(/\s+/g, " ");

/** A string that is normalised (trimmed, control characters removed) before it is checked. */
const normalised = (fn: (v: string) => string) => z.pipe(z.string(), z.transform(fn));

const lengthBetween = (min: number, max: number, minMsg: string, maxMsg: string) =>
  z.string().check(z.minLength(min, minMsg), z.maxLength(max, maxMsg));

const EMAIL_MSG = "Please enter a valid email address.";
const PHONE_MSG = "Please enter a valid phone number.";

const emailField = z.pipe(
  normalised(singleLine),
  z.email(EMAIL_MSG).check(z.maxLength(254, EMAIL_MSG)),
);

const interestValues = contact.form.interests.map((i) => i.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.pipe(
    normalised(singleLine),
    lengthBetween(2, 100, "Please enter your name.", "Please keep this under 100 characters."),
  ),
  company: z.pipe(
    normalised(singleLine),
    lengthBetween(
      2,
      120,
      "Please enter your company name.",
      "Please keep this under 120 characters.",
    ),
  ),
  email: emailField,
  phone: z.pipe(
    normalised(singleLine),
    z.string().check(
      z.maxLength(30, PHONE_MSG),
      z.refine((v) => v === "" || /^\+?[0-9 ()\-.]{7,30}$/.test(v), PHONE_MSG),
    ),
  ),
  interest: z.enum(interestValues, { error: "Please choose an option." }),
  message: z.pipe(
    normalised(clean),
    lengthBetween(
      10,
      4000,
      "Please tell us a little more (at least 10 characters).",
      "Please keep your message under 4,000 characters.",
    ),
  ),
  consent: z.literal(true, { error: "Please agree so we can respond to your enquiry." }),
  /** Honeypot: humans never see or fill this. */
  website: z.optional(z.string().check(z.maxLength(200))),
  /** ms timestamp when the form was rendered; very fast submissions are treated as bots. */
  startedAt: z.number().check(z.gte(0)),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: emailField,
  website: z.optional(z.string().check(z.maxLength(200))),
  startedAt: z.number().check(z.gte(0)),
});

export type NewsletterInput = z.input<typeof newsletterSchema>;

/** Result shape returned by every form action. */
export type FormResult =
  { ok: true } | { ok: false; message: string; fieldErrors?: Partial<Record<string, string>> };

/** Submissions faster than this (ms) are almost certainly automated. */
export const MIN_FILL_MS = 2500;

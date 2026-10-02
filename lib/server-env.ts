import "server-only";
import { z } from "zod";

/** Server-only secrets. Importing this from a client component fails the build. */
const schema = z.object({
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.email().optional(),
  CONTACT_FROM_EMAIL: z.string().optional(),
  RESEND_SEGMENT_ID: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  E2E: z.literal("1").optional(),
});

const blankToUndefined = Object.fromEntries(
  Object.keys(schema.shape).map((k) => [k, process.env[k] === "" ? undefined : process.env[k]]),
);

export const serverEnv = schema.parse(blankToUndefined);

export const isProduction = process.env.NODE_ENV === "production";

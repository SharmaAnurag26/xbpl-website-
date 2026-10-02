"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle } from "lucide-react";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";
import { Field, FieldError, Honeypot, Input, Select, Textarea } from "@/components/ui/Field";
import type { ContactPageContent } from "@/content/types";
import { contactSchema, type ContactData, type ContactInput } from "@/lib/validation";

type ContactFormProps = { content: ContactPageContent["form"] };

export function ContactForm({ content }: ContactFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
      website: "",
      startedAt: 0,
    },
  });

  // Start the fill timer and preselect "I'm interested in" from ?interest=… links.
  useEffect(() => {
    setValue("startedAt", Date.now());
    const interest = new URLSearchParams(window.location.search).get("interest");
    if (interest && content.interests.some((i) => i.value === interest)) {
      setValue("interest", interest);
    }
  }, [setValue, content.interests]);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  async function submit(data: ContactData) {
    setServerError(null);
    const result = await submitContact(data);
    if (result.ok) {
      setSent(true);
      return;
    }
    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      if (message) setError(field as keyof ContactInput, { message });
    }
    setServerError(result.message);
    requestAnimationFrame(() => alertRef.current?.focus());
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-card border border-success/25 bg-success/5 p-8 text-center"
      >
        <CircleCheck aria-hidden className="mx-auto size-10 text-success" />
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-4 font-display text-xl font-semibold text-ink outline-none"
        >
          {content.successTitle}
        </h3>
        <p className="mt-2 text-muted">{content.successBody}</p>
      </div>
    );
  }

  const describedBy = (name: keyof ContactInput) =>
    errors[name] ? `contact-${name}-error` : undefined;

  return (
    <form
      onSubmit={(e) => void handleSubmit(submit)(e)}
      noValidate
      aria-describedby="contact-required-note"
      className="relative"
    >
      <p id="contact-required-note" className="mb-5 text-sm text-muted">
        Fields marked <span className="text-error">*</span> are required.
      </p>

      {serverError ? (
        <div
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="mb-5 rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm text-error outline-none"
        >
          {serverError}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label={content.labels.name} required error={errors.name?.message}>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder={content.placeholders.name}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            aria-required
            {...register("name")}
          />
        </Field>
        <Field
          id="contact-company"
          label={content.labels.company}
          required
          error={errors.company?.message}
        >
          <Input
            id="contact-company"
            autoComplete="organization"
            placeholder={content.placeholders.company}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            aria-required
            {...register("company")}
          />
        </Field>
        <Field
          id="contact-email"
          label={content.labels.email}
          required
          error={errors.email?.message}
        >
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={content.placeholders.email}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            aria-required
            {...register("email")}
          />
        </Field>
        <Field id="contact-phone" label={content.labels.phone} error={errors.phone?.message}>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={content.placeholders.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            {...register("phone")}
          />
        </Field>
        <Field
          id="contact-interest"
          label={content.labels.interest}
          required
          error={errors.interest?.message}
          className="sm:col-span-2"
        >
          <Select
            id="contact-interest"
            aria-invalid={!!errors.interest}
            aria-describedby={describedBy("interest")}
            aria-required
            {...register("interest")}
          >
            <option value="" disabled>
              {content.interestPlaceholder}
            </option>
            {content.interests.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          id="contact-message"
          label={content.labels.message}
          required
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <Textarea
            id="contact-message"
            rows={5}
            placeholder={content.placeholders.message}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            aria-required
            {...register("message")}
          />
        </Field>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="contact-consent"
              type="checkbox"
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-line accent-brand-text"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "contact-consent-error" : undefined}
              aria-required
              {...register("consent")}
            />
            <label htmlFor="contact-consent" className="text-sm leading-snug text-muted">
              {content.labels.consent}{" "}
              <NextLink
                href="/privacy"
                className="font-medium text-brand-text underline underline-offset-2"
              >
                Privacy Policy
              </NextLink>
              .
              <span className="text-error" aria-hidden>
                {" "}
                *
              </span>
            </label>
          </div>
          {errors.consent?.message ? (
            <FieldError id="contact-consent-error">{errors.consent.message}</FieldError>
          ) : null}
        </div>
      </div>

      <Honeypot {...register("website")} />

      <Button
        type="submit"
        size="lg"
        arrow={!isSubmitting}
        disabled={isSubmitting}
        className="mt-7 w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            {content.submittingLabel}
          </>
        ) : (
          content.submitLabel
        )}
      </Button>
    </form>
  );
}

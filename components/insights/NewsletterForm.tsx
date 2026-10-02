"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { subscribeNewsletter } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";
import { Honeypot, controlClass } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { newsletterSchema, type NewsletterInput } from "@/lib/validation";

type NewsletterFormProps = { placeholder: string; submitLabel: string };

export function NewsletterForm({ placeholder, submitLabel }: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", website: "", startedAt: 0 },
  });

  useEffect(() => setValue("startedAt", Date.now()), [setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const result = await subscribeNewsletter(data);
    setStatus(result.ok ? "done" : "error");
    setMessage(
      result.ok ? "Thanks for subscribing. Watch your inbox for new insights." : result.message,
    );
  });

  const errorText = errors.email?.message ?? (status === "error" ? message : "");

  if (status === "done") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm font-medium text-success">
        <CircleCheck aria-hidden className="size-5" />
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={placeholder}
          aria-invalid={!!errorText}
          aria-describedby={errorText ? "newsletter-error" : undefined}
          className={cn(controlClass, "h-11 flex-1")}
          {...register("email")}
        />
        <Button type="submit" disabled={isSubmitting} arrow={!isSubmitting}>
          {isSubmitting ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
          {submitLabel}
        </Button>
      </div>
      <Honeypot {...register("website")} />
      <p id="newsletter-error" role="alert" className="mt-2 min-h-5 text-sm text-error">
        {errorText}
      </p>
    </form>
  );
}

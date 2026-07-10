"use client";

import { useActionState } from "react";

import { submitContactForm } from "@/actions/contact";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import type { ContactFormState } from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { success: false };

const labelClass = "block text-sm font-medium text-brand-50";

const fieldClass =
  "mt-1 w-full rounded-xl border bg-base/60 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/25";

type ContactFormProps = {
  locale: Locale;
};

export function ContactForm({ locale }: ContactFormProps) {
  const messages = getMessages(locale);
  const boundAction = submitContactForm.bind(null, locale);
  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  if (state.success) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-emerald-200"
      >
        {messages.contact.form.success}
      </div>
    );
  }

  return (
    <form action={formAction} className="relative space-y-5" noValidate>
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      />

      <div>
        <label htmlFor="name" className={labelClass}>
          {messages.contact.form.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={!!state.fieldErrors?.name}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className={cn(
            fieldClass,
            state.fieldErrors?.name ? "border-red-400/70" : "border-border"
          )}
        />
        {state.fieldErrors?.name ? (
          <p id="name-error" className="mt-1 text-sm text-red-300" role="alert">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {messages.contact.form.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className={cn(
            fieldClass,
            state.fieldErrors?.email ? "border-red-400/70" : "border-border"
          )}
        />
        {state.fieldErrors?.email ? (
          <p id="email-error" className="mt-1 text-sm text-red-300" role="alert">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          {messages.contact.form.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={cn(fieldClass, "border-border")}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {messages.contact.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          className={cn(
            fieldClass,
            "resize-y",
            state.fieldErrors?.message ? "border-red-400/70" : "border-border"
          )}
        />
        {state.fieldErrors?.message ? (
          <p id="message-error" className="mt-1 text-sm text-red-300" role="alert">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      {state.error ? (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#1a1204] shadow-[0_16px_36px_-14px_var(--glow)] transition hover:bg-accent-strong disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
      >
        {isPending ? messages.contact.form.sending : messages.contact.form.submit}
      </button>
    </form>
  );
}

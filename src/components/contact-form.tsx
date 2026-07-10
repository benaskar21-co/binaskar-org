"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { validateContactInput } from "@/lib/contact/validate-contact";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import type { ContactFormState } from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { success: false };

const labelClass = "block text-sm font-medium text-brand-50";

const fieldClass =
  "mt-1 w-full rounded-xl border bg-base/60 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/25";

type FormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const emptyValues: FormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

type ContactFormProps = {
  locale: Locale;
};

type FormField = keyof FormValues;

export function ContactForm({ locale }: ContactFormProps) {
  const messages = getMessages(locale);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [state, setState] = useState<ContactFormState>(initialState);
  const [isPending, setIsPending] = useState(false);

  function handleFieldChange(field: FormField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [field]: value }));

      setState((current) => {
        const hasFieldError = Boolean(current.fieldErrors?.[field]);
        const hasGeneralError = Boolean(current.error);

        if (!hasFieldError && !hasGeneralError) {
          return current;
        }

        const nextFieldErrors = current.fieldErrors
          ? { ...current.fieldErrors, [field]: undefined }
          : undefined;

        const cleanedFieldErrors = nextFieldErrors
          ? Object.fromEntries(
              Object.entries(nextFieldErrors).filter(([, message]) => message)
            )
          : undefined;

        return {
          success: false,
          fieldErrors:
            cleanedFieldErrors && Object.keys(cleanedFieldErrors).length > 0
              ? cleanedFieldErrors
              : undefined,
          error: undefined,
        };
      });
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateContactInput(locale, {
      ...values,
      website: "",
    });

    if (!validation.ok) {
      setState({ success: false, fieldErrors: validation.fieldErrors });
      return;
    }

    setIsPending(true);

    const formData = new FormData();
    formData.set("locale", locale);
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("company", values.company);
    formData.set("message", values.message);
    formData.set("website", "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as ContactFormState;
      setState(result);
    } catch {
      setState({ success: false, error: messages.contact.form.error });
    } finally {
      setIsPending(false);
    }
  }

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
    <form onSubmit={handleSubmit} className="relative space-y-5" noValidate>
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
          value={values.name}
          onChange={handleFieldChange("name")}
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
          value={values.email}
          onChange={handleFieldChange("email")}
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
          value={values.company}
          onChange={handleFieldChange("company")}
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
          value={values.message}
          onChange={handleFieldChange("message")}
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

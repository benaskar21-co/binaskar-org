"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { validateContactInput } from "@/lib/contact/validate-contact";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import type { ContactFormState } from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { success: false };

const labelClass = "block text-sm font-semibold text-primary";

const fieldClass =
  "mt-2 w-full rounded-sm border bg-background/70 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground outline-none transition duration-200 focus:border-ring focus:bg-surface focus:ring-2 focus:ring-ring/20";

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
        className="border border-emerald-700/20 bg-emerald-50 p-6 text-emerald-900"
      >
        {messages.contact.form.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative" noValidate>
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      />

      <div className="grid gap-6 sm:grid-cols-2">
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
              state.fieldErrors?.name ? "border-destructive" : "border-border"
            )}
          />
          {state.fieldErrors?.name ? (
            <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">
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
              state.fieldErrors?.email ? "border-destructive" : "border-border"
            )}
          />
          {state.fieldErrors?.email ? (
            <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
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

      <div className="mt-6">
        <label htmlFor="message" className={labelClass}>
          {messages.contact.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={handleFieldChange("message")}
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          className={cn(
            fieldClass,
            "resize-y",
            state.fieldErrors?.message ? "border-destructive" : "border-border"
          )}
        />
        {state.fieldErrors?.message ? (
          <p id="message-error" className="mt-1 text-sm text-destructive" role="alert">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      {state.error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-sm bg-primary px-7 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-auto"
      >
        {isPending ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : null}
        {isPending ? messages.contact.form.sending : messages.contact.form.submit}
      </button>
    </form>
  );
}

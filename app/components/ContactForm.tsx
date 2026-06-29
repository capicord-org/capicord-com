"use client";

import { useState, FormEvent, FocusEvent, ChangeEvent } from "react";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";

type FormFields = { name: string; email: string; role: string; message: string };
type FormErrors = Partial<Record<keyof FormFields, string>>;
type Status = "idle" | "submitting" | "success" | "error";

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.role) errors.role = "Please select your role.";
  if (!fields.message.trim()) errors.message = "Please enter a message.";
  else if (fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

const EMPTY: FormFields = { name: "", email: "", role: "", message: "" };
const BASE =
  "w-full px-3.5 py-2.5 rounded-lg border text-[15px] text-site-text bg-white focus:outline-none focus:ring-2 transition-colors font-sans";
const VALID = "border-slate-200 focus:ring-teal/40 focus:border-teal";
const ERR = "border-red-400 focus:ring-red-200 focus:border-red-400";

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="text-[13px] text-red-500 mt-1 flex items-center gap-1">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
        <path d="M6 3.5v3M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {msg}
    </p>
  );
}

const ROLE_LABELS: Record<string, string> = {
  borrower: "Borrower",
  agent: "Agent / DSA",
  nbfc: "NBFC Partner",
};

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const next = { ...fields, [name]: value };
    setFields(next);
    if (touched[name as keyof FormFields]) setErrors(validate(next));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(fields));
  }

  function handleRoleChange(value: string) {
    const next = { ...fields, role: value };
    setFields(next);
    setTouched((t) => ({ ...t, role: true }));
    setErrors(validate(next));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, role: true, message: true });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `New Capicord enquiry from ${fields.name} (${ROLE_LABELS[fields.role] ?? fields.role})`,
          from_name: "Capicord Website",
          name: fields.name,
          email: fields.email,
          role: ROLE_LABELS[fields.role] ?? fields.role,
          message: fields.message,
          // redirect false keeps the response as JSON
          redirect: false,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFields(EMPTY);
        setTouched({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6" role="status" aria-live="polite">
        <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="19" stroke="#1A9378" strokeWidth="2" />
          <path d="M12 20l6 6 10-12" stroke="#1A9378" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-xl font-semibold text-teal mb-2">Message sent!</p>
        <p className="text-muted text-[15px]">We'll get back to you within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <Label.Root htmlFor="name" className="text-[14px] font-medium text-navy">
            Name <span className="text-red-500" aria-hidden="true">*</span>
          </Label.Root>
          <input
            id="name" name="name" type="text"
            value={fields.name} onChange={handleChange} onBlur={handleBlur}
            placeholder="Your name" autoComplete="name"
            aria-required="true"
            aria-invalid={touched.name ? (errors.name ? "true" : "false") : undefined}
            aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            className={`${BASE} ${touched.name && errors.name ? ERR : VALID}`}
          />
          {touched.name && <FieldError id="name-error" msg={errors.name} />}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <Label.Root htmlFor="email" className="text-[14px] font-medium text-navy">
            Email <span className="text-red-500" aria-hidden="true">*</span>
          </Label.Root>
          <input
            id="email" name="email" type="email"
            value={fields.email} onChange={handleChange} onBlur={handleBlur}
            placeholder="you@example.com" autoComplete="email"
            aria-required="true"
            aria-invalid={touched.email ? (errors.email ? "true" : "false") : undefined}
            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            className={`${BASE} ${touched.email && errors.email ? ERR : VALID}`}
          />
          {touched.email && <FieldError id="email-error" msg={errors.email} />}
        </div>
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1">
        <Label.Root htmlFor="role" className="text-[14px] font-medium text-navy">
          I am a <span className="text-red-500" aria-hidden="true">*</span>
        </Label.Root>
        <Select.Root value={fields.role} onValueChange={handleRoleChange}>
          <Select.Trigger
            id="role" aria-required="true"
            aria-invalid={touched.role ? (errors.role ? "true" : "false") : undefined}
            aria-describedby={touched.role && errors.role ? "role-error" : undefined}
            className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg border text-[15px] bg-white focus:outline-none focus:ring-2 transition-colors font-sans data-[placeholder]:text-slate-400 ${
              touched.role && errors.role ? ERR : VALID
            }`}
          >
            <Select.Value placeholder="Select role…" />
            <Select.Icon><ChevronDown /></Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-50 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
              <Select.Viewport className="p-1">
                {Object.entries(ROLE_LABELS).map(([value, label]) => (
                  <Select.Item
                    key={value} value={value}
                    className="px-3 py-2 text-[15px] text-site-text rounded-md cursor-pointer select-none data-[highlighted]:bg-site-bg data-[highlighted]:outline-none"
                  >
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        {touched.role && <FieldError id="role-error" msg={errors.role} />}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <Label.Root htmlFor="message" className="text-[14px] font-medium text-navy">
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </Label.Root>
        <textarea
          id="message" name="message" rows={4}
          value={fields.message} onChange={handleChange} onBlur={handleBlur}
          placeholder="How can we help?"
          aria-required="true"
          aria-invalid={touched.message ? (errors.message ? "true" : "false") : undefined}
          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
          className={`${BASE} resize-y ${touched.message && errors.message ? ERR : VALID}`}
        />
        {touched.message && <FieldError id="message-error" msg={errors.message} />}
      </div>

      {status === "error" && (
        <p role="alert" className="text-[14px] text-red-500 text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-teal hover:bg-teal-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-[16px] py-3.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

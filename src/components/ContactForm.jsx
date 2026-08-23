import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";
import { loadRecaptcha } from "../utils/loadRecaptcha";
import { useToast } from "../context/ToastContext";

// Contact form backend — Express server (see /server). Configure via
// VITE_API_URL in .env; defaults to the local dev server.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Google reCAPTCHA v3 site key — from https://www.google.com/recaptcha/admin.
// Leave VITE_RECAPTCHA_SITE_KEY unset to disable spam verification (dev only).
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const SERVICE_OPTIONS = [
  "Structural Audit",
  "Structural Design",
  "RCC Design",
  "Building Inspection",
  "Construction Consultancy",
  "Project Management",
  "Other",
];

const inputClass =
  "w-full rounded-xl border border-ink-900/10 bg-ink-50/40 px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500/50 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { showSuccess, showError } = useToast();

  // Warm up the reCAPTCHA script as soon as the form mounts so execute()
  // resolves instantly when the visitor actually submits.
  useEffect(() => {
    if (RECAPTCHA_SITE_KEY) {
      loadRecaptcha(RECAPTCHA_SITE_KEY).catch((err) => console.error("reCAPTCHA load failed:", err));
    }
  }, []);

  const onSubmit = async (data) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      let recaptchaToken = "";
      if (RECAPTCHA_SITE_KEY) {
        const grecaptcha = await loadRecaptcha(RECAPTCHA_SITE_KEY);
        recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "contact" });
      }

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          message: data.message,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send your message.");
      }

      setStatus("success");
      showSuccess(result.message || "Your message has been sent successfully.");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("Contact form send failed:", err);
      const reason = err?.message || "Unknown error";
      setErrorMessage(`Failed to send: ${reason}`);
      showError(reason);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 8000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-700">Full Name *</label>
          <input
            className={cn(inputClass, errors.name && "border-red-400")}
            placeholder="Your name"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">Name is required</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-700">Phone *</label>
          <input
            className={cn(inputClass, errors.phone && "border-red-400")}
            placeholder="+91 00000 00000"
            {...register("phone", { required: true, pattern: /^[6-9]\d{9}$/ })}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">Please enter a valid 10-digit phone number.</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">Email *</label>
        <input
          type="email"
          className={cn(inputClass, errors.email && "border-red-400")}
          placeholder="you@example.com"
          {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">A valid email is required</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">Service Required</label>
        <select className={inputClass} {...register("service")}>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">Message *</label>
        <textarea
          rows={4}
          className={cn(inputClass, "resize-none", errors.message && "border-red-400")}
          placeholder="Tell us about your building and requirements..."
          {...register("message", { required: true })}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">Message is required</p>}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-600 disabled:opacity-70"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "submitting" ? (
            <motion.span key="submitting" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending...
            </motion.span>
          ) : status === "success" ? (
            <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CheckCircle2 className="w-4 h-4" /> Message Sent
            </motion.span>
          ) : status === "error" ? (
            <motion.span key="error" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AlertCircle className="w-4 h-4" /> Failed — Try Again
            </motion.span>
          ) : (
            <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Send className="w-4 h-4" /> Send Message
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {status === "error" && errorMessage && (
        <p className="text-center text-xs text-red-500">{errorMessage}</p>
      )}
    </form>
  );
}

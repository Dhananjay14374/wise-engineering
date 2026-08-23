import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Loader2, Send, AlertCircle, UploadCloud, PartyPopper, RotateCcw } from "lucide-react";
import { cn } from "../utils/cn";
import { POSITION_OPTIONS, EXPERIENCE_OPTIONS, NOTICE_PERIOD_OPTIONS } from "../data/careers";
import { CONTACT } from "../constants/contact";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const inputClass =
  "w-full rounded-xl border border-ink-900/10 bg-ink-50/40 px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500/50 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";

const labelClass = "mb-1.5 block text-xs font-semibold text-ink-700";

export default function ApplicationForm({ defaultPosition = "" }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (defaultPosition) setValue("position", defaultPosition, { shouldValidate: true });
  }, [defaultPosition, setValue]);

  const resumeFiles = watch("resume");
  const resumeName = resumeFiles && resumeFiles.length > 0 ? resumeFiles[0].name : "";

  const onSubmit = async (data) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const missing = [
        !EMAILJS_SERVICE_ID && "VITE_EMAILJS_SERVICE_ID",
        !EMAILJS_TEMPLATE_ID && "VITE_EMAILJS_TEMPLATE_ID",
        !EMAILJS_PUBLIC_KEY && "VITE_EMAILJS_PUBLIC_KEY",
      ].filter(Boolean);
      if (missing.length > 0) {
        throw new Error(`Missing EmailJS configuration: ${missing.join(", ")}. Add these to your .env file.`);
      }

      const now = new Date();

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          fullName: data.fullName,
          email: data.email,
          phone: data.mobile,
          currentCity: data.currentCity,
          position: data.position,
          experience: data.experience,
          qualification: data.qualification,
          currentCompany: data.currentCompany || "—",
          currentCTC: data.currentCTC || "—",
          expectedCTC: data.expectedCTC || "—",
          noticePeriod: data.noticePeriod || "—",
          skills: data.skills || "—",
          resumeFileName: resumeName || "Not attached",
          coverLetter: data.coverLetter || "—",
          linkedin: data.linkedin || "—",
          portfolio: data.portfolio || "—",
          currentDate: now.toLocaleDateString("en-IN"),
          currentTime: now.toLocaleTimeString("en-IN"),
          reply_to: data.email,
          to_email: CONTACT.email,
          subject: `Job Application: ${data.position} — ${data.fullName}`,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      console.log("Application sent successfully", result);
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Application submission failed — full error:", err);
      const reason = err?.text || err?.message || "Unknown error";
      setErrorMessage(`Failed to submit: ${reason}`);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 8000);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/95 text-center backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/10 text-brand-500"
            >
              <PartyPopper className="h-10 w-10" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-xl font-bold text-ink-900"
            >
              Application Submitted!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-2 max-w-xs text-sm text-ink-500"
            >
              Thank you for applying to WISE Engineering Consultants. Our HR team will review your profile and get back to you soon.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              className={cn(inputClass, errors.fullName && "border-red-400")}
              placeholder="Your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              className={cn(inputClass, errors.email && "border-red-400")}
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
              })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Mobile Number *</label>
            <input
              type="tel"
              className={cn(inputClass, errors.mobile && "border-red-400")}
              placeholder="98765 43210"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
              })}
            />
            {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Current City *</label>
            <input
              className={cn(inputClass, errors.currentCity && "border-red-400")}
              placeholder="Mumbai"
              {...register("currentCity", { required: "Current city is required" })}
            />
            {errors.currentCity && <p className="mt-1 text-xs text-red-500">{errors.currentCity.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Position Applying For *</label>
            <select
              className={cn(inputClass, errors.position && "border-red-400")}
              defaultValue=""
              {...register("position", { required: "Please select a position" })}
            >
              <option value="" disabled>
                Select a position
              </option>
              {POSITION_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Experience *</label>
            <select
              className={cn(inputClass, errors.experience && "border-red-400")}
              defaultValue=""
              {...register("experience", { required: "Please select your experience" })}
            >
              <option value="" disabled>
                Select experience
              </option>
              {EXPERIENCE_OPTIONS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Qualification *</label>
            <input
              className={cn(inputClass, errors.qualification && "border-red-400")}
              placeholder="e.g. B.E. Civil Engineering"
              {...register("qualification", { required: "Qualification is required" })}
            />
            {errors.qualification && <p className="mt-1 text-xs text-red-500">{errors.qualification.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Current Company</label>
            <input className={inputClass} placeholder="If currently employed" {...register("currentCompany")} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Current CTC</label>
            <input className={inputClass} placeholder="e.g. 3.5 LPA" {...register("currentCTC")} />
          </div>
          <div>
            <label className={labelClass}>Expected CTC</label>
            <input className={inputClass} placeholder="e.g. 4.5 LPA" {...register("expectedCTC")} />
          </div>
          <div>
            <label className={labelClass}>Notice Period</label>
            <select className={inputClass} defaultValue="" {...register("noticePeriod")}>
              <option value="" disabled>
                Select notice period
              </option>
              {NOTICE_PERIOD_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Skills</label>
          <input className={inputClass} placeholder="e.g. AutoCAD, STAAD Pro, Site Supervision" {...register("skills")} />
        </div>

        <div>
          <label className={labelClass}>Resume Upload (PDF/DOC) *</label>
          <label
            htmlFor="resume"
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-4 py-4 text-sm transition-colors",
              errors.resume
                ? "border-red-400 bg-red-50/40"
                : "border-ink-900/15 bg-ink-50/40 hover:border-brand-500 hover:bg-brand-50/40"
            )}
          >
            <UploadCloud className={cn("h-5 w-5 shrink-0", errors.resume ? "text-red-400" : "text-brand-500")} />
            <span className={resumeName ? "font-semibold text-ink-900" : "text-ink-500/70"}>
              {resumeName || "Click to upload your resume (PDF, DOC or DOCX, max 5MB)"}
            </span>
          </label>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            {...register("resume", {
              validate: {
                required: (files) => (files && files.length > 0) || "Resume upload is required",
                fileType: (files) => {
                  if (!files || files.length === 0) return true;
                  const name = files[0].name.toLowerCase();
                  return (
                    name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx") ||
                    "Only PDF, DOC or DOCX files are allowed"
                  );
                },
                fileSize: (files) => {
                  if (!files || files.length === 0) return true;
                  return files[0].size <= MAX_RESUME_BYTES || "File size must be under 5MB";
                },
              },
            })}
          />
          {errors.resume && <p className="mt-1 text-xs text-red-500">{errors.resume.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Cover Letter</label>
          <textarea
            rows={4}
            className={cn(inputClass, "resize-none")}
            placeholder="Tell us why you'd be a great fit for WISE..."
            {...register("coverLetter")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>LinkedIn Profile</label>
            <input
              className={cn(inputClass, errors.linkedin && "border-red-400")}
              placeholder="https://linkedin.com/in/yourname"
              {...register("linkedin", {
                validate: (v) => !v || /^https?:\/\/.+/i.test(v) || "Enter a valid URL starting with http(s)://",
              })}
            />
            {errors.linkedin && <p className="mt-1 text-xs text-red-500">{errors.linkedin.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Portfolio Website</label>
            <input
              className={cn(inputClass, errors.portfolio && "border-red-400")}
              placeholder="https://yourportfolio.com"
              {...register("portfolio", {
                validate: (v) => !v || /^https?:\/\/.+/i.test(v) || "Enter a valid URL starting with http(s)://",
              })}
            />
            {errors.portfolio && <p className="mt-1 text-xs text-red-500">{errors.portfolio.message}</p>}
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            type="checkbox"
            className={cn("mt-0.5 h-4 w-4 shrink-0 rounded accent-brand-500", errors.agree && "outline outline-1 outline-red-400")}
            {...register("agree", { required: "You must agree to the Privacy Policy" })}
          />
          <span>I agree to the Privacy Policy.</span>
        </label>
        {errors.agree && <p className="-mt-3 text-xs text-red-500">{errors.agree.message}</p>}

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-ink-900/15 px-6 py-4 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-50 sm:w-auto"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "submitting"}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-600 disabled:opacity-70"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "submitting" ? (
                <motion.span key="submitting" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </motion.span>
              ) : status === "success" ? (
                <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CheckCircle2 className="w-4 h-4" /> Submitted
                </motion.span>
              ) : status === "error" ? (
                <motion.span key="error" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AlertCircle className="w-4 h-4" /> Failed — Try Again
                </motion.span>
              ) : (
                <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Send className="w-4 h-4" /> Submit Application
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {status === "error" && errorMessage && <p className="text-center text-xs text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
}

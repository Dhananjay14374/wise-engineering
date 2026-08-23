import { motion } from "framer-motion";
import Breadcrumb from "./ui/Breadcrumb";

export default function PageHero({ eyebrow, title, description, breadcrumb = [] }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pt-24 pb-10 md:pt-28 md:pb-12">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-500/20 blur-[100px]" />
      <div className="absolute -bottom-32 left-[-10%] h-80 w-80 rounded-full bg-brand-600/10 blur-[100px]" />

      <div className="relative container-page">
        <Breadcrumb items={breadcrumb} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-3xl"
        >
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
              <span className="h-2 w-2 rounded-sm bg-brand-500" />
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-lg text-white/60 leading-relaxed">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

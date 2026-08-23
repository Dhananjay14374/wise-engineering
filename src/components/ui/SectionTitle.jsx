import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4",
            light ? "text-brand-300" : "text-brand-600"
          )}
        >
          <span className="h-2 w-2 rounded-sm bg-brand-500" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-tight",
          light ? "text-white" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            light ? "text-white/70" : "text-ink-500"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const MotionLink = motion.create(Link);

/**
 * The single source of truth for the card shell used across the site —
 * extracted verbatim from the Industries page card (previously IndustryCard.jsx).
 * Every card (icon, title, description, or otherwise) should render its
 * content inside this shell instead of re-implementing the dark
 * background / gradient overlay / hover glow independently.
 */
export default function DarkCard({
  children,
  index = 0,
  hover = true,
  layout = false,
  className,
  contentClassName,
  href,
  to,
  ...rest
}) {
  const MotionTag = to ? MotionLink : href ? motion.a : motion.div;
  return (
    <MotionTag
      to={to}
      href={href}
      layout={layout}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={hover ? { y: -6 } : undefined}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-ink-900 p-8 text-white",
        className
      )}
      {...rest}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
      <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-brand-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
    </MotionTag>
  );
}

/** The icon box treatment used inside every DarkCard. */
export function DarkCardIcon({ children, className }) {
  return (
    <div
      className={cn(
        "mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-brand-300 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white",
        className
      )}
    >
      {children}
    </div>
  );
}

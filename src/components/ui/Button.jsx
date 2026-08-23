import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import Icon from "./Icon";

const VARIANTS = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25",
  dark: "bg-ink-900 text-white hover:bg-ink-800",
  outline:
    "border-2 border-white/30 text-white hover:bg-white hover:text-ink-900",
  "outline-dark":
    "border-2 border-ink-900/15 text-ink-900 hover:bg-ink-900 hover:text-white",
  ghost: "text-brand-600 hover:bg-brand-50",
};

const SIZES = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 whitespace-nowrap",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <Icon name={icon} className="w-4 h-4" />}
      {children}
      {icon && iconPosition === "right" && <Icon name={icon} className="w-4 h-4" />}
    </>
  );

  const wrap = (el) => (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      {el}
    </motion.span>
  );

  if (to) {
    return wrap(
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return wrap(
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  return wrap(
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

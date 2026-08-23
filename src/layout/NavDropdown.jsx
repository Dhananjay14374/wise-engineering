import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function NavDropdown({ label, items, active, light, className = "" }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const closeMenu = (focusTrigger = false) => {
    clearCloseTimer();
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openMenu();
            requestAnimationFrame(() => {
              rootRef.current?.querySelector('[role="menuitem"]')?.focus();
            });
          }
        }}
        className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          active
            ? "text-brand-500"
            : light
            ? "text-white/85 hover:text-white"
            : "text-ink-700 hover:text-brand-500"
        }`}
      >
        {active && (
          <motion.span
            layoutId="nav-active-pill"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className="absolute inset-0 -z-10 rounded-full bg-brand-500/15 ring-1 ring-brand-500/25"
          />
        )}
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-2 w-60 -translate-x-1/2 rounded-xl border border-ink-900/[0.06] bg-white/95 p-2 shadow-[0_20px_45px_-12px_rgba(11,15,25,0.25)] backdrop-blur-md"
          >
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                role="menuitem"
                onClick={() => closeMenu()}
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeMenu(true);
                }}
                className={({ isActive }) =>
                  `block rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 text-brand-600"
                      : "text-ink-700 hover:bg-ink-50 hover:text-brand-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion } from "framer-motion";
import Icon from "./ui/Icon";

export default function HiringStepper({ steps = [] }) {
  return (
    <>
      {/* Desktop — horizontal stepper */}
      <div className="relative hidden lg:grid lg:grid-cols-6 lg:gap-4">
        <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex flex-col items-center text-center"
          >
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-ink-900 text-brand-300 ring-4 ring-white">
              <Icon name={s.icon} className="w-6 h-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                {s.step}
              </span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-ink-900">{s.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{s.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile / tablet — vertical stepper */}
      <div className="relative space-y-8 lg:hidden">
        <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500 via-ink-900/15 to-transparent" />
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex items-start gap-5"
          >
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-900 text-brand-300 ring-4 ring-white">
              <Icon name={s.icon} className="w-6 h-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                {s.step}
              </span>
            </div>
            <div className="pt-2.5">
              <h3 className="text-sm font-bold text-ink-900">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

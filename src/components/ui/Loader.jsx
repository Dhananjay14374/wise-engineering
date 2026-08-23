import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900">
      <div className="flex items-end gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="w-2 rounded-full bg-brand-500"
            animate={{ height: ["12px", "36px", "12px"] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

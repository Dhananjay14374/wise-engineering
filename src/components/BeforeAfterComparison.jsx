import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageOff } from "lucide-react";

export default function BeforeAfterComparison({ before = [], after = [] }) {
  const [mode, setMode] = useState("before");

  if (before.length === 0 && after.length === 0) return null;

  const active = mode === "before" ? before : after;

  return (
    <div>
      <div className="inline-flex rounded-full bg-ink-100 p-1">
        {["before", "after"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`relative rounded-full px-6 py-2 text-sm font-bold capitalize transition-colors ${
              mode === m ? "text-white" : "text-ink-600 hover:text-ink-900"
            }`}
          >
            {mode === m && (
              <motion.span
                layoutId="before-after-pill"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                className="absolute inset-0 -z-10 rounded-full bg-ink-900"
              />
            )}
            {m}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {active.length === 0 ? (
            <p className="col-span-full text-sm text-ink-500">No {mode} photo available for this project.</p>
          ) : (
            active.map((src, i) => (
              <div
                key={src}
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-ink-100 text-ink-300"
              >
                <ImageOff className="h-8 w-8" />
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

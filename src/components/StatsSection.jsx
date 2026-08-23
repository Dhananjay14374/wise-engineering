import { motion } from "framer-motion";
import Counter from "./ui/Counter";
import Icon from "./ui/Icon";
import { STATS } from "../data/stats";

export default function StatsSection({ dark = true, stats = STATS, columns = "lg:grid-cols-6" }) {
  return (
    <div
      className={`grid grid-cols-2 gap-6 md:grid-cols-3 ${columns} ${
        dark ? "text-white" : "text-ink-900"
      }`}
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="text-center"
        >
          <div
            className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${
              dark ? "bg-white/10 text-brand-300" : "bg-brand-50 text-brand-600"
            }`}
          >
            <Icon name={s.icon} className="w-6 h-6" />
          </div>
          <div className="text-3xl md:text-4xl font-bold">
            <Counter value={s.value} suffix={s.suffix} />
          </div>
          <div className={`mt-1 text-xs md:text-sm ${dark ? "text-white/50" : "text-ink-500"}`}>
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

import { motion } from "framer-motion";
import Counter from "../components/ui/Counter";
import Icon from "../components/ui/Icon";
import { CAREER_STATS } from "../data/careers";

export default function CareerStats() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="grid gap-6 sm:grid-cols-3">
          {CAREER_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-ink-900/[0.06] p-8 text-center transition-shadow hover:shadow-xl hover:shadow-brand-500/5"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={s.icon} className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold text-ink-900 md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-base font-semibold text-ink-900">{s.label}</div>
              <div className="mt-1 text-sm text-ink-500">{s.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

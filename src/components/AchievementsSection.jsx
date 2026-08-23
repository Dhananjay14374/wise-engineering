import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";
import Counter from "./ui/Counter";
import Icon from "./ui/Icon";
import { ACHIEVEMENTS } from "../data/stats";

export default function AchievementsSection() {
  return (
    <section className="section-pad border-t border-ink-900/[0.06] bg-ink-50/60">
      <div className="container-page">
        <SectionTitle
          eyebrow="Nationwide Growth"
          title="Expanding Our Engineering Excellence Across India"
          description="Rooted in Maharashtra • Trusted by Clients • Growing Nationwide"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group flex h-full flex-col items-center rounded-2xl border border-ink-900/[0.06] bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                <Icon name={a.icon} className="w-7 h-7" />
              </div>
              <div className="text-3xl font-bold text-ink-900 md:text-4xl">
                {typeof a.value === "number" ? (
                  <Counter value={a.value} suffix={a.suffix} />
                ) : (
                  a.value
                )}
              </div>
              <div className="mt-2 text-sm font-semibold text-ink-500">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import { WHY_JOIN_WISE } from "../data/careers";

export default function CareerWhyJoin() {
  return (
    <section className="section-pad relative overflow-hidden bg-ink-900">
      <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="relative container-page">
        <SectionTitle
          eyebrow="Why Join WISE"
          title="A place to grow, build and belong"
          description="More than a job — a team where your work directly shapes safer buildings and a stronger career."
          light
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_JOIN_WISE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-brand-500/40 hover:bg-white/[0.06]"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 300, damping: 14, delay: i * 0.07 + 0.15 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-300"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

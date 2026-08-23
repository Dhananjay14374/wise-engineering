import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { WHY_CHOOSE_US } from "../data/whyChooseUs";

export default function HomeWhyChooseUs() {
  const featured = WHY_CHOOSE_US.slice(0, 6);
  return (
    <section className="section-pad bg-ink-900 relative overflow-hidden">
      <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="relative container-page">
        <SectionTitle
          eyebrow="Why Choose Us"
          title="Seventeen years of expertise you can build on"
          description="A tailored, hands-on approach — not a generic template — for every society and every building."
          light
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-brand-500/40 hover:bg-white/[0.06]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                <Icon name={item.icon} className="w-5 h-5" />
              </div>
              <h3 className="card-title text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button to="/why-choose-us" variant="outline" icon="ArrowRight">
            See All 14 Reasons
          </Button>
        </div>
      </div>
    </section>
  );
}

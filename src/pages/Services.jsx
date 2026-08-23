import { motion } from "framer-motion";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import CTASection from "../components/CTASection";
import DarkCard, { DarkCardIcon } from "../components/ui/DarkCard";
import { CORE_SERVICES, ADDITIONAL_SERVICES } from "../data/services";

const IMAGES = [
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1590644365607-1c5a3f0f1a1a?auto=format&fit=crop&w=900&q=80",
];

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Structural audits, building repair PMC, project supervision, budget planning, regulatory compliance, sustainability solutions and maintenance consultation."
        path="/services"
      />
      <PageHero
        eyebrow="What We Do"
        title="Comprehensive engineering services, end to end"
        description="From the first structural audit to the final quality sign-off, we own every stage of your building's repair journey."
        breadcrumb={[{ label: "Services" }]}
      />

      {/* Overview grid */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionTitle
            eyebrow="Our Core Services"
            title="Seven specialized services, one accountable partner"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((s, i) => (
              <DarkCard key={s.slug} href={`#${s.slug}`} index={i}>
                <DarkCardIcon>
                  <Icon name={s.icon} className="w-7 h-7" />
                </DarkCardIcon>
                <h3 className="card-title">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{s.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-300">
                  Learn more <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                </span>
              </DarkCard>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated section per service */}
      {CORE_SERVICES.map((s, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            id={s.slug}
            key={s.slug}
            className={`section-pad scroll-mt-24 ${isEven ? "bg-ink-50/60" : "bg-white"}`}
          >
            <div className="container-page">
              <div
                className={`grid gap-14 lg:grid-cols-2 lg:items-center ${
                  isEven ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <img
                    src={IMAGES[i % IMAGES.length]}
                    alt={s.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
                  <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-lg">
                    <Icon name={s.icon} className="w-6 h-6" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                    Service {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="mt-3 text-3xl font-bold text-ink-900">{s.title}</h2>
                  <p className="mt-4 text-ink-500 leading-relaxed">{s.description}</p>
                  <div className="mt-6 rounded-xl border-l-4 border-brand-500 bg-white p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-600">
                      In Practice
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.example}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Additional services */}
      <section className="section-pad bg-ink-900">
        <div className="container-page">
          <SectionTitle
            eyebrow="Beyond Repair & Audit"
            title="Additional services under one roof"
            light
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ADDITIONAL_SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                  <Icon name={s.icon} className="w-5 h-5" />
                </div>
                <h3 className="card-title text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/contact" icon="ArrowRight">
              Discuss Your Requirement
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

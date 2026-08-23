import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import Icon from "../components/ui/Icon";
import DarkCard, { DarkCardIcon } from "../components/ui/DarkCard";
import Timeline from "../components/Timeline";
import StatsSection from "../components/StatsSection";
import AchievementsSection from "../components/AchievementsSection";
import CTASection from "../components/CTASection";
import { CORE_VALUES } from "../data/values";
import { LEADERSHIP, LICENSES } from "../data/team";
import { TIMELINE } from "../data/stats";

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="17+ years of structural audit and PMC expertise. Meet the licensed engineers behind Wise Engineering Consultants and our mission to redefine safety in building repair."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title="Seventeen years of structural ingenuity"
        description="We're the crucial link between municipal corporations and housing societies — turning compliance requirements into safer, longer-lasting buildings."
        breadcrumb={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="section-pad bg-white">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80"
              alt="Wise Engineering team on a site inspection"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <div>
            <SectionTitle
              eyebrow="Our Story"
              title="Acting as the crucial link between municipalities and societies"
            />
            <div className="mt-5 space-y-4 text-ink-500 leading-relaxed">
              <p>
                With over 17 years of experience, we are a trusted partner for
                building repair and structural audit services. Having worked
                under leading municipal corporations like VVCMC, BMC, TMC,
                NMMC, and MBMC, and equipped with State-level licenses, we
                specialize in delivering tailored, reliable, and
                cost-effective solutions for residential, commercial, and
                industrial buildings.
              </p>
              <p>
                We deliver lasting value through innovative solutions. In one
                recent project, we helped a housing society save 15% in
                repair costs by incorporating modern techniques and
                sustainable materials, while maintaining safety standards and
                project timelines — extending the building's lifespan by
                over 20 years.
              </p>
              <p>
                Whether it's a small repair or a large project, we provide
                solutions that give you peace of mind, ensuring the continued
                safety, quality, and value of your property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-pad bg-ink-50/60">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To provide exceptional structural audit and PMC services that prioritize safety, sustainability and efficiency — helping communities extend the lifespan of their properties through tailored, cost-effective solutions that exceed client expectations.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To be a leader in the building repair and management consultancy industry, setting new standards for safety, quality and sustainability — becoming the most trusted partner for residential, commercial and industrial building projects.",
              },
            ].map((v, i) => (
              <DarkCard key={v.title} index={i}>
                <DarkCardIcon>
                  <v.icon className="w-7 h-7" strokeWidth={1.8} />
                </DarkCardIcon>
                <h3 className="card-title">{v.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{v.text}</p>
              </DarkCard>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionTitle eyebrow="What Drives Us" title="Our Core Values" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((v, i) => (
              <DarkCard key={v.title} index={i}>
                <DarkCardIcon>
                  <Icon name={v.icon} className="w-7 h-7" />
                </DarkCardIcon>
                <h3 className="card-title">{v.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{v.description}</p>
              </DarkCard>
            ))}
          </div>
        </div>
      </section>

      {/* Company Achievements */}
      <AchievementsSection />

      {/* Stats */}
      <section className="section-pad bg-ink-900">
        <div className="container-page">
          <StatsSection />
        </div>
      </section>

      {/* Leadership */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionTitle eyebrow="Leadership" title="Meet the team behind every project" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((p, i) => (
              <DarkCard key={p.name} index={i}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white">
                  {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <h3 className="mt-4 card-title">{p.name}</h3>
                <div className="text-xs font-semibold text-brand-300">{p.role}</div>
                <div className="mt-0.5 text-xs text-white/50">{p.credentials}</div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{p.bio}</p>
              </DarkCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-ink-50/60">
        <div className="mx-auto max-w-5xl container-px">
          <SectionTitle eyebrow="Milestones" title="Our journey so far" align="center" />
          <div className="mt-16">
            <Timeline items={TIMELINE} />
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl container-px">
          <SectionTitle eyebrow="Empanelment" title="Licensed across six municipal jurisdictions" align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LICENSES.map((l) => (
              <div
                key={l.authority}
                className="flex items-center gap-3 rounded-xl border border-ink-900/[0.06] px-5 py-4"
              >
                <ShieldCheck className="h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <div className="text-sm font-bold text-ink-900">{l.authority}</div>
                  <div className="text-xs text-ink-500">License No. {l.number}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

import { Quote, Star } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import TestimonialSlider from "../components/TestimonialSlider";
import ClientLogos from "../components/ClientLogos";
import CTASection from "../components/CTASection";
import DarkCard from "../components/ui/DarkCard";
import { TESTIMONIALS } from "../data/testimonials";
import { AUDIT_CLIENTS } from "../data/projects";

export default function Testimonials() {
  return (
    <>
      <Seo
        title="Testimonials"
        description="Hear from housing society secretaries, chairpersons and managing committees who have worked with Wise Engineering Consultants on structural audits and repair projects."
        path="/testimonials"
      />
      <PageHero
        eyebrow="Client Voices"
        title="What managing committees say about working with us"
        description="Real feedback from the societies who trusted us with their buildings."
        breadcrumb={[{ label: "Testimonials" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <TestimonialSlider items={TESTIMONIALS} />
        </div>
      </section>

      <section className="section-pad bg-ink-50/60">
        <div className="container-page">
          <SectionTitle eyebrow="More Feedback" title="In their own words" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <DarkCard key={t.name} index={i % 4}>
                <Quote className="w-7 h-7 text-brand-300 mb-3" strokeWidth={1.5} />
                <p className="text-sm leading-relaxed text-white/80">"{t.quote}"</p>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                </div>
              </DarkCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-ink-900/[0.05]">
        <div className="container-page">
          <SectionTitle
            eyebrow="Societies We've Served"
            title="Join 5,000+ satisfied buildings"
            align="center"
            className="mb-10"
          />
          <ClientLogos items={AUDIT_CLIENTS} />
        </div>
      </section>

      <CTASection />
    </>
  );
}

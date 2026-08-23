import { Sparkles } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import CTASection from "../components/CTASection";
import DarkCard from "../components/ui/DarkCard";
import { PROCESS_STEPS } from "../data/process";

export default function Process() {
  return (
    <>
      <Seo
        title="Our Process"
        description="An eight-step methodology — from initial consultation and detailed structural audit through hands-on project management to post-project maintenance."
        path="/process"
      />
      <PageHero
        eyebrow="Our Process"
        title="A practical, clear-cut approach to every project"
        description="Eight steps that take a building from first concern to certified, guaranteed repair — with full visibility at every stage."
        breadcrumb={[{ label: "Process" }]}
      />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl container-px">
          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 hidden w-px bg-gradient-to-b from-brand-500 via-ink-900/10 to-transparent sm:block" />
            <div className="space-y-6">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.step} className="relative flex flex-col gap-5 sm:flex-row sm:gap-8">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-lg font-bold text-white ring-4 ring-white">
                    {step.step}
                  </div>
                  <DarkCard index={i % 4} className="flex-1">
                    <h3 className="card-title">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-white/5 p-4">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                      <p className="text-sm leading-relaxed text-white/70">
                        <span className="font-bold text-white">Why we stand out: </span>
                        {step.standout}
                      </p>
                    </div>
                  </DarkCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to start with Step 1?"
        description="Book your free initial consultation and tell us about your building."
      />
    </>
  );
}

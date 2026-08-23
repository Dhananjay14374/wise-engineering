import { CheckCircle2 } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import Icon from "../components/ui/Icon";
import CTASection from "../components/CTASection";
import DarkCard, { DarkCardIcon } from "../components/ui/DarkCard";
import { SOLUTIONS } from "../data/solutions";

export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions"
        description="End-to-end solutions: structural audit & NDT testing, repair project management, redevelopment advisory, facade & waterproofing, compliance liaisoning and long-term maintenance."
        path="/solutions"
      />
      <PageHero
        eyebrow="Solutions"
        title="Purpose-built solutions for every repair challenge"
        description="Each solution pairs technical rigor with hands-on project management — designed around your building's real condition, not a template."
        breadcrumb={[{ label: "Solutions" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            {SOLUTIONS.map((sol, i) => (
              <DarkCard key={sol.title} index={i % 2}>
                <DarkCardIcon>
                  <Icon name={sol.icon} className="w-7 h-7" />
                </DarkCardIcon>
                <h3 className="card-title">{sol.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{sol.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {sol.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                      {p}
                    </li>
                  ))}
                </ul>
              </DarkCard>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which solution fits your building?"
        description="Send us a few photos and your building's age — we'll recommend a starting point, free of charge."
      />
    </>
  );
}

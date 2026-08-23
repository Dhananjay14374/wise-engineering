import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Icon from "../components/ui/Icon";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import DarkCard, { DarkCardIcon } from "../components/ui/DarkCard";
import { WHY_CHOOSE_US } from "../data/whyChooseUs";

export default function WhyChooseUs() {
  return (
    <>
      <Seo
        title="Why Choose Us"
        description="Fourteen reasons societies and building owners across Mumbai trust Wise Engineering Consultants for structural audits and repair PMC."
        path="/why-choose-us"
      />
      <PageHero
        eyebrow="Why Choose Us"
        title="Fourteen reasons we're trusted, project after project"
        description="No generic templates. No delegated supervision. Just a tailored, hands-on partner from first inspection to final sign-off."
        breadcrumb={[{ label: "Why Choose Us" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.map((item, i) => (
              <DarkCard key={item.title} index={i % 6}>
                <span className="absolute -right-2 -top-4 text-6xl font-extrabold text-white/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <DarkCardIcon>
                  <Icon name={item.icon} className="w-7 h-7" />
                </DarkCardIcon>
                <h3 className="relative card-title">{item.title}</h3>
                <p className="relative text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </DarkCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink-900">
        <div className="container-page">
          <StatsSection />
        </div>
      </section>

      <CTASection />
    </>
  );
}

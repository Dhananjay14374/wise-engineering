import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import IndustryCard from "../components/IndustryCard";
import CTASection from "../components/CTASection";
import { INDUSTRIES } from "../data/industries";

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Serve"
        description="Structural audit and repair expertise across residential societies, commercial complexes, industrial facilities, educational institutions, government buildings and redevelopment projects."
        path="/industries"
      />
      <PageHero
        eyebrow="Industries"
        title="Sector-specific expertise, building by building"
        description="Every building type has different failure modes, regulations and stakeholders. Ours is a sector-informed approach."
        breadcrumb={[{ label: "Industries" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionTitle
            eyebrow="Who We Work With"
            title="Six sectors, one consistent standard of care"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <IndustryCard key={ind.title} {...ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Don't see your building type listed?"
        description="Our audit methodology adapts to any structure. Reach out and we'll scope your project."
      />
    </>
  );
}

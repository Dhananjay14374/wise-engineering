import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import IndustryCard from "../components/IndustryCard";
import { INDUSTRIES } from "../data/industries";

export default function HomeIndustries() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionTitle
            eyebrow="Industries We Serve"
            title="Built on deep, sector-specific experience"
            description="From residential societies to industrial facilities, our audits and repair programs are shaped by the realities of each sector."
          />
          <Button to="/industries" variant="outline-dark" icon="ArrowRight" className="shrink-0">
            All Industries
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard key={ind.title} {...ind} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

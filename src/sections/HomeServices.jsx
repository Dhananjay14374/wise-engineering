import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import ServiceCard from "../components/ServiceCard";
import { CORE_SERVICES } from "../data/services";

export default function HomeServices() {
  return (
    <section className="section-pad bg-ink-50/40">
      <div className="container-page">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionTitle
            eyebrow="What We Do"
            title="Comprehensive services for every stage of your building's life"
            description="From the first crack you notice to the final quality sign-off, we manage the full lifecycle of structural safety."
          />
          <Button to="/services" variant="outline-dark" icon="ArrowRight" className="shrink-0">
            All Services
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_SERVICES.slice(0, 4).map((s, i) => (
            <ServiceCard key={s.slug} icon={s.icon} title={s.title} summary={s.summary} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

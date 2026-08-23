import SectionTitle from "../components/ui/SectionTitle";
import StatsSection from "../components/StatsSection";

export default function HomeStats() {
  return (
    <section className="section-pad bg-ink-50/60">
      <div className="container-page">
        <SectionTitle
          eyebrow="Track Record"
          title="Numbers that reflect our commitment"
          align="center"
        />
        <div className="mt-14">
          <StatsSection dark={false} />
        </div>
      </div>
    </section>
  );
}

import SectionTitle from "../components/ui/SectionTitle";
import JobCard from "../components/JobCard";
import { OPEN_ROLES } from "../data/careers";

export default function CareerOpenPositions({ onApply }) {
  return (
    <section id="open-positions" className="section-pad scroll-mt-20 bg-ink-50/60">
      <div className="container-page">
        <SectionTitle
          eyebrow="Open Positions"
          title="Current openings at WISE"
          description="We're currently focused on Mumbai City and growing — explore roles across engineering, operations and support."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OPEN_ROLES.map((role, i) => (
            <JobCard key={role.title} index={i} onApply={onApply} {...role} />
          ))}
        </div>
      </div>
    </section>
  );
}

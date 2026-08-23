import SectionTitle from "../components/ui/SectionTitle";
import ClientLogos from "../components/ClientLogos";
import { AUDIT_CLIENTS } from "../data/projects";

export default function HomeClients() {
  return (
    <section className="py-16 bg-white border-y border-ink-900/[0.05]">
      <div className="container-page">
        <SectionTitle
          eyebrow="Societies We've Served"
          title="A small sample of 5,000+ buildings audited"
          align="center"
          className="mb-10"
        />
        <ClientLogos items={AUDIT_CLIENTS} />
      </div>
    </section>
  );
}

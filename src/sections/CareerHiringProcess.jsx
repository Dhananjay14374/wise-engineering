import SectionTitle from "../components/ui/SectionTitle";
import HiringStepper from "../components/HiringStepper";
import { HIRING_PROCESS } from "../data/careers";

export default function CareerHiringProcess() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <SectionTitle
          eyebrow="Our Hiring Process"
          title="From application to offer, in six clear steps"
          align="center"
        />
        <div className="mt-16">
          <HiringStepper steps={HIRING_PROCESS} />
        </div>
      </div>
    </section>
  );
}

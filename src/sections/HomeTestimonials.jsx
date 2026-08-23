import SectionTitle from "../components/ui/SectionTitle";
import TestimonialSlider from "../components/TestimonialSlider";
import { TESTIMONIALS } from "../data/testimonials";

export default function HomeTestimonials() {
  return (
    <section className="section-pad bg-ink-50/60">
      <div className="container-page">
        <SectionTitle
          eyebrow="Client Voices"
          title="Trusted by managing committees across Mumbai"
          align="center"
        />
        <div className="mt-14">
          <TestimonialSlider items={TESTIMONIALS} />
        </div>
      </div>
    </section>
  );
}

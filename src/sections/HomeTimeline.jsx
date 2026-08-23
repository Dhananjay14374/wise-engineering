import SectionTitle from "../components/ui/SectionTitle";
import Timeline from "../components/Timeline";
import { TIMELINE } from "../data/stats";

export default function HomeTimeline() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-5xl container-px">
        <SectionTitle
          eyebrow="Our Journey"
          title="A track record built one building at a time"
          align="center"
        />
        <div className="mt-16">
          <Timeline items={TIMELINE} />
        </div>
      </div>
    </section>
  );
}

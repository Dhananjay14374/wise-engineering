import SectionTitle from "../components/ui/SectionTitle";
import Icon from "../components/ui/Icon";
import DarkCard, { DarkCardIcon } from "../components/ui/DarkCard";
import { LIFE_AT_WISE } from "../data/careers";

export default function CareerLifeAtWise() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <SectionTitle
          eyebrow="Life at WISE"
          title="A glimpse into our day-to-day"
          description="From site visits to team celebrations — a culture built on collaboration and continuous learning."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {LIFE_AT_WISE.map((item, i) => (
            <DarkCard key={item.title} index={i} className="aspect-square" contentClassName="flex h-full flex-col items-center justify-center text-center">
              <DarkCardIcon className="mx-auto">
                <Icon name={item.icon} className="w-7 h-7" />
              </DarkCardIcon>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
            </DarkCard>
          ))}
        </div>
      </div>
    </section>
  );
}

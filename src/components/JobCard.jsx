import Icon from "./ui/Icon";
import DarkCard, { DarkCardIcon } from "./ui/DarkCard";
import Button from "./ui/Button";

export default function JobCard({ icon, title, experience, description, skills = [], index = 0, onApply }) {
  return (
    <DarkCard index={index} contentClassName="flex h-full flex-col">
      <DarkCardIcon>
        <Icon name={icon} className="w-7 h-7" />
      </DarkCardIcon>
      <h3 className="card-title">{title}</h3>
      <span className="mb-3 inline-flex w-fit items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-brand-300">
        {experience}
      </span>
      <p className="flex-1 text-sm leading-relaxed text-white/60">{description}</p>
      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/50">
              {s}
            </span>
          ))}
        </div>
      )}
      <Button
        href="#application-form"
        onClick={() => onApply?.(title)}
        variant="outline"
        icon="ArrowRight"
        className="mt-6 w-full justify-center"
      >
        Apply Now
      </Button>
    </DarkCard>
  );
}

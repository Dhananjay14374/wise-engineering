import Icon from "./ui/Icon";
import DarkCard, { DarkCardIcon } from "./ui/DarkCard";

export default function IndustryCard({ icon, title, description, stat, index = 0 }) {
  return (
    <DarkCard index={index}>
      <DarkCardIcon>
        <Icon name={icon} className="w-7 h-7" />
      </DarkCardIcon>
      <h3 className="card-title">{title}</h3>
      <p className="text-sm leading-relaxed text-white/60">{description}</p>
      {stat && (
        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-brand-300">
          {stat}
        </div>
      )}
    </DarkCard>
  );
}

import { CheckCircle2, HardHat } from "lucide-react";
import { cn } from "../../utils/cn";

const VARIANTS = {
  done: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/15",
  ongoing: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/15",
};

const ICONS = { done: CheckCircle2, ongoing: HardHat };
const LABELS = { done: "Completed", ongoing: "Ongoing" };

export default function StatusBadge({ status, className }) {
  const Icon = ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
        VARIANTS[status],
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {LABELS[status]}
    </span>
  );
}

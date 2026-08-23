import { cn } from "../../utils/cn";
import Icon from "./Icon";

export default function Badge({ icon, children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700",
        className
      )}
    >
      {icon && <Icon name={icon} className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}

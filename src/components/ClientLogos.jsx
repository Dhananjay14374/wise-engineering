import { Building2 } from "lucide-react";

export default function ClientLogos({ items = [] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-10 py-2">
        {loop.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-ink-900/[0.06] bg-white px-5 py-2.5 text-sm font-semibold text-ink-600"
          >
            <Building2 className="w-4 h-4 text-brand-500" />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

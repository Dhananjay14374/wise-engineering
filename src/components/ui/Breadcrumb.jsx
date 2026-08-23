import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60">
      <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors">
        <Home className="w-3.5 h-3.5" />
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.to ? (
            <Link to={item.to} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

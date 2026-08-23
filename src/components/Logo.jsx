import { Link } from "react-router-dom";
import logoFull from "../assets/logo-full-transparent.png";

export default function Logo({ light = false, className = "" }) {
  return (
    <Link to="/" className={`group flex items-center ${className}`}>
      <img
        src={logoFull}
        alt="Wise Engineering Consultants"
        className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] md:h-14"
      />
    </Link>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IndianRupee, MapPin, ImageOff } from "lucide-react";
import StatusBadge from "./ui/StatusBadge";

const MotionLink = motion.create(Link);

export default function ProjectCard({ project, status, index = 0 }) {
  return (
    <MotionLink
      to={`/projects/${status}/${project.slug}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 9) * 0.05 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-ink-900 text-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        <div className="flex h-full w-full items-center justify-center text-white/20">
          <ImageOff className="h-8 w-8" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        <StatusBadge status={status} className="absolute left-3 top-3" />
        {project.value && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            <IndianRupee className="h-3 w-3" />
            {project.value.replace(" Lacs", "L")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="card-title text-white line-clamp-2">{project.name}</h3>
        <div className="flex items-start gap-1.5 text-xs text-white/50">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-2">{project.location}</span>
        </div>
        {project.scope && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">{project.scope}</p>
        )}
      </div>
    </MotionLink>
  );
}

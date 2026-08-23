import { motion } from "framer-motion";
import Icon from "./ui/Icon";

export default function ServiceCard({ icon, title, summary, index = 0, onClick, active }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className={`group relative w-full overflow-hidden rounded-2xl border p-8 text-left transition-colors duration-300 ${
        active
          ? "border-brand-500 bg-ink-900"
          : "border-ink-900/[0.06] bg-white hover:border-brand-200"
      }`}
    >
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${
          active ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white"
        }`}
      >
        <Icon name={icon} className="w-7 h-7" />
      </div>
      <h3 className={`card-title ${active ? "text-white" : "text-ink-900"}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${active ? "text-white/70" : "text-ink-500"}`}>
        {summary}
      </p>
      <div
        className={`absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${
          active ? "bg-brand-500/30" : "bg-brand-500/10"
        }`}
      />
    </motion.button>
  );
}

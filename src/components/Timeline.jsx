import { motion } from "framer-motion";

export default function Timeline({ items = [] }) {
  return (
    <div className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500 via-ink-900/15 to-transparent md:left-1/2" />
      <div className="space-y-5 md:space-y-0">
        {items.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={item.year}
              className="relative md:grid md:grid-cols-2 md:gap-10 md:py-8"
            >
              <div
                className={`hidden md:block ${isEven ? "" : "col-start-2"}`}
              />
              <motion.div
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative pl-10 md:pl-0 ${
                  isEven ? "md:col-start-1 md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                }`}
              >
                <div className="absolute left-[7px] top-2.5 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-white md:left-1/2 md:-translate-x-1/2" />
                <div className="text-sm font-bold uppercase tracking-widest text-brand-600">
                  {item.year}
                </div>
                <h3 className="mt-1 card-title text-ink-900">{item.title}</h3>
                <p className="mt-2 text-ink-500 leading-relaxed">{item.description}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

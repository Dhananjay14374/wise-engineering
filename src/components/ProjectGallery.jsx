import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

export default function ProjectGallery({ photos = [] }) {
  if (photos.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-ink-100 text-ink-300"
        >
          <ImageOff className="h-8 w-8" />
        </motion.div>
      ))}
    </div>
  );
}

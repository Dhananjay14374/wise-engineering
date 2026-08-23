import { motion } from "framer-motion";
import Button from "./ui/Button";
import { CONTACT } from "../constants/contact";

export default function CTASection({
  title = "Ready to protect your building for the next 12-15 years?",
  description = "Get a free consultation and a clear, no-obligation scope for your structural audit or repair project.",
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-14 md:py-20">
      <div className="absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px]" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-brand-600/15 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-4xl container-px text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-white/60"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button to="/contact" size="lg" icon="ArrowRight">
            Request a Free Consultation
          </Button>
          <Button href={`tel:${CONTACT.phoneLinks[0]}`} variant="outline" size="lg" icon="Phone" iconPosition="left">
            {CONTACT.phonePrimary}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

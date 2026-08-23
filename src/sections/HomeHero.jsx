import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Play } from "lucide-react";
import Button from "../components/ui/Button";
import Counter from "../components/ui/Counter";
import HeroBackgroundVideo from "../components/ui/HeroBackgroundVideo";
import { CONTACT } from "../constants/contact";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink-900 pt-24 pb-10 md:pt-28 md:pb-14">
      <HeroBackgroundVideo className="z-0" />
      <div className="absolute inset-0 z-[1] bg-black/60" />
      <motion.div
        className="absolute -top-32 right-[-8%] z-[2] h-[28rem] w-[28rem] rounded-full bg-brand-500/20 blur-[120px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute -bottom-40 left-[-10%] z-[2] h-96 w-96 rounded-full bg-brand-600/10 blur-[120px]" />

      <div className="relative z-[3] container-page">
        <div className="-mt-8 md:-mt-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-300 ring-1 ring-white/10"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {CONTACT.iso}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-4 text-4xl sm:text-5xl md:text-[3.4rem] font-bold leading-[1.08] tracking-tight text-white"
          >
            Shaping Visions,
            <br />
            <span className="text-gradient">Building Dreams.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-4 max-w-lg text-lg leading-relaxed text-white/60"
          >
            Your trusted partner in structural ingenuity and comprehensive
            engineering solutions — 17+ years auditing, repairing and
            managing buildings across Mumbai, Thane and Palghar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <Button to="/contact" size="lg" icon="ArrowRight">
              Get a Free Consultation
            </Button>
            <Button to="/projects/done" variant="outline" size="lg" icon="Play" iconPosition="left">
              View Our Projects
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-8"
          >
            {[
              { value: 17, suffix: "+", label: "Years Experience" },
              { value: 5000, suffix: "+", label: "Buildings Audited" },
              { value: 6, suffix: "", label: "Municipal Corporations" },
              { value: 400, suffix: "+", label: "Projects Repaired" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/45">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

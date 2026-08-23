import { motion } from "framer-motion";
import { Briefcase, HardHat, Building2, Wrench, ClipboardCheck, Users } from "lucide-react";
import Button from "../components/ui/Button";
import Breadcrumb from "../components/ui/Breadcrumb";

const FLOATING_ICONS = [
  { icon: HardHat, className: "left-2 top-6", delay: 0 },
  { icon: Building2, className: "right-6 top-0", delay: 0.6 },
  { icon: Wrench, className: "left-0 bottom-16", delay: 1.1 },
  { icon: ClipboardCheck, className: "right-0 bottom-4", delay: 1.6 },
  { icon: Users, className: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", delay: 0.3 },
];

export default function CareerHero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 pt-24 pb-14 md:pt-28 md:pb-20">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <motion.div
        className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-500/20 blur-[100px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 left-[-10%] h-80 w-80 rounded-full bg-brand-600/10 blur-[100px]"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative container-page">
        <Breadcrumb items={[{ label: "Careers" }]} />

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-300 ring-1 ring-white/10"
            >
              <Briefcase className="w-3.5 h-3.5" />
              We Are Hiring
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-white"
            >
              Join Our Team
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-3 text-xl sm:text-2xl font-bold text-gradient"
            >
              Build Your Career. Build India's Future.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.26 }}
              className="mt-4 max-w-lg text-lg leading-relaxed text-white/60"
            >
              Join WISE Engineering Consultants Pvt. Ltd. and become part of a team delivering
              engineering excellence with innovation and integrity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.34 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button href="#open-positions" size="lg" icon="ArrowRight">
                View Open Positions
              </Button>
              <Button href="#application-form" variant="outline" size="lg">
                Apply Now
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden aspect-square lg:block"
          >
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full border border-white/10" />
            <div className="absolute inset-24 rounded-full bg-gradient-to-br from-brand-500/20 to-transparent" />

            {FLOATING_ICONS.map(({ icon: IconCmp, className, delay }, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
                className={`absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-2xl ${className}`}
              >
                <IconCmp className="h-7 w-7 text-brand-600" strokeWidth={1.8} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

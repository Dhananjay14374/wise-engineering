import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";

const POINTS = [
  "Licensed with BMC, MBMC, TMC, VVCMC, NMMC & KDMC",
  "In-house NDT testing — no third-party dependency",
  "End-to-end PMC: survey, tender, execution, handover",
  "5-year workmanship guarantee on repair projects",
];

export default function HomeIntro() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page grid items-center gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
              alt="Engineer inspecting a construction blueprint on-site"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 w-48 rounded-2xl bg-ink-900 p-5 text-white shadow-2xl sm:w-56">
            <div className="text-3xl font-bold text-brand-400">17+</div>
            <div className="mt-1 text-xs text-white/60">
              Years delivering trusted structural &amp; PMC services
            </div>
          </div>
        </motion.div>

        <div>
          <SectionTitle
            eyebrow="About Wise Engineering"
            title="Your trusted partner in structural ingenuity"
            description="With over 17 years of experience, we are a trusted partner for building repair and structural audit services — acting as the crucial link between municipal corporations and housing societies."
          />
          <p className="mt-5 max-w-xl text-ink-500 leading-relaxed">
            Our expertise lies in conducting structural audits and providing
            project management consultancy (PMC) services, with a particular
            focus on building repair projects, ensuring seamless compliance
            with Model Bye-Laws throughout.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-ink-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button to="/about" variant="outline-dark" icon="ArrowRight">
              More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

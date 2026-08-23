import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle";
import ApplicationForm from "../components/ApplicationForm";

export default function CareerApplicationSection({ defaultPosition }) {
  return (
    <section id="application-form" className="section-pad scroll-mt-20 bg-ink-50/60">
      <div className="mx-auto max-w-3xl container-px">
        <SectionTitle
          eyebrow="Apply Now"
          title="Ready to build your career with us?"
          description="Fill in the form below and our HR team will get back to you soon."
          align="center"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-10 overflow-hidden rounded-2xl border border-ink-900/[0.06] bg-white p-6 shadow-sm md:p-10"
        >
          <ApplicationForm defaultPosition={defaultPosition} />
        </motion.div>
      </div>
    </section>
  );
}

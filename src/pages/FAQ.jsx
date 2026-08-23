import { motion } from "framer-motion";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import FAQAccordion from "../components/ui/FAQAccordion";
import CTASection from "../components/CTASection";
import { FAQS } from "../data/faqs";

export default function FAQ() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers on structural audits, NDT testing, PMC scope, contractor selection, municipal compliance and redevelopment feasibility."
        path="/faq"
      />
      <PageHero
        eyebrow="FAQ"
        title="Answers to the questions we hear most"
        description="Still have a question specific to your building? Reach out — we reply personally."
        breadcrumb={[{ label: "FAQ" }]}
      />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-3xl container-px space-y-14">
          {FAQS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.05 }}
            >
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                {group.category}
              </h2>
              <FAQAccordion items={group.items} />
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection
        title="Didn't find your answer?"
        description="Call, email or send us a message — we typically respond within one business day."
      />
    </>
  );
}

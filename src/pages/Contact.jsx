import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CalendarClock } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import ContactForm from "../components/ContactForm";
import SocialIcon from "../components/ui/SocialIcon";
import DarkCard from "../components/ui/DarkCard";
import { CONTACT } from "../constants/contact";
import { useBooking } from "../context/BookingContext";

export default function Contact() {
  const { openBooking } = useBooking();
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Wise Engineering Consultants — office in Malad (West), Mumbai. Call, email or send us a message for a free consultation."
        path="/contact"
      />
      <PageHero
        eyebrow="Get In Touch"
        title="Let's talk about your building"
        description="Whether it's a quick question or a full structural audit request — we respond within one business day."
        breadcrumb={[{ label: "Contact" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="rounded-2xl bg-ink-900 p-8 text-white">
                <h3 className="text-lg font-bold">Quick Contact</h3>
                <div className="mt-6 space-y-5">
                  <a href={`tel:${CONTACT.phoneLinks[0]}`} className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div className="text-sm">
                      <div className="font-semibold">{CONTACT.phonePrimary}</div>
                      <div className="text-white/50">{CONTACT.phoneSecondary}</div>
                    </div>
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div className="text-sm font-semibold">{CONTACT.email}</div>
                  </a>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div className="text-sm">
                      {CONTACT.workingHours.map((h) => (
                        <div key={h.day} className="text-white/70">
                          <span className="font-semibold text-white">{h.day}:</span> {h.hours}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={openBooking}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-600"
                >
                  <CalendarClock className="h-4 w-4" />
                  Book Appointment
                </button>

                <div className="mt-6 flex gap-3">
                  {["linkedin", "instagram", "facebook"].map((name) => (
                    <a
                      key={name}
                      href="#"
                      aria-label={`${name} link`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-brand-500 hover:text-brand-400"
                    >
                      <SocialIcon name={name} />
                    </a>
                  ))}
                </div>
              </div>

              {CONTACT.offices.map((office, i) => (
                <DarkCard key={office.label} index={i}>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                    <div>
                      <div className="text-sm font-bold text-white">
                        {office.label} — {office.city}
                      </div>
                      <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{office.address}</p>
                      <p className="mt-1.5 text-sm font-semibold text-brand-300">{office.phone}</p>
                    </div>
                  </div>
                </DarkCard>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 rounded-2xl border border-ink-900/[0.06] p-8 md:p-10"
            >
              <SectionTitle
                eyebrow="Send a Message"
                title="Tell us about your building"
                description="Fill in the form and our team will get back to you with next steps."
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-ink-100">
        <div className="relative h-80 w-full overflow-hidden md:h-[420px]">
          <iframe
            title="Wise Engineering Consultants location map"
            src="https://www.google.com/maps?q=Sairaj+Gauriyapada+Sunder+Lane+Malad+West+Mumbai&output=embed"
            className="h-full w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

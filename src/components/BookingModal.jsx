import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, Mail, Phone, X } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { CONTACT } from "../constants/contact";
import SocialIcon from "./ui/SocialIcon";

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/70 p-4 backdrop-blur-sm"
          onClick={closeBooking}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink-900/[0.06] bg-ink-900 px-6 py-5">
              <div className="flex items-center gap-3 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">Book a Free Consultation</div>
                  <div className="text-xs text-white/50">We usually reply within one business day.</div>
                </div>
              </div>
              <button
                onClick={closeBooking}
                aria-label="Close booking dialog"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {CONTACT.bookingConfigured ? (
              <iframe
                title="Book a consultation"
                src={CONTACT.bookingUrl}
                className="h-[600px] w-full"
                loading="lazy"
              />
            ) : (
              <div className="p-6">
                <p className="text-sm leading-relaxed text-ink-500">
                  Online scheduling is being set up. In the meantime, reach us directly and
                  we'll confirm a time that works for you.
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href={`tel:${CONTACT.phoneLinks[0]}`}
                    className="flex items-center gap-3 rounded-xl border border-ink-900/[0.08] px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    <Phone className="h-4 w-4 text-brand-500" />
                    {CONTACT.phonePrimary}
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
                      "Hi, I'd like to book a free consultation."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-ink-900/[0.08] px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-green-300 hover:bg-green-50"
                  >
                    <SocialIcon name="whatsapp" className="h-4 w-4 text-green-600" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 rounded-xl border border-ink-900/[0.08] px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    <Mail className="h-4 w-4 text-brand-500" />
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import SocialIcon from "./SocialIcon";

export default function WhatsAppButton() {
  const href = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'd like to know more about your services."
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-50" />
      <SocialIcon name="whatsapp" className="h-7 w-7" />
    </motion.a>
  );
}

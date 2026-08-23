import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has moved."
        path="/404"
      />
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink-900 py-32">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <motion.div
          className="absolute top-1/4 right-[10%] h-72 w-72 rounded-full bg-brand-500/20 blur-[110px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-2xl container-px text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[7rem] md:text-[9rem] font-bold leading-none text-white/10"
          >
            404
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="-mt-8 text-3xl md:text-4xl font-bold text-white"
          >
            This structure hasn't been surveyed yet.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-md text-white/60"
          >
            The page you're looking for doesn't exist or may have moved.
            Let's get you back to solid ground.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Button to="/" size="lg" icon="ArrowRight">
              Back to Home
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

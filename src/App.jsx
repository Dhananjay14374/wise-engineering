import { lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ScrollToTop from "./layout/ScrollToTop";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import PageTransition from "./layout/PageTransition";
import Loader from "./components/ui/Loader";
import BookingModal from "./components/BookingModal";
import IntroLoader, { introAlreadyPlayed, prefersReducedMotion } from "./components/IntroLoader";
import { BookingProvider } from "./context/BookingContext";
import { ToastProvider } from "./context/ToastContext";

import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const Solutions = lazy(() => import("./pages/Solutions"));
const WhyChooseUs = lazy(() => import("./pages/WhyChooseUs"));
const Process = lazy(() => import("./pages/Process"));
const DoneProjects = lazy(() => import("./pages/DoneProjects"));
const OngoingProjects = lazy(() => import("./pages/OngoingProjects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Careers = lazy(() => import("./pages/Careers"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
        <Route path="/solutions" element={<PageTransition><Solutions /></PageTransition>} />
        <Route path="/why-choose-us" element={<PageTransition><WhyChooseUs /></PageTransition>} />
        <Route path="/process" element={<PageTransition><Process /></PageTransition>} />
        <Route path="/projects" element={<Navigate to="/projects/done" replace />} />
        <Route path="/projects/done" element={<PageTransition><DoneProjects /></PageTransition>} />
        <Route path="/projects/ongoing" element={<PageTransition><OngoingProjects /></PageTransition>} />
        <Route path="/projects/:status/:slug" element={<PageTransition><ProjectDetails /></PageTransition>} />
        <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function MainSite() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen flex-col overflow-x-hidden"
    >
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppButton />
      <BookingModal />
    </motion.div>
  );
}

export default function App() {
  // Computed once, synchronously, on first render — so there is never a
  // frame where the site renders before this decision is made.
  const [showIntro, setShowIntro] = useState(
    () => !prefersReducedMotion() && !introAlreadyPlayed()
  );

  return (
    <ToastProvider>
      <BookingProvider>
        {showIntro ? (
          <IntroLoader onComplete={() => setShowIntro(false)} />
        ) : (
          <MainSite />
        )}
      </BookingProvider>
    </ToastProvider>
  );
}

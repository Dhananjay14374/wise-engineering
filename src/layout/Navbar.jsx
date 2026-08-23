import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "../components/Logo";
import Button from "../components/ui/Button";
import NavDropdown from "./NavDropdown";
import { PRIMARY_NAV_LINKS, MORE_NAV_LINKS } from "../data/nav";
import { useBooking } from "../context/BookingContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const location = useLocation();
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileMoreOpen(false);
    setMobileProjectsOpen(false);
  }, [location.pathname]);

  const solid = scrolled || open;
  const isMoreActive = MORE_NAV_LINKS.some((l) => l.to === location.pathname);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,box-shadow,border-color] duration-[400ms] ease-in-out ${
        solid
          ? "border-white/[0.08] bg-[rgba(15,23,42,0.88)] shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-transparent bg-transparent shadow-none backdrop-blur-0"
      }`}
    >
      <div className="container-page relative flex items-center justify-between py-4">
        <Logo light />

        <nav className="hidden items-center gap-1 lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2">
          {PRIMARY_NAV_LINKS.map((link) =>
            link.dropdown ? (
              <NavDropdown
                key={link.label}
                label={link.label}
                items={link.dropdown}
                active={link.dropdown.some((l) => l.to === location.pathname)}
                light
              />
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? "text-brand-500" : "text-white/85 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        className="absolute inset-0 -z-10 rounded-full bg-brand-500/15 ring-1 ring-brand-500/25"
                      />
                    )}
                    {link.label}
                  </>
                )}
              </NavLink>
            )
          )}

          <NavDropdown label="More" items={MORE_NAV_LINKS} active={isMoreActive} light />
        </nav>

        <div className="hidden items-center gap-3 lg:flex xl:gap-4">
          <Button onClick={openBooking} variant="outline" size="md" icon="CalendarClock" iconPosition="left">
            Book Appointment
          </Button>
          <Button to="/contact" size="md">
            Get a Quote
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-ink-900/5 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {PRIMARY_NAV_LINKS.map((link) => {
                if (link.dropdown) {
                  const isProjectsActive = link.dropdown.some((l) => l.to === location.pathname);
                  return (
                    <div key={link.label}>
                      <button
                        type="button"
                        onClick={() => setMobileProjectsOpen((v) => !v)}
                        aria-expanded={mobileProjectsOpen}
                        aria-controls="mobile-projects-panel"
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold ${
                          isProjectsActive ? "bg-brand-50 text-brand-600" : "text-ink-700"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileProjectsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileProjectsOpen && (
                          <motion.div
                            id="mobile-projects-panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden pl-2"
                          >
                            <div className="flex flex-col gap-1 border-l border-ink-900/10 py-1 pl-3">
                              {link.dropdown.map((sub) => (
                                <NavLink
                                  key={sub.to}
                                  to={sub.to}
                                  className={({ isActive }) =>
                                    `rounded-lg px-3 py-2.5 text-sm font-medium ${
                                      isActive ? "bg-brand-50 text-brand-600" : "text-ink-600"
                                    }`
                                  }
                                >
                                  {sub.label}
                                </NavLink>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-3 text-sm font-semibold ${
                        isActive ? "bg-brand-50 text-brand-600" : "text-ink-700"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}

              <button
                type="button"
                onClick={() => setMobileMoreOpen((v) => !v)}
                aria-expanded={mobileMoreOpen}
                aria-controls="mobile-more-panel"
                className={`flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold ${
                  isMoreActive ? "bg-brand-50 text-brand-600" : "text-ink-700"
                }`}
              >
                More
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileMoreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {mobileMoreOpen && (
                  <motion.div
                    id="mobile-more-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden pl-2"
                  >
                    <div className="flex flex-col gap-1 border-l border-ink-900/10 py-1 pl-3">
                      {MORE_NAV_LINKS.map((link) => (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          className={({ isActive }) =>
                            `rounded-lg px-3 py-2.5 text-sm font-medium ${
                              isActive ? "bg-brand-50 text-brand-600" : "text-ink-600"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={openBooking}
                className="mt-2 rounded-lg border border-ink-900/10 px-3 py-3 text-center text-sm font-bold text-ink-900"
              >
                Book Appointment
              </button>
              <Link
                to="/contact"
                className="rounded-full bg-brand-500 px-4 py-3 text-center text-sm font-bold text-white"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

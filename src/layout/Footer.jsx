import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import Logo from "../components/Logo";
import SocialIcon from "../components/ui/SocialIcon";
import { FOOTER_LINKS } from "../data/nav";
import { CONTACT } from "../constants/contact";

const COLS = [
  { title: "Company", links: FOOTER_LINKS.company },
  { title: "Our Work", links: FOOTER_LINKS.work },
  { title: "Support", links: FOOTER_LINKS.support },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-white/70">
      <div className="container-page py-8 sm:py-12 lg:py-15">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              A Mumbai-based, ISO 9001:2015 certified structural audit and project
              management consultancy firm — trusted by housing societies across BMC,
              TMC, VVCMC, NMMC, MBMC and KDMC jurisdictions for over 17 years.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-brand-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              {CONTACT.iso}
            </div>
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

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm transition-colors hover:text-brand-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
            <div className="text-sm text-white">{CONTACT.footerPhone}</div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
            <div className="text-sm text-white">{CONTACT.email}</div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
            <div className="text-sm">{CONTACT.offices[0].city}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Wise Engineering Consultants. All rights reserved.</p>
          <p>Shaping Visions, Building Dreams.</p>
        </div>
      </div>
    </footer>
  );
}

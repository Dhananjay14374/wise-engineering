import { Send } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import Icon from "../components/ui/Icon";
import DarkCard, { DarkCardIcon } from "../components/ui/DarkCard";
import { CONTACT } from "../constants/contact";
import { HIRING_CONTACT_NUMBERS } from "../data/careers";

export default function CareerContact() {
  const office = CONTACT.offices[0];
  const mapsHref = `https://www.google.com/maps?q=${encodeURIComponent(office.address)}`;
  const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'd like to know more about career opportunities at WISE Engineering Consultants."
  )}`;
  const applySubject = "Application for [Position Name] – Your Full Name";

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <SectionTitle
          eyebrow="Get In Touch"
          title="Ready to build something extraordinary?"
          description="Join WISE Engineering Consultants Pvt. Ltd. and be part of the next generation of engineering professionals."
          align="center"
        />

        <div className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl bg-brand-50 px-5 py-4 text-sm text-brand-800">
          <Send className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p>
            Send your updated Resume/CV to{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-semibold underline decoration-brand-300 underline-offset-2">
              {CONTACT.email}
            </a>{" "}
            with the subject <span className="font-semibold">"{applySubject}"</span> — e.g. "Application for
            Site Engineer – Rahul Sharma".
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DarkCard href={whatsappHref} target="_blank" rel="noreferrer" index={0}>
            <DarkCardIcon>
              <Icon name="MessageCircle" className="w-6 h-6" />
            </DarkCardIcon>
            <h3 className="card-title">WhatsApp</h3>
            <p className="text-sm text-white/60">77578 56884</p>
          </DarkCard>

          <DarkCard index={1}>
            <DarkCardIcon>
              <Icon name="Phone" className="w-6 h-6" />
            </DarkCardIcon>
            <h3 className="card-title">Call</h3>
            <div className="space-y-1 text-sm text-white/60">
              {HIRING_CONTACT_NUMBERS.map((num) => (
                <a key={num} href={`tel:${num.replace(/\s/g, "")}`} className="block hover:text-brand-300">
                  {num}
                </a>
              ))}
            </div>
          </DarkCard>

          <DarkCard href={`mailto:${CONTACT.email}`} index={2}>
            <DarkCardIcon>
              <Icon name="Mail" className="w-6 h-6" />
            </DarkCardIcon>
            <h3 className="card-title">Email</h3>
            <p className="text-sm break-all text-white/60">{CONTACT.email}</p>
          </DarkCard>

          <DarkCard href={`https://${CONTACT.website}`} target="_blank" rel="noreferrer" index={3}>
            <DarkCardIcon>
              <Icon name="Globe" className="w-6 h-6" />
            </DarkCardIcon>
            <h3 className="card-title">Website</h3>
            <p className="text-sm text-white/60">{CONTACT.website}</p>
          </DarkCard>

          <DarkCard href={mapsHref} target="_blank" rel="noreferrer" index={4} className="sm:col-span-2 lg:col-span-1">
            <DarkCardIcon>
              <Icon name="MapPin" className="w-6 h-6" />
            </DarkCardIcon>
            <h3 className="card-title">Office Address</h3>
            <p className="text-sm leading-relaxed text-white/60">{office.address}</p>
          </DarkCard>
        </div>
      </div>
    </section>
  );
}

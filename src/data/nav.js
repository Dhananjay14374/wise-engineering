export const PROJECTS_NAV_LINKS = [
  { label: "Done Projects", to: "/projects/done" },
  { label: "On Going Projects", to: "/projects/ongoing" },
];

export const PRIMARY_NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", dropdown: PROJECTS_NAV_LINKS },
  { label: "Contact Us", to: "/contact" },
];

export const MORE_NAV_LINKS = [
  { label: "Industries", to: "/industries" },
  { label: "Solutions", to: "/solutions" },
  { label: "Process", to: "/process" },
  { label: "Why Choose Us", to: "/why-choose-us" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", to: "/about" },
    { label: "Why Choose Us", to: "/why-choose-us" },
    { label: "Our Process", to: "/process" },
    { label: "Careers", to: "/careers" },
    { label: "Blog", to: "/blog" },
  ],
  work: [
    { label: "Services", to: "/services" },
    { label: "Industries", to: "/industries" },
    { label: "Solutions", to: "/solutions" },
    { label: "Projects", to: "/projects/done" },
    { label: "Testimonials", to: "/testimonials" },
  ],
  support: [
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ],
};

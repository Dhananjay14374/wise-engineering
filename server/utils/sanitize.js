import xss from "xss";

// Strips CR/LF so a field can never be used to inject extra SMTP/MIME
// headers (classic "email header injection" via multi-line form fields).
export function stripHeaderInjection(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

// Removes HTML/script content so form input can never execute as markup,
// whether it ends up rendered in an email client or logged/echoed anywhere.
export function sanitizeText(value) {
  const noHeaderInjection = stripHeaderInjection(String(value ?? ""));
  return xss(noHeaderInjection, { whiteList: {}, stripIgnoreTag: true, stripIgnoreTagBody: ["script"] });
}

// Escapes for safe interpolation into HTML email bodies (belt-and-suspenders
// on top of sanitizeText, since email HTML is rendered by third-party clients).
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

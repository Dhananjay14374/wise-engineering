let loadPromise = null;

// Injects the reCAPTCHA v3 script once and resolves when window.grecaptcha
// is ready. Safe to call multiple times — subsequent calls reuse the same promise.
export function loadRecaptcha(siteKey) {
  if (!siteKey) return Promise.resolve(null);
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => resolve(window.grecaptcha));
    };
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));
    document.head.appendChild(script);
  });

  return loadPromise;
}

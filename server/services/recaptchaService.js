import { env } from "../config/env.js";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

// Verifies a reCAPTCHA v3 token server-side. Returns { success, score, reason }.
// When RECAPTCHA_SECRET_KEY isn't configured, verification is skipped so the
// form keeps working in environments where reCAPTCHA hasn't been set up yet.
export async function verifyRecaptcha(token, remoteIp) {
  if (!env.recaptcha.enabled) {
    return { success: true, skipped: true };
  }

  if (!token) {
    return { success: false, reason: "Missing reCAPTCHA token" };
  }

  const params = new URLSearchParams({
    secret: env.recaptcha.secretKey,
    response: token,
    remoteip: remoteIp || "",
  });

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();

    if (!data.success) {
      return { success: false, reason: `reCAPTCHA rejected: ${(data["error-codes"] || []).join(", ")}` };
    }

    if (typeof data.score === "number" && data.score < env.recaptcha.minScore) {
      return { success: false, reason: `reCAPTCHA score too low (${data.score})`, score: data.score };
    }

    return { success: true, score: data.score, action: data.action };
  } catch (err) {
    console.error("[recaptcha] Verification request failed:", err.message);
    return { success: false, reason: "reCAPTCHA verification request failed" };
  }
}

import { env } from "../config/env.js";
import { verifyRecaptcha } from "../services/recaptchaService.js";
import { sendCompanyNotification, sendCustomerAutoReply } from "../services/emailService.js";
import { logEnquiry } from "../utils/logger.js";
import { parseUserAgent } from "../utils/parseUserAgent.js";

// Behind most proxies/load balancers req.ip already reflects the client IP
// (trust proxy is enabled in app.js). This is a defensive fallback only.
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.ip || req.socket?.remoteAddress || "Unknown";
}

export async function handleContactForm(req, res, next) {
  try {
    const { name, phone, email, service, message, recaptchaToken } = req.body;
    const ip = getClientIp(req);

    if (env.recaptcha.enabled) {
      const verification = await verifyRecaptcha(recaptchaToken, ip);
      if (!verification.success) {
        return res.status(400).json({
          success: false,
          message: "Spam verification failed. Please refresh the page and try again.",
        });
      }
    }

    if (!env.isSmtpConfigured) {
      return res.status(503).json({
        success: false,
        message: "Email sending is not configured on the server yet. Please contact us by phone in the meantime.",
      });
    }

    const { browser, os } = parseUserAgent(req.headers["user-agent"]);
    const now = new Date();
    const meta = {
      ip,
      browser,
      os,
      date: now.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }),
      time: now.toLocaleTimeString("en-IN"),
      websiteUrl: env.frontendUrl,
    };

    await sendCompanyNotification({ name, phone, email, service, message, meta });

    // Auto-reply is best-effort — if it fails, the enquiry has still been
    // received and notified internally, so we don't fail the whole request.
    try {
      await sendCustomerAutoReply({ name, email, service });
    } catch (autoReplyErr) {
      console.error("[contact] Auto-reply failed:", autoReplyErr.message);
    }

    logEnquiry({ ip, name, email, phone, service });

    res.status(200).json({
      success: true,
      message: "Thank you — your enquiry has been received. Our team will get back to you shortly.",
    });
  } catch (err) {
    next(err);
  }
}

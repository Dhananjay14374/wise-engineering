import nodemailer from "nodemailer";
import { env } from "./env.js";

// Single shared SMTP transporter for the whole app. Nodemailer pools
// connections internally, so one instance is reused across requests.
export const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.secure, // true for port 465, false for 587/25 (STARTTLS)
  auth: env.smtp.user
    ? {
        user: env.smtp.user,
        pass: env.smtp.pass,
      }
    : undefined,
});

export async function verifyTransporter() {
  if (!env.isSmtpConfigured) {
    console.warn("[smtp] Skipping SMTP verification — credentials not fully configured.");
    return false;
  }

  try {
    await transporter.verify();
    console.log(`[smtp] Connected to ${env.smtp.host}:${env.smtp.port} as ${env.smtp.user}`);
    return true;
  } catch (err) {
    console.error("[smtp] SMTP connection failed:", err.message);
    return false;
  }
}

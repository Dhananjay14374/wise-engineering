import dotenv from "dotenv";

dotenv.config();

const REQUIRED_SMTP_VARS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "FROM_EMAIL", "TO_EMAIL"];

const missingSmtpVars = REQUIRED_SMTP_VARS.filter((key) => !process.env[key]);

if (missingSmtpVars.length > 0) {
  // Server still starts (so /api/health and static checks work), but
  // /api/contact will refuse to send mail until these are set.
  console.warn(
    `[config] Missing SMTP environment variables: ${missingSmtpVars.join(", ")}. ` +
      "Contact form emails will fail until these are set in server/.env"
  );
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },

  fromEmail: process.env.FROM_EMAIL || "",
  toEmail: process.env.TO_EMAIL || "info@wiseengineeringconsultantspvt.ltd",

  recaptcha: {
    secretKey: process.env.RECAPTCHA_SECRET_KEY || "",
    minScore: Number(process.env.RECAPTCHA_MIN_SCORE) || 0.5,
    // When no secret key is configured, skip verification instead of hard-failing
    // every submission — lets the form work in local/dev setups before reCAPTCHA
    // keys are provisioned.
    enabled: Boolean(process.env.RECAPTCHA_SECRET_KEY),
  },

  isSmtpConfigured: missingSmtpVars.length === 0,
};

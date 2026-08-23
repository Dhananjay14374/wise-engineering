import { transporter } from "../config/transporter.js";
import { env } from "../config/env.js";
import { companyNotificationTemplate, customerAutoReplyTemplate } from "../utils/emailTemplates.js";

// Notifies the company inbox of a new enquiry. Reply-To is set to the
// visitor's email so the team can hit "reply" directly in their mail client.
export async function sendCompanyNotification({ name, phone, email, service, message, meta }) {
  if (!env.isSmtpConfigured) {
    throw new Error("SMTP is not configured on the server.");
  }

  await transporter.sendMail({
    from: `"${name} via Website" <${env.fromEmail}>`,
    to: env.toEmail,
    replyTo: email,
    subject: "New Website Enquiry - Wise Engineering Consultants",
    html: companyNotificationTemplate({ name, phone, email, service, message, meta }),
  });
}

// Confirms receipt to the visitor. Failures here are logged but never
// block the company notification from having already gone out.
export async function sendCustomerAutoReply({ name, email, service }) {
  if (!env.isSmtpConfigured) {
    throw new Error("SMTP is not configured on the server.");
  }

  await transporter.sendMail({
    from: `"Wise Engineering Consultants Pvt. Ltd." <${env.fromEmail}>`,
    to: email,
    subject: "Thank You for Contacting Wise Engineering Consultants Pvt. Ltd.",
    html: customerAutoReplyTemplate({ name, service }),
  });
}

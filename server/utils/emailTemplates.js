import { escapeHtml } from "./sanitize.js";

const BRAND_BLUE = "#00aeef";
const BRAND_BLUE_DARK = "#026f98";
const INK = "#0b0f19";
const LOGO_URL = "https://www.wiseengineeringconsultantspvt.ltd/images/email-logo.png";
const WEBSITE_URL = "https://www.wiseengineeringconsultantspvt.ltd";
const COMPANY_NAME = "Wise Engineering Consultants Pvt. Ltd.";
const PHONE_PLACEHOLDER = "+91 77578 56884";

function layout({ preheader, headerTitle, headerSubtitle, bodyHtml }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(headerTitle)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(11,15,25,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE_DARK} 100%);padding:32px 32px 28px;text-align:center;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 16px;background-color:#ffffff;border-radius:10px;padding:10px 18px;display:inline-block;">
                  <tr>
                    <td>
                      <img src="${LOGO_URL}" alt="${escapeHtml(COMPANY_NAME)}" height="40" style="display:block;height:40px;width:auto;" />
                    </td>
                  </tr>
                </table>
                <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">${escapeHtml(headerTitle)}</h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">${escapeHtml(headerSubtitle)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${INK};padding:24px 32px;text-align:center;">
                <p style="margin:0 0 8px;color:#ffffff;font-size:13px;font-weight:700;">${escapeHtml(COMPANY_NAME)}</p>
                <p style="margin:0 0 4px;color:rgba(255,255,255,0.55);font-size:12px;">Phone: ${escapeHtml(PHONE_PLACEHOLDER)}</p>
                <p style="margin:0 0 12px;color:rgba(255,255,255,0.55);font-size:12px;">
                  <a href="${WEBSITE_URL}" style="color:${BRAND_BLUE};text-decoration:none;">www.wiseengineeringconsultantspvt.ltd</a>
                </p>
                <p style="margin:0;font-size:12px;">
                  <a href="#" style="color:rgba(255,255,255,0.55);text-decoration:none;margin:0 6px;">LinkedIn</a>
                  <span style="color:rgba(255,255,255,0.25);">|</span>
                  <a href="#" style="color:rgba(255,255,255,0.55);text-decoration:none;margin:0 6px;">Instagram</a>
                  <span style="color:rgba(255,255,255,0.25);">|</span>
                  <a href="#" style="color:rgba(255,255,255,0.55);text-decoration:none;margin:0 6px;">Facebook</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label, value) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #eef1f5;color:#3d4557;font-size:13px;font-weight:700;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eef1f5;color:${INK};font-size:13px;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

// Internal notification sent to the company inbox for every enquiry.
export function companyNotificationTemplate({ name, phone, email, service, message, meta }) {
  const bodyHtml = `
    <p style="margin:0 0 20px;color:${INK};font-size:14px;">A new enquiry was submitted on the website contact form.</p>

    <h2 style="margin:0 0 10px;color:${INK};font-size:14px;font-weight:700;">Visitor Details</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${detailRow("Full Name", name)}
      ${detailRow("Phone", phone)}
      ${detailRow("Email", email)}
      ${detailRow("Service Required", service)}
    </table>

    <h2 style="margin:0 0 10px;color:${INK};font-size:14px;font-weight:700;">Message</h2>
    <div style="padding:14px 16px;background-color:#f5f7fa;border-radius:8px;color:${INK};font-size:13px;line-height:1.6;white-space:pre-wrap;margin-bottom:20px;">${escapeHtml(message)}</div>

    <h2 style="margin:0 0 10px;color:${INK};font-size:14px;font-weight:700;">Submission Metadata</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${detailRow("Submitted Date", meta.date)}
      ${detailRow("Submitted Time", meta.time)}
      ${detailRow("IP Address", meta.ip)}
      ${detailRow("Browser", meta.browser)}
      ${detailRow("Operating System", meta.os)}
      ${detailRow("Website URL", meta.websiteUrl)}
    </table>
  `;

  return layout({
    preheader: `New enquiry from ${name} — ${service}`,
    headerTitle: "New Website Enquiry",
    headerSubtitle: COMPANY_NAME,
    bodyHtml,
  });
}

// Auto-reply sent back to the customer confirming receipt.
export function customerAutoReplyTemplate({ name, service }) {
  const bodyHtml = `
    <p style="margin:0 0 16px;color:${INK};font-size:14px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;color:${INK};font-size:14px;line-height:1.6;">
      Thank you for contacting <strong>${COMPANY_NAME}</strong>.
    </p>
    <p style="margin:0 0 16px;color:${INK};font-size:14px;line-height:1.6;">
      We have successfully received your enquiry regarding:
    </p>
    <div style="padding:14px 16px;background-color:#e6f8fe;border-left:4px solid ${BRAND_BLUE};border-radius:6px;color:${INK};font-size:14px;font-weight:700;margin-bottom:16px;">
      ${escapeHtml(service)}
    </div>
    <p style="margin:0 0 16px;color:${INK};font-size:14px;line-height:1.6;">
      Our engineering team will review your request and contact you shortly.
    </p>
    <p style="margin:0;color:${INK};font-size:14px;line-height:1.6;">
      Regards,<br />
      <strong>${COMPANY_NAME}</strong>
    </p>
  `;

  return layout({
    preheader: `Thank you for contacting ${COMPANY_NAME}`,
    headerTitle: "Thank You for Reaching Out",
    headerSubtitle: COMPANY_NAME,
    bodyHtml,
  });
}

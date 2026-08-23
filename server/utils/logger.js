import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.join(__dirname, "..", "logs");
const LOG_FILE = path.join(LOG_DIR, "enquiries.log");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Appends one structured line per enquiry: date, time, ip, name, email, phone, service.
export function logEnquiry({ ip, name, email, phone, service }) {
  const now = new Date();
  const entry = {
    date: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 8),
    ip,
    name,
    email,
    phone,
    service,
  };

  const line = `${JSON.stringify(entry)}\n`;

  fs.appendFile(LOG_FILE, line, (err) => {
    if (err) console.error("[logger] Failed to write enquiry log:", err.message);
  });

  console.log(
    `[enquiry] ${entry.date} ${entry.time} | ${ip} | ${name} <${email}> | ${phone} | ${service}`
  );
}

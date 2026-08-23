// TEMPORARY, dependency-free stand-in for server.js — lets you verify the
// frontend <-> backend wiring (button states, toast, form reset/keep-values)
// without running `npm install` first. It does NOT send real emails.
//
// Delete this file once the real backend (server.js) is installed and running.
// Run with:  node server/mock-server.js

import http from "node:http";

const PORT = 5000;
const FRONTEND_ORIGIN = "http://localhost:5173";

const SERVICE_OPTIONS = [
  "Structural Audit",
  "Structural Design",
  "RCC Design",
  "Building Inspection",
  "Construction Consultancy",
  "Project Management",
  "Other",
];

function withCors(res) {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, status, body) {
  withCors(res);
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    withCors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    return sendJson(res, 200, { success: true, message: "Mock server is healthy (no real emails sent)" });
  }

  if (req.method === "POST" && req.url === "/api/contact") {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      let data;
      try {
        data = JSON.parse(raw || "{}");
      } catch {
        return sendJson(res, 400, { success: false, message: "Invalid JSON body." });
      }

      const { name, phone, email, service, message } = data;
      const errors = [];
      if (!name?.trim()) errors.push({ field: "name", message: "Full name is required" });
      if (!phone?.trim()) errors.push({ field: "phone", message: "Phone is required" });
      if (!email?.trim() || !/^\S+@\S+\.\S+$/.test(email)) errors.push({ field: "email", message: "A valid email is required" });
      if (!service || !SERVICE_OPTIONS.includes(service)) errors.push({ field: "service", message: "Select a valid service" });
      if (!message?.trim()) errors.push({ field: "message", message: "Message is required" });

      if (errors.length > 0) {
        return sendJson(res, 400, { success: false, message: "Please correct the highlighted fields.", errors });
      }

      console.log(`[mock-contact] ${new Date().toLocaleString()} | ${name} <${email}> | ${phone} | ${service}`);
      console.log(`[mock-contact] message: ${message}`);
      console.log("[mock-contact] NOTE: no real email was sent — this is the mock backend.");

      return sendJson(res, 200, {
        success: true,
        message: "(Mock) Thank you — your enquiry has been received. Our team will get back to you shortly.",
      });
    });
    return;
  }

  sendJson(res, 404, { success: false, message: `Route not found: ${req.method} ${req.url}` });
});

server.listen(PORT, () => {
  console.log(`[mock-server] Listening on http://localhost:${PORT}`);
  console.log("[mock-server] This is a TEMPORARY stand-in — no real emails are sent.");
  console.log("[mock-server] Run `npm install` in server/ and use server.js for the real backend.");
});

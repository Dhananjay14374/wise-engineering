import app from "./app.js";
import { env } from "./config/env.js";
import { verifyTransporter } from "./config/transporter.js";

const server = app.listen(env.port, () => {
  console.log(`[server] Listening on port ${env.port} (${env.nodeEnv})`);
  console.log(`[server] Allowed frontend origin: ${env.frontendUrl}`);
  verifyTransporter();
});

function shutdown(signal) {
  console.log(`[server] ${signal} received, shutting down gracefully...`);
  server.close(() => process.exit(0));
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

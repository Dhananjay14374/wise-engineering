import { env } from "./env.js";

// Allow the configured production frontend plus common local dev ports.
const allowedOrigins = new Set(
  [env.frontendUrl, "http://localhost:5173", "http://127.0.0.1:5173"].filter(Boolean)
);

export const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests (curl, server-to-server, health checks) with no Origin header.
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS blocked: origin "${origin}" is not allowed`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  maxAge: 86400,
};

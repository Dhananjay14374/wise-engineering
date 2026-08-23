import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

import { env } from "./config/env.js";
import { corsOptions } from "./config/corsConfig.js";
import contactRoutes from "./routes/contactRoutes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// The app is expected to run behind a reverse proxy in production
// (GoDaddy/Passenger, Nginx, etc.) — trust its X-Forwarded-* headers so
// req.ip and rate limiting see the real client IP.
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy", env: env.nodeEnv });
});

app.use("/api/contact", contactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

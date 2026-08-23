import rateLimit from "express-rate-limit";

// Throttles the contact endpoint per-IP to blunt scripted spam/abuse
// while still allowing a genuine visitor to retry after a validation error.
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many enquiries submitted from this address. Please try again in a few minutes.",
  },
});

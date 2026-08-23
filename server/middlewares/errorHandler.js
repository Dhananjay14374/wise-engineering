// Catches any route/controller path that doesn't match a defined endpoint.
export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Centralized error handler — must be registered last, after all routes.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error("[error]", err.message);

  if (err.message?.startsWith("CORS blocked")) {
    return res.status(403).json({ success: false, message: "Origin not allowed." });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: status === 500 ? "Something went wrong. Please try again later." : err.message,
  });
}

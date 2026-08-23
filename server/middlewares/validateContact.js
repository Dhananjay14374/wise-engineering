import { body, validationResult } from "express-validator";
import { sanitizeText } from "../utils/sanitize.js";

export const SERVICE_OPTIONS = [
  "Structural Audit",
  "Structural Design",
  "RCC Design",
  "Building Inspection",
  "Construction Consultancy",
  "Project Management",
  "Other",
];

// Accepts optional leading + and 7-15 digits, allowing spaces/dashes/parens
// as typed by a human (e.g. "+91 77578 56884", "022 4616 7889").
const PHONE_REGEX = /^\+?[0-9\s\-()]{7,20}$/;
const PHONE_DIGIT_COUNT_REGEX = /\d/g;

export const validateContact = [
  body("name")
    .trim()
    .customSanitizer(sanitizeText)
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("phone")
    .trim()
    .customSanitizer(sanitizeText)
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(PHONE_REGEX)
    .withMessage("Enter a valid phone number")
    .custom((value) => {
      const digitCount = (value.match(PHONE_DIGIT_COUNT_REGEX) || []).length;
      if (digitCount < 7 || digitCount > 15) {
        throw new Error("Phone number must contain between 7 and 15 digits");
      }
      return true;
    }),

  body("email")
    .trim()
    .customSanitizer(sanitizeText)
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("service")
    .trim()
    .customSanitizer(sanitizeText)
    .notEmpty()
    .withMessage("Service required is required")
    .isIn(SERVICE_OPTIONS)
    .withMessage("Select a valid service option"),

  body("message")
    .trim()
    .customSanitizer(sanitizeText)
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 5, max: 3000 })
    .withMessage("Message must be between 5 and 3000 characters"),

  // reCAPTCHA v3 token is optional at the schema level — enforced in the
  // controller only when RECAPTCHA_SECRET_KEY is actually configured.
  body("recaptchaToken").optional().trim().isString(),

  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Please correct the highlighted fields and try again.",
        errors: result.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }
    next();
  },
];

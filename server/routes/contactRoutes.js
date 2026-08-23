import { Router } from "express";
import { handleContactForm } from "../controllers/contactController.js";
import { validateContact } from "../middlewares/validateContact.js";
import { contactRateLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/", contactRateLimiter, validateContact, handleContactForm);

export default router;

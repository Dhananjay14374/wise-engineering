import { useEffect } from "react";
import logoFull from "../assets/logo-full.svg";

const SESSION_KEY = "wise-intro-seen";

// Sequence: white bg → logo fades/scales in → holds → fades/scales out →
// caller mounts the homepage (see App.jsx's onComplete wiring).
const ENTER_MS = 900;
const HOLD_MS = 1400;
const EXIT_MS = 900;
const TOTAL_MS = ENTER_MS + HOLD_MS + EXIT_MS;

const EASE_ENTRANCE = "cubic-bezier(0.16, 1, 0.3, 1)"; // Apple-style decelerate
const EASE_SMOOTH = "cubic-bezier(0.65, 0, 0.35, 1)"; // symmetric, unhurried

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // sessionStorage unavailable (e.g. privacy mode) — fail open, show once.
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // ignore — nothing to persist to
  }
}

/**
 * Full-screen, once-per-session brand intro — a clean fade/scale reveal of
 * the full logo lockup (icon, wordmark, subtitle, tagline all baked into
 * src/assets/logo-full.svg), held briefly, then faded out. A single timer
 * hands control back to the caller once the whole sequence has finished.
 */
export default function IntroLoader({ onComplete }) {
  useEffect(() => {
    markSeen();
    const timer = window.setTimeout(() => onComplete?.(), TOTAL_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 999999,
        background: "#ffffff",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: `intro-exit ${EXIT_MS}ms ${EASE_SMOOTH} ${ENTER_MS + HOLD_MS}ms forwards`,
      }}
    >
      <img
        src={logoFull}
        alt="WISE Engineering Consultants — Shaping Visions, Building Dreams"
        style={{
          width: "clamp(280px, 40vw, 620px)",
          height: "auto",
          opacity: 0,
          animation: `intro-logo-enter ${ENTER_MS}ms ${EASE_ENTRANCE} forwards`,
        }}
      />
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";

// Auto-detects every video dropped into src/bg-videos/ — add or remove
// files there and the playlist picks them up with no code changes.
// Sorted so the rotation order is deterministic across builds.
const videoModules = import.meta.glob("/src/bg-videos/*.{mp4,webm}", {
  eager: true,
  query: "?url",
  import: "default",
});
const PLAYLIST = Object.keys(videoModules)
  .sort()
  .map((key) => videoModules[key]);

const FADE_MS = 1000; // crossfade duration, within the 800-1200ms spec
const PLAYBACK_RATE = 0.6; // slowed down for a calmer, more cinematic background

export default function HeroBackgroundVideo({ className = "" }) {
  const wrapperRef = useRef(null);
  const slotARef = useRef(null);
  const slotBRef = useRef(null);
  const slotRefs = [slotARef, slotBRef];
  const advanceTimeoutRef = useRef(null);
  // Guards against a slot's `ended` firing more than once for the same
  // transition (some browsers fire it again if currentTime is nudged at/past
  // duration) — without this a double-fire would advance the playlist twice.
  const isAdvancingRef = useRef(false);
  // Which playlist index the *next* freed slot should be loaded with.
  const nextIndexRef = useRef(2 % Math.max(PLAYLIST.length, 1));

  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(PLAYLIST.length === 0);
  const [activeSlot, setActiveSlot] = useState(0);
  const [slotSrc, setSlotSrc] = useState(() => [
    PLAYLIST[0],
    PLAYLIST[1 % Math.max(PLAYLIST.length, 1)],
  ]);

  // Defer starting playback (and therefore the initial fetch pressure)
  // until the hero is actually visible — cheap safety net if this
  // component is ever reused further down a page.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || failed) return;
    const el = slotRefs[activeSlot].current;
    if (el) el.playbackRate = PLAYBACK_RATE;
    el?.play()?.catch(() => setFailed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, failed]);

  // Clear any in-flight crossfade timeout on unmount.
  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, []);

  const advance = useCallback(() => {
    if (isAdvancingRef.current || PLAYLIST.length <= 1) return;
    isAdvancingRef.current = true;

    const standbySlot = activeSlot === 0 ? 1 : 0;
    const standbyEl = slotRefs[standbySlot].current;
    if (standbyEl) {
      standbyEl.currentTime = 0;
      standbyEl.playbackRate = PLAYBACK_RATE;
      standbyEl.play().catch(() => {});
    }
    setActiveSlot(standbySlot);

    // Once the crossfade finishes, rewind the now-hidden video and load the
    // next playlist entry into it so it's fully preloaded and ready well
    // before it's needed again.
    advanceTimeoutRef.current = window.setTimeout(() => {
      const outgoingSlot = standbySlot === 0 ? 1 : 0;
      const outgoingEl = slotRefs[outgoingSlot].current;
      if (outgoingEl) {
        outgoingEl.pause();
        outgoingEl.currentTime = 0;
      }
      setSlotSrc((prev) => {
        const next = [...prev];
        next[outgoingSlot] = PLAYLIST[nextIndexRef.current];
        return next;
      });
      nextIndexRef.current = (nextIndexRef.current + 1) % PLAYLIST.length;
      isAdvancingRef.current = false;
    }, FADE_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlot]);

  if (failed || PLAYLIST.length === 0) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {[0, 1].map((slot) => (
        <video
          key={slot}
          ref={slotRefs[slot]}
          src={slotSrc[slot]}
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out"
          style={{ opacity: activeSlot === slot ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = PLAYBACK_RATE;
          }}
          onEnded={activeSlot === slot ? advance : undefined}
          onError={() => setFailed(true)}
        />
      ))}
    </div>
  );
}

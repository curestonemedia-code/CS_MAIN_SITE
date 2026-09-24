"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const STAGES = [
  {
    tag: "",
    line1: "WELCOME TO",
    line2: "CURE STONE",
    desc: "",
  },
  {
    tag: "",
    line1: "ADVANCED",
    line2: "KIDNEY STONE CARE",
    desc: "FANS-RIRS and Advanced laser stone treatment\nat Cure Stone Hospital, Sector 52, Gurgaon.",
  },
  {
    tag: "",
    line1: "LASER STONE",
    line2: "TREATMENT",
    desc: "Personalized kidney stone surgery in Gurgaon with RIRS, PCNL, ESWL and URSL options.",
  },
  {
    tag: "Book Free Consultation",
    line1: "TAKE CONTROL",
    line2: "OF YOUR HEALTH",
    desc: "Consult a urologist doctor in Gurgaon at Cure Stone Hospital.",
  },
];

const LAST_STAGE = STAGES.length - 1;
const STEP_SECONDS = 0.7;
// Ignore further input for this long after a step so one gesture = one step.
const STEP_LOCK_MS = 700;
// A wheel gesture (incl. trackpad inertia) ends once events pause this long.
const WHEEL_QUIET_MS = 160;
const SWIPE_PX = 40;

const VIDEO_SRC = "/Stone_fragments_floating_in_dark…_202605131342.mp4";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Dual video refs for seamless crossfade looping
  const vidARef = useRef<HTMLVideoElement>(null);
  const vidBRef = useRef<HTMLVideoElement>(null);

  // Seamless crossfade loop: when one video nears its end,
  // the other starts from 0 and fades in, creating an invisible transition
  useEffect(() => {
    const vidA = vidARef.current;
    const vidB = vidBRef.current;
    if (!vidA || !vidB) return;

    // Mute both for autoplay compliance
    [vidA, vidB].forEach((v) => {
      v.muted = true;
      v.defaultMuted = true;
    });

    const XFADE_TIME = 1.0; // seconds before end to start crossfade
    const XFADE_DURATION = 0.8; // transition duration in seconds

    let active = vidA;
    let standby = vidB;
    let isCrossfading = false;
    let rafId = 0;

    // Set initial opacity
    vidA.style.opacity = "1";
    vidA.style.transition = "";
    vidB.style.opacity = "0";
    vidB.style.transition = "";

    const tryPlay = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p) p.catch(() => { });
    };

    const doCrossfade = () => {
      if (isCrossfading) return;
      isCrossfading = true;

      // Prepare standby: start from beginning
      standby.currentTime = 0;
      tryPlay(standby);

      // Crossfade via CSS transition
      const dur = `${XFADE_DURATION}s`;
      standby.style.transition = `opacity ${dur} ease-in-out`;
      active.style.transition = `opacity ${dur} ease-in-out`;
      standby.style.opacity = "1";
      active.style.opacity = "0";

      // After transition completes, swap roles
      setTimeout(() => {
        const prev = active;
        active = standby;
        standby = prev;

        // Reset standby
        standby.pause();
        standby.currentTime = 0;
        standby.style.transition = "";
        standby.style.opacity = "0";
        active.style.transition = "";

        isCrossfading = false;
      }, XFADE_DURATION * 1000 + 50);
    };

    // Monitor loop: check if active video is near its end
    const monitor = () => {
      if (!isCrossfading && active.duration && !isNaN(active.duration)) {
        if (active.currentTime >= active.duration - XFADE_TIME) {
          doCrossfade();
        }
      }
      rafId = requestAnimationFrame(monitor);
    };

    // Start playback once metadata is ready
    const start = () => {
      vidA.currentTime = 0;
      tryPlay(vidA);
      rafId = requestAnimationFrame(monitor);
    };

    if (vidA.readyState >= 1) {
      start();
    } else {
      vidA.addEventListener("loadedmetadata", start, { once: true });
    }

    // Safety: if a video somehow hits "ended", force crossfade
    const onEndedA = () => { if (active === vidA && !isCrossfading) doCrossfade(); };
    const onEndedB = () => { if (active === vidB && !isCrossfading) doCrossfade(); };
    vidA.addEventListener("ended", onEndedA);
    vidB.addEventListener("ended", onEndedB);

    // iOS autoplay unlock
    const unlock = () => {
      if (active.paused) tryPlay(active);
    };
    document.addEventListener("touchstart", unlock, { once: true });
    document.addEventListener("click", unlock, { once: true });

    return () => {
      cancelAnimationFrame(rafId);
      vidA.removeEventListener("ended", onEndedA);
      vidB.removeEventListener("ended", onEndedB);
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, []);


  const tagRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const line1Refs = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const line2Refs = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([null, null, null, null]);

  // Snap-stepping hero: while the page is at the very top, each scroll /
  // swipe / arrow-key moves the headline one stage. Past the last stage (or
  // above the first) input is released to normal native scrolling, so the
  // rest of the page scrolls exactly as the browser normally would.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stageEls = (i: number) =>
      [tagRefs.current[i], line1Refs.current[i], line2Refs.current[i], descRefs.current[i]].filter(
        (el): el is HTMLElement => Boolean(el),
      );

    STAGES.forEach((_, i) => {
      gsap.set(stageEls(i), {
        opacity: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 40,
        filter: i === 0 ? "blur(0px)" : "blur(12px)",
      });
    });
    const videoWrap = videoWrapRef.current;
    const vignette = vignetteRef.current;
    gsap.set(videoWrap, { scale: 1 });
    gsap.set(vignette, { opacity: 0.48 });

    let current = 0;
    let lockedUntil = 0;

    const atTop = () => window.scrollY <= 2;
    const isEdge = (dir: number) => (dir > 0 && current === LAST_STAGE) || (dir < 0 && current === 0);

    // While a swipe would step the hero, the browser must not also scroll the
    // page. Toggled (rather than always on) so a partly-scrolled hero, or one
    // at its last stage, never traps touch scrolling.
    const syncTouchAction = () => {
      section.style.touchAction = atTop() && current < LAST_STAGE ? "none" : "pan-y";
    };

    const step = (next: number) => {
      if (next === current || next < 0 || next > LAST_STAGE) return;
      const prev = current;
      const dir = next > prev ? 1 : -1;
      current = next;
      lockedUntil = performance.now() + STEP_LOCK_MS;
      syncTouchAction();

      const dur = reduceMotion ? 0.01 : STEP_SECONDS;
      const outgoing = stageEls(prev);
      const incoming = stageEls(next);
      gsap.killTweensOf([...outgoing, ...incoming]);
      gsap.to(outgoing, {
        opacity: 0,
        y: -40 * dir,
        filter: "blur(12px)",
        duration: dur * 0.55,
        ease: "power2.in",
        stagger: 0.03,
      });
      gsap.fromTo(
        incoming,
        { opacity: 0, y: 40 * dir, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: dur,
          ease: "power3.out",
          stagger: 0.07,
          delay: dur * 0.4,
        },
      );
      gsap.to(videoWrap, { scale: 1 + 0.03 * next, duration: dur * 1.6, ease: "power2.out", overwrite: true });
      gsap.to(vignette, { opacity: 0.48 + 0.12 * next, duration: dur * 1.6, ease: "power2.out", overwrite: true });
    };

    // ── Wheel / trackpad ────────────────────────────────────────────────
    let lastWheel = 0;
    let swallowing = false; // rest of a gesture that already caused a step
    let released = false; // gesture handed over to native scroll
    const onWheel = (e: WheelEvent) => {
      if (!atTop() || !section.contains(e.target as Node)) return;
      const dir = Math.sign(e.deltaY);
      if (!dir) return;

      const now = performance.now();
      if (now - lastWheel > WHEEL_QUIET_MS) {
        swallowing = false;
        released = false;
      }
      lastWheel = now;

      if (swallowing || now < lockedUntil) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (released) return;

      if (isEdge(dir)) {
        released = true;
        return;
      }
      if (e.cancelable) e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      swallowing = true;
      step(current + dir);
    };

    // ── Touch ───────────────────────────────────────────────────────────
    let touchStartY = 0;
    let touchTracking = false;
    const onTouchStart = (e: TouchEvent) => {
      touchTracking = atTop() && section.contains(e.target as Node);
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchTracking) return;
      touchTracking = false;
      const dy = touchStartY - (e.changedTouches[0]?.clientY ?? touchStartY);
      if (Math.abs(dy) < SWIPE_PX || performance.now() < lockedUntil) return;
      const dir = Math.sign(dy);
      // Swiping up past the last stage is a native scroll that already ran.
      if (dir > 0 && current === LAST_STAGE) return;
      if (atTop()) step(current + dir);
    };

    // ── Keyboard ────────────────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      if (!atTop() || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(t.tagName))) return;
      let dir = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) dir = -1;
      if (!dir || isEdge(dir)) return;
      e.preventDefault();
      if (performance.now() >= lockedUntil) step(current + dir);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", syncTouchAction, { passive: true });
    syncTouchAction();

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", syncTouchAction);
      section.style.touchAction = "";
      gsap.killTweensOf([videoWrap, vignette]);
      STAGES.forEach((_, i) => gsap.killTweensOf(stageEls(i)));
    };
  }, []);

  const videoStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    pointerEvents: "none",
    outline: "none",
    willChange: "opacity",
  };

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000;
        }
        video::-webkit-media-controls,
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-start-playback-button,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-timeline,
        video::-webkit-media-controls-current-time-display,
        video::-webkit-media-controls-fullscreen-button,
        video::-webkit-media-controls-mute-button,
        video::-webkit-media-controls-volume-slider,
        video::-internal-media-controls-download-button {
          display: none !important;
          -webkit-appearance: none !important;
          opacity: 0 !important;
        }
        * { -webkit-tap-highlight-color: transparent; }
        body { overscroll-behavior-y: none; }
      `}</style>

      <div ref={containerRef} style={{ margin: 0, padding: 0, background: "#000" }}>
        <section
          ref={sectionRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100svh",
            minHeight: 580,
            overflow: "hidden",
            background: "#000",
            margin: 0,
            padding: 0,
          }}
        >
          {/* ── Video layer ──────────────────────────────────────── */}
          <div
            ref={videoWrapRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              transformOrigin: "center center",
              willChange: "transform",
              background: "#000",
              pointerEvents: "none",
            }}
          >
            {/* Video A */}
            <video
              ref={vidARef}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              style={{ ...videoStyle, opacity: 1 }}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            {/* Video B — used for crossfade */}
            <video
              ref={vidBRef}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              style={{ ...videoStyle, opacity: 0 }}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>

          {/* ── Overlays ─────────────────────────────────────────── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
            <div
              ref={vignetteRef}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 15%, rgba(0,0,0,0.88) 85%)",
                opacity: 0.48,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "0 0 auto 0",
                height: 120,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "auto 0 0 0",
                height: 200,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)",
              }}
            />
          </div>

          {/* Real page H1 for SEO/crawlers - the animated headline below cycles
              through 4 stages, each visually its own heading, so none of them
              can safely be the single page H1. This one carries the primary
              keyword and is visually hidden (sr-only), not display:none, so
              it's still announced to screen readers and isn't cloaked text. */}
          <h1 className="sr-only">Best Kidney Stone Treatment in India</h1>

          {/* ── Text stages ──────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 900,
                margin: "0 auto",
                padding: "0 24px",
                height: "70vh",
                textAlign: "center",
              }}
            >
              {STAGES.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 24px",
                  }}
                >
                  <span
                    ref={(el) => { tagRefs.current[i] = el; }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: "clamp(12px, 2vw, 18px)",
                      fontWeight: 900,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#fff",
                      marginBottom: 20,
                      willChange: "transform, opacity",
                    }}
                  >
                    {s.tag}
                  </span>

                  <h2
                    style={{
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      lineHeight: 0.85,
                    }}
                  >
                    <span
                      ref={(el) => { line1Refs.current[i] = el; }}
                      style={{
                        display: "block",
                        fontWeight: 900,
                        fontStyle: "normal",
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        fontSize: "clamp(3.0rem, 10vw, 8.5rem)",
                        textShadow: "0 4px 60px rgba(0,0,0,0.8)",
                        willChange: "transform, opacity",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.line1}
                    </span>
                    <span
                      ref={(el) => { line2Refs.current[i] = el; }}
                      style={{
                        display: "block",
                        fontWeight: 900,
                        fontStyle: "normal",
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        fontSize: "clamp(1.6rem, 5.5vw, 4.8rem)",
                        marginTop: "0.08em",
                        textShadow: "0 2px 30px rgba(0,0,0,0.7)",
                        willChange: "transform, opacity",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.line2}
                    </span>
                  </h2>

                  {s.desc ? (
                    <p
                      ref={(el) => { descRefs.current[i] = el; }}
                      style={{
                        marginTop: 28,
                        marginBottom: 0,
                        color: "rgba(255,255,255,0.82)",
                        fontWeight: 700,
                        fontStyle: "normal",
                        lineHeight: 1.65,
                        maxWidth: 480,
                        fontSize: "clamp(0.8rem, 1.5vw, 0.98rem)",
                        willChange: "transform, opacity",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {s.desc}
                    </p>
                  ) : (
                    <p
                      ref={(el) => { descRefs.current[i] = el; }}
                      style={{ margin: 0, height: 0, overflow: "hidden" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA Button ───────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(56px, 8vh, 80px)",
              left: 0,
              right: 0,
              zIndex: 30,
              display: "flex",
              justifyContent: "center",
              padding: "0 24px",
            }}
          >
            <button
              onClick={() => {
                document
                  .getElementById("appointment-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "14px 36px",
                background: "#fff",
                color: "#000",
                border: "none",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 0 30px rgba(255,255,255,0.12)",
                transition: "background 0.25s, transform 0.15s",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.88)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Book Free Appointment →
            </button>
          </div>

          {/* ── Scroll hint ──────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: 0,
              right: 0,
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: 8,
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 900,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 28,
                background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
}

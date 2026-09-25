"use client";
import React, { useEffect, useRef } from "react";

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
// Scroll input needed to travel from one headline to the next.
const WHEEL_PX_PER_STEP = 360;
// A wheel gesture (incl. trackpad inertia) ends once events pause this long.
const WHEEL_QUIET_MS = 140;
// Past this fraction of a step (one mouse-wheel notch is ~0.28), letting go
// finishes the step; short of it, the headline eases back.
const COMMIT_AT = 0.22;
// A wheel gesture that has travelled this far settles immediately.
const WHEEL_COMMIT_NOW = 0.6;
// Stiffness of the critically-damped spring that eases the on-screen position
// toward the target (~4.7 / omega seconds to settle; lower = slower). Stiff
// while a finger / wheel is actively driving it, so the headline tracks input
// closely; soft while settling onto a headline, for a slow, smooth glide.
const OMEGA_LIVE = 16;
const OMEGA_SETTLE = 5;

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

  // Scroll-linked stepping hero. While the page is at the very top, wheel /
  // trackpad / touch / key input moves a *target* position along the four
  // headlines; the on-screen position chases it with a critically-damped
  // spring every frame. That gives one continuous, decelerating motion (no
  // jump-pause-animate), and any small scroll visibly moves the headline.
  // When input stops the target snaps to the nearest headline (biased by
  // COMMIT_AT). Past the last headline / above the first, input is released
  // to native scrolling.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videoWrap = videoWrapRef.current;
    const vignette = vignetteRef.current;
    const stageEls = (i: number) =>
      [tagRefs.current[i], line1Refs.current[i], line2Refs.current[i], descRefs.current[i]];

    const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
    const clamp01 = (n: number) => clamp(n, 0, 1);

    // Positions are in "headline units": 0 = first headline, LAST_STAGE = last.
    let pos = 0; // what's on screen
    let vel = 0;
    let target = 0; // where input wants it
    let running = false;
    let engaged = false; // input is actively driving the target
    let rafId = 0;
    let lastFrame = 0;

    const setEl = (el: HTMLElement | null, op: number, y: number) => {
      if (!el) return;
      const blur = 12 * (1 - op);
      el.style.opacity = op.toFixed(3);
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      el.style.filter = blur < 0.2 ? "none" : `blur(${blur.toFixed(1)}px)`;
    };

    const render = () => {
      const a = Math.min(Math.floor(pos), LAST_STAGE - 1);
      const t = pos - a;
      STAGES.forEach((_, i) => {
        stageEls(i).forEach((el, j) => {
          if (i === a) {
            const op = clamp01(1 - t / 0.6);
            setEl(el, op, -40 * (1 - op));
          } else if (i === a + 1) {
            // Mirror of the outgoing fade (reaches 1 only at t = 1, so there is no
            // dead zone where scrolling changes nothing), staggered per element.
            const start = 0.4 + j * 0.04;
            const op = clamp01((t - start) / (1 - start));
            setEl(el, op, 40 * (1 - op));
          } else {
            setEl(el, 0, i < a ? -40 : 40);
          }
        });
      });
      if (videoWrap) videoWrap.style.transform = `scale(${(1 + 0.03 * pos).toFixed(4)})`;
      if (vignette) vignette.style.opacity = (0.48 + 0.12 * pos).toFixed(3);
    };

    const atTop = () => window.scrollY <= 2;

    // While a swipe would move the hero, the browser must not also scroll the
    // page. Toggled (rather than always on) so a partly-scrolled hero, or one
    // at its last stage, never traps touch scrolling.
    const syncTouchAction = () => {
      section.style.touchAction = atTop() && target < LAST_STAGE ? "none" : "pan-y";
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - lastFrame) / 1000);
      lastFrame = now;
      const omega = engaged ? OMEGA_LIVE : OMEGA_SETTLE;
      const accel = -omega * omega * (pos - target) - 2 * omega * vel;
      vel += accel * dt;
      pos = clamp(pos + vel * dt, 0, LAST_STAGE);
      if (Math.abs(pos - target) < 0.003 && Math.abs(vel) < 0.02) {
        pos = target;
        vel = 0;
        running = false;
        render();
        syncTouchAction();
        return;
      }
      render();
      rafId = requestAnimationFrame(tick);
    };
    const moveTo = (next: number) => {
      target = clamp(next, 0, LAST_STAGE);
      // Decided by where we're headed, not where the spring has got to, so a
      // swipe to leave the hero works the moment the last headline is chosen.
      syncTouchAction();
      if (reduceMotion) {
        pos = target;
        vel = 0;
        render();
        syncTouchAction();
        return;
      }
      if (!running) {
        running = true;
        lastFrame = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    // Snap the target to a whole headline once input stops. `dir` is the way
    // the gesture was travelling; a flick commits with even a short move.
    const snap = (dir: number, flick = false) => {
      engaged = false;
      const a = Math.floor(target);
      const f = target - a;
      if (f < 0.0005) {
        moveTo(a);
        return;
      }
      const progressed = dir > 0 ? f : 1 - f;
      const commit = progressed >= COMMIT_AT || (flick && progressed > 0.08);
      moveTo(dir > 0 ? (commit ? a + 1 : a) : commit ? a : a + 1);
    };

    render();
    syncTouchAction();

    // Gesture bookkeeping shared by wheel and touch: input can only carry the
    // target one headline away from where the gesture began.
    let gestureFrom = 0;
    const gestureBounds = () => [Math.max(0, gestureFrom - 1), Math.min(LAST_STAGE, gestureFrom + 1)] as const;

    // ── Wheel / trackpad ────────────────────────────────────────────────
    let lastWheel = 0;
    let lastDir = 1;
    let lastAbs = 0;
    let spent = false; // this gesture already committed; ignore its momentum tail
    let released = false; // gesture handed over to native scroll
    let snapTimer: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      if (!atTop() || !section.contains(e.target as Node)) return;
      const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      const dir = Math.sign(dy);
      if (!dir) return;
      const abs = Math.abs(dy);

      const now = performance.now();
      // A Mac trackpad keeps emitting decaying wheel events for a second or
      // more after the fingers lift, so a pause is not the only sign of a new
      // gesture: a reversal, or deltas growing again, is one too.
      const fresh =
        now - lastWheel > WHEEL_QUIET_MS || dir !== lastDir || (abs > lastAbs * 1.3 && abs - lastAbs >= 4);
      lastWheel = now;
      lastAbs = abs;
      if (fresh) {
        clearTimeout(snapTimer);
        if (engaged || Math.abs(target - Math.round(target)) > 0.0005) snap(lastDir);
        gestureFrom = Math.round(target);
        spent = false;
        released = (dir > 0 && gestureFrom === LAST_STAGE) || (dir < 0 && gestureFrom === 0);
      }
      lastDir = dir;
      if (released) return;

      if (e.cancelable) e.preventDefault();
      if (spent) return;
      engaged = true;
      const [lo, hi] = gestureBounds();
      const next = clamp(target + dy / WHEEL_PX_PER_STEP, lo, hi);
      moveTo(next);
      clearTimeout(snapTimer);
      if (Math.abs(next - gestureFrom) >= WHEEL_COMMIT_NOW) {
        // Clearly a full step: settle now instead of waiting out the tail.
        spent = true;
        snap(dir);
      } else {
        snapTimer = setTimeout(() => snap(lastDir), WHEEL_QUIET_MS);
      }
    };

    // ── Touch: the headline follows the finger, then settles ────────────
    let tracking = false;
    let startY = 0;
    let startTarget = 0;
    let lastY = 0;
    let lastT = 0;
    let velocity = 0; // px/ms, + = finger moving up (scrolling down)
    const range = () => Math.min(380, Math.max(220, window.innerHeight * 0.4));
    const onTouchStart = (e: TouchEvent) => {
      tracking = atTop() && section.contains(e.target as Node);
      if (!tracking) return;
      gestureFrom = Math.round(target);
      startTarget = target;
      startY = lastY = e.touches[0]?.clientY ?? 0;
      lastT = performance.now();
      velocity = 0;
      engaged = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!tracking) return;
      const y = e.touches[0]?.clientY ?? lastY;
      const now = performance.now();
      if (now > lastT) velocity = (lastY - y) / (now - lastT);
      lastY = y;
      lastT = now;
      const [lo, hi] = gestureBounds();
      moveTo(clamp(startTarget + (startY - y) / range(), lo, hi));
    };
    const onTouchEnd = () => {
      if (!tracking) return;
      tracking = false;
      const flick = Math.abs(velocity) > 0.5;
      snap(flick ? Math.sign(velocity) : Math.sign(target - startTarget) || 1, flick);
    };

    // ── Keyboard ────────────────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      if (!atTop() || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(t.tagName))) return;
      let dir = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) dir = -1;
      const rest = Math.round(target);
      if (!dir || (dir > 0 && rest === LAST_STAGE) || (dir < 0 && rest === 0)) return;
      e.preventDefault();
      if (Math.abs(pos - target) < 0.05) moveTo(rest + dir);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", syncTouchAction, { passive: true });

    return () => {
      clearTimeout(snapTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", syncTouchAction);
      section.style.touchAction = "";
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
          <h1 className="sr-only">Kidney Stone Treatment in Gurgaon, India</h1>

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

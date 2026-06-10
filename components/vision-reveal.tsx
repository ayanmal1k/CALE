"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VisionReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const circle = circleRef.current;
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!wrapper || !circle || !v1 || !v2) return;

    // Ensure mask videos play
    v1.play().catch(() => {});
    v2.play().catch(() => {});

    // Get content elements
    const bottomLine = wrapper.querySelector(".vision-bottomline");
    const visionText = wrapper.querySelector(".vision-big-text");
    const toLifeText = wrapper.querySelector(".vision-big-text-2");
    const desc = wrapper.querySelector(".vision-desc");

    // Set initial states — text starts very small
    gsap.set([visionText, toLifeText], { opacity: 0, scale: 0.15 });
    gsap.set(bottomLine, { opacity: 0, y: 30, scale: 0.6 });
    gsap.set(desc, { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── Circle expands from BOTTOM center ──
      tl.fromTo(
        circle,
        { clipPath: "circle(0% at 50% 100%)" },
        { clipPath: "circle(150% at 50% 100%)", duration: 1, ease: "power2.inOut" },
        0
      );

      // ── Big text: starts tiny, scales to full across the circle expansion ──
      // FIRST grows from 0.15 → 1 as circle fills
      tl.to(
        visionText,
        { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" },
        0.05
      );
      // IMPRESSIONS follows slightly after
      tl.to(
        toLifeText,
        { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" },
        0.1
      );

      // ── "Are Everything." fades in after big text ──
      tl.to(bottomLine, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }, 0.35);

      // ── Description fades in once circle is mostly open ──
      tl.to(desc, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.5);

      // ── Hold for reading ──
      tl.to({}, { duration: 0.35 });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="vision-wrapper" ref={wrapperRef}>
      <div className="vision-sticky">
        {/* Black background */}
        <div className="vision-bg-black" />

        {/* White circle reveal from center */}
        <div className="vision-circle" ref={circleRef}>
          <div className="vision-content">
            {/* FIRST — video fills the text shape */}
            <div className="vision-big-text">
              <span className="vision-text-shape">FIRST</span>
              <video
                ref={videoRef1}
                className="vision-text-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/mask.mp4" type="video/mp4" />
              </video>
            </div>

            {/* IMPRESSIONS — video fills the text shape */}
            <div className="vision-big-text-2">
              <span className="vision-text-shape">IMPRESSIONS</span>
              <video
                ref={videoRef2}
                className="vision-text-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/mask.mp4" type="video/mp4" />
              </video>
            </div>

            <p className="vision-bottomline">Are Everything.</p>

            <p className="vision-desc">
              In the service industry, trust is the primary currency. Your website
              is often the first and only chance you have to prove you&apos;re the
              authority in your market. We make that impression count.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


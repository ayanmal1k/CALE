"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VisionReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const circle = circleRef.current;
    const video = videoRef.current;
    const video2 = videoRef2.current;
    if (!wrapper || !sticky || !circle || !video || !video2) return;

    // Ensure mask videos play
    video.play().catch(() => {});
    video2.play().catch(() => {});

    // Get content elements
    const topLine = sticky.querySelector(".vision-topline");
    const visionText = sticky.querySelector(".vision-big-text");
    const toLifeText = sticky.querySelector(".vision-big-text-2");
    const desc = sticky.querySelector(".vision-desc");
    const cta = sticky.querySelector(".vision-cta-wrap");

    // Set initial states
    gsap.set([topLine, visionText, toLifeText, desc, cta], {
      opacity: 0,
      y: 60,
    });

    const ctx = gsap.context(() => {
      // Use the wrapper (tall scrollable area) as the trigger
      // The sticky inner stays fixed while the wrapper scrolls through
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Circle expands from bottom (0 → 0.5)
      tl.fromTo(
        circle,
        { clipPath: "circle(0% at 50% 100%)" },
        { clipPath: "circle(150% at 50% 50%)", duration: 1, ease: "power2.inOut" },
        0
      );

      // Phase 2: Content reveals staggered (0.25 → 0.65)
      tl.to(topLine, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.3);
      tl.to(visionText, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.35);
      tl.to(toLifeText, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.4);
      tl.to(desc, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.5);
      tl.to(cta, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.55);

      // Phase 3: Hold for reading (0.7 → 1.0 is just hold time)
      tl.to({}, { duration: 0.3 });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="vision-wrapper slide-over" ref={wrapperRef} style={{ zIndex: 2 }}>
      <div className="vision-sticky" ref={stickyRef}>
        {/* Black background */}
        <div className="vision-bg-black" />

        {/* White circle reveal */}
        <div className="vision-circle" ref={circleRef}>
          <div className="vision-content">
            <p className="vision-topline">We Bring Your</p>

            <div className="vision-big-text">
              <span className="vision-masked-text">VISION</span>
              <video
                ref={videoRef}
                className="vision-mask-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/mask.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="vision-big-text-2">
              <span className="vision-masked-text">TO LIFE</span>
              <video
                ref={videoRef2}
                className="vision-mask-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/mask.mp4" type="video/mp4" />
              </video>
            </div>

            <p className="vision-desc">
              We&apos;re dedicated to pushing the boundaries of design and
              technology to deliver innovative strategies that captivate audiences
              and drive business growth. We boast an impeccable track record, with
              a 100% success rate.
            </p>

            <div className="vision-cta-wrap">
              <a href="#portfolio" className="vision-cta">
                OUR PROJECTS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

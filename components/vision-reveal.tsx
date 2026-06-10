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

    // Get content elements for staggered reveal
    const sticky = wrapper.querySelector(".vision-sticky");
    const topLine = wrapper.querySelector(".vision-topline");
    const visionText = wrapper.querySelector(".vision-big-text");
    const toLifeText = wrapper.querySelector(".vision-big-text-2");
    const desc = wrapper.querySelector(".vision-desc");
    const cta = wrapper.querySelector(".vision-cta-wrap");

    // Set initial states
    gsap.set([topLine, visionText, toLifeText, desc, cta], {
      opacity: 0,
      y: 60,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Circle expands from bottom center (0 → 0.55)
      tl.fromTo(
        circle,
        { clipPath: "circle(0% at 50% 100%)" },
        { clipPath: "circle(150% at 50% 50%)", duration: 1.1, ease: "power2.inOut" },
        0
      );

      // Content reveals staggered (0.25 → 0.65)
      tl.to(topLine, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.25);
      tl.to(visionText, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.3);
      tl.to(toLifeText, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.35);
      tl.to(desc, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.45);
      tl.to(cta, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.5);

      // Hold time for reading
      tl.to({}, { duration: 0.35 });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="vision-wrapper" ref={wrapperRef}>
      <div className="vision-sticky">
        {/* Black background */}
        <div className="vision-bg-black" />

        {/* White circle reveal */}
        <div className="vision-circle" ref={circleRef}>
          <div className="vision-content">
            <p className="vision-topline">We Bring Your</p>

            {/* VISION — video fills the text shape */}
            <div className="vision-big-text">
              <span className="vision-text-shape">VISION</span>
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

            {/* TO LIFE — video fills the text shape */}
            <div className="vision-big-text-2">
              <span className="vision-text-shape">TO LIFE</span>
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

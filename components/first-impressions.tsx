"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useSectionReveal, useParallaxY } from "@/hooks/use-parallax";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FirstImpressions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const headingReveal = useSectionReveal(headingRef, 50);
  const textReveal = useSectionReveal(textRef, 40);
  const bgParallax = useParallaxY(sectionRef, 0.15);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      if (!section || !inner) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Section 3D tilt — same as services/industries
      tl.fromTo(inner,
        { rotateX: 8, z: -80 },
        { rotateX: -8, z: -80, ease: "none", duration: 2 },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="first-impressions slide-over parallax-section"
      ref={sectionRef}
      style={{ zIndex: 2, perspective: 1200 }}
    >
      <motion.div
        className="first-impressions-bg-shift"
        style={{ y: bgParallax }}
      />
      <div className="first-impressions-inner" ref={innerRef}>
        <motion.h2
          className="first-impressions-heading parallax-content"
          ref={headingRef}
          style={{ opacity: headingReveal.opacity, y: headingReveal.y }}
        >
          First Impressions <br />
          <span className="first-impressions-highlight">
            <span className="shiny-text">Are Everything.</span>
          </span>
        </motion.h2>
        <motion.p
          className="first-impressions-text parallax-content"
          ref={textRef}
          style={{ opacity: textReveal.opacity, y: textReveal.y }}
        >
          In the service industry, trust is the primary currency. Your website is often the first and only chance you have to prove you&apos;re the authority in your market. We make that impression count.
        </motion.p>
      </div>
    </section>
  )
}

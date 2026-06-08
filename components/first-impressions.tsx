"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useSectionReveal, useParallaxY } from "@/hooks/use-parallax";

export default function FirstImpressions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const headingReveal = useSectionReveal(headingRef, 50);
  const textReveal = useSectionReveal(textRef, 40);
  const bgParallax = useParallaxY(sectionRef, 0.15);

  return (
    <section className="first-impressions slide-over" ref={sectionRef} style={{ zIndex: 2 }}>
      <motion.div
        className="first-impressions-bg-shift"
        style={{ y: bgParallax }}
      />
      <div className="first-impressions-inner">
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

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";
import { gsap } from "gsap";

const springConfig = { stiffness: 80, damping: 30, restDelta: 0.001 };

export default function HeroNew() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  // Mouse tracking for butterfly
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Scroll-driven parallax for sticky pinning
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.35, 0.7], [1, 1, 0]),
    springConfig
  );
  const heroScale = useSpring(
    useTransform(scrollYProgress, [0, 0.7], [1, 0.95]),
    springConfig
  );
  const heroY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -80]),
    springConfig
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = ((e.clientX - rect.left) - centerX) * 0.04;
    const offsetY = ((e.clientY - rect.top) - centerY) * 0.04;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const butterfly = butterflyRef.current;
    const content = contentRef.current;
    const video = videoRef.current;
    if (!butterfly || !content || !video) return;

    // Ensure video plays
    video.play().catch(() => {});

    // Get elements to animate
    const topLine = content.querySelector(".hero-new-topline");
    const creativity = content.querySelector(".hero-new-creativity-wrap");
    const subtitle = content.querySelector(".hero-new-subtitle");
    const cta = content.querySelector(".hero-new-cta-row");

    // Set initial states — hide everything, butterfly in center
    gsap.set(butterfly, { 
      xPercent: -50, 
      yPercent: -50, 
      left: "50%", 
      top: "50%", 
      scale: 1.3,
      opacity: 0 
    });
    gsap.set([topLine, creativity, subtitle, cta], { opacity: 0, y: 40 });

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Create the intro timeline
    const tl = gsap.timeline({ delay: 0.3 });
    timelineRef.current = tl;

    // 1. Butterfly fades in at center
    tl.to(butterfly, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    // 2. Butterfly moves to final position
    tl.to(butterfly, {
      left: isMobile ? "50%" : "78%",
      top: isMobile ? "25%" : "72%",
      scale: 1,
      duration: 1.4,
      ease: "power3.inOut",
    }, "+=0.3");

    // 3. Text elements appear with stagger
    tl.to(topLine, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    }, "-=0.6");

    tl.to(creativity, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.4");

    tl.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    }, "-=0.4");

    // 4. Button appears
    tl.to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="hero-new-page" ref={sectionRef} onMouseMove={handleMouseMove}>
      <Navbar />
      <motion.div
        className="hero-new-stage"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        } as any}
      >
        <div className="hero-new-content" ref={contentRef}>
          <p className="hero-new-topline">Where Innovation Meets</p>

          <div className="hero-new-creativity-wrap">
            <h1 className="hero-new-creativity">
              <span className="hero-new-creativity-text">CREATIVITY</span>
            </h1>
          </div>

          <p className="hero-new-subtitle">
            Crafting Advanced Website Designs for<br />
            Exceptional Sales Growth
          </p>

          <div className="hero-new-cta-row">
            <motion.a
              href="#"
              className="hero-new-cta"
              onHoverStart={() => setCtaHovered(true)}
              onHoverEnd={() => setCtaHovered(false)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.span
                className="hero-new-cta-fill"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: ctaHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <span className="hero-new-cta-content">
                REQUEST A FREE QUOTE TODAY!
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </span>
            </motion.a>
          </div>
        </div>

        {/* Butterfly — outer wrapper positioned by GSAP, inner offset by Framer Motion */}
        <div
          className="hero-new-butterfly"
          ref={butterflyRef}
        >
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              width: "100%",
              height: "100%",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="hero-new-butterfly-video"
            >
              <source src="/butterfly.webm" type="video/webm" />
            </video>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

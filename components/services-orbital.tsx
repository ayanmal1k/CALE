"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Palette, Code, ShieldCheck, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ElementType } from "react";

/* ── Service Data (same text content) ── */
const services = [
  {
    icon: Palette,
    number: "01",
    title: "Website Redesign",
    description:
      "Modernizing dated sites to meet current UX standards and mobile-first performance needs.",
  },
  {
    icon: Code,
    number: "02",
    title: "Design & Development",
    description:
      "Ground-up custom builds designed to capture high-intent traffic and convert visitors into leads.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Website Care Plans",
    description:
      "Continuous monitoring, speed optimization, and security updates so you can focus on your business.",
  },
];

/* ═══════════════════════════════════════════════════
   OrbitalCard — Single interactive service card
   ═══════════════════════════════════════════════════ */
function OrbitalCard({
  icon: Icon,
  number,
  title,
  description,
  index,
}: {
  icon: ElementType;
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Position the glow orb
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;

      // Subtle 3D tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 3;
      const rotateX = ((centerY - y) / centerY) * 3;

      const glass = card.querySelector<HTMLElement>(".svc-orbital__card-glass");
      if (glass) {
        glass.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (!card) return;
    const glass = card.querySelector<HTMLElement>(".svc-orbital__card-glass");
    if (glass) {
      glass.style.transform = "";
    }
  }, []);

  return (
    <div
      className="svc-orbital__card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-index={index}
    >
      <div className="svc-orbital__card-glass">
        {/* Magnetic glow */}
        <div className="svc-orbital__card-glow" ref={glowRef} />

        {/* Holographic shimmer */}
        <div className="svc-orbital__card-shimmer" />

        <div className="svc-orbital__card-content">
          {/* Number */}
          <div className="svc-orbital__number">
            <span className="svc-orbital__number-text">{number}</span>
          </div>

          {/* Icon */}
          <div className="svc-orbital__icon">
            <Icon size={24} strokeWidth={1.5} />
          </div>

          {/* Text */}
          <h3 className="svc-orbital__title">{title}</h3>
          <p className="svc-orbital__desc">{description}</p>

          {/* CTA */}
          <a href="#" className="svc-orbital__link">
            <span>Learn more</span>
            <span className="svc-orbital__link-arrow">
              <ArrowUpRight size={14} strokeWidth={2} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ServicesOrbital — Main section component
   ═══════════════════════════════════════════════════ */
export default function ServicesOrbital() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);

  /* Heading text split */
  const headingWords = [
    { text: "Core", accent: false },
    { text: " ", accent: false },
    { text: "Capabilities", accent: true },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;
    if (!section || !header || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll<HTMLElement>(".svc-orbital__card");
    const eyebrow = header.querySelector(".svc-orbital__eyebrow");

    const ctx = gsap.context(() => {
      /* ── Initial states ── */
      gsap.set(eyebrow, { opacity: 0, y: 30, scale: 0.9 });

      // Cards: each starts with unique offset for dramatic entrance
      cards.forEach((card, i) => {
        const offsets = [
          { x: -120, rotate: -6, scale: 0.85 },
          { y: 100, rotate: 0, scale: 0.8 },
          { x: 120, rotate: 6, scale: 0.85 },
        ];
        const o = offsets[i] || offsets[1];
        gsap.set(card, {
          opacity: 0,
          x: o.x || 0,
          y: o.y || 0,
          rotate: o.rotate || 0,
          scale: o.scale || 0.85,
        });
      });

      /* ── ScrollTrigger timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "center center",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // 1. Eyebrow
      tl.to(eyebrow, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      }, 0);

      // 2. Heading words reveal — staggered
      wordRefs.current.forEach((word, i) => {
        if (!word) return;
        tl.add(() => {
          word.classList.add("revealed");
        }, 0.1 + i * 0.08);
      });

      // 3. Cards entrance — dramatic stagger
      cards.forEach((card, i) => {
        tl.to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        }, 0.35 + i * 0.08);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="svc-orbital slide-over"
      id="services"
      ref={sectionRef}
    >
      {/* Ambient background */}
      <div className="svc-orbital__ambient">
        <div className="svc-orbital__orb svc-orbital__orb--1" />
        <div className="svc-orbital__orb svc-orbital__orb--2" />
        <div className="svc-orbital__orb svc-orbital__orb--3" />
        <div className="svc-orbital__noise" />
      </div>

      <div className="svc-orbital__sticky">
        {/* Header */}
        <div className="svc-orbital__header" ref={headerRef}>
          <div className="svc-orbital__eyebrow">
            <span className="svc-orbital__eyebrow-pulse" />
            What We Do
          </div>
          <h2 className="svc-orbital__heading">
            {headingWords.map((word, i) => {
              if (word.text === " ") {
                return " ";
              }
              return (
                <span key={i} className="svc-orbital__heading-word">
                  <span
                    className={`svc-orbital__heading-word-inner${
                      word.accent ? " svc-orbital__heading-accent" : ""
                    }`}
                    ref={(el) => {
                      if (el) wordRefs.current[i] = el;
                    }}
                  >
                    {word.text}
                  </span>
                </span>
              );
            })}
          </h2>
        </div>

        {/* Cards */}
        <div className="svc-orbital__cards" ref={cardsContainerRef}>
          {services.map((service, i) => (
            <OrbitalCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="svc-orbital__line" />
    </section>
  );
}

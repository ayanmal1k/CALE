"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Car,
  Truck,
  Thermometer,
  Droplets,
  Sprout,
  Building2,
  Cog,
  ArrowUpRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ElementType } from "react";

const industries = [
  {
    icon: Car,
    name: "Auto Shops",
    tagline: "From brake jobs to full builds",
    color: "#a855f7",
    colorRgb: "168, 85, 247",
  },
  {
    icon: Truck,
    name: "Diesel Companies",
    tagline: "Heavy-duty digital presence",
    color: "#22d3ee",
    colorRgb: "34, 211, 238",
  },
  {
    icon: Thermometer,
    name: "HVAC",
    tagline: "Climate control, online authority",
    color: "#f472b6",
    colorRgb: "244, 114, 182",
  },
  {
    icon: Droplets,
    name: "Plumbing",
    tagline: "Emergency-ready, trust-first",
    color: "#60a5fa",
    colorRgb: "96, 165, 250",
  },
  {
    icon: Sprout,
    name: "Landscaping",
    tagline: "Seasonal services, year-round leads",
    color: "#34d399",
    colorRgb: "52, 211, 153",
  },
  {
    icon: Building2,
    name: "Contractors",
    tagline: "General & specialty trades",
    color: "#fb923c",
    colorRgb: "251, 146, 60",
  },
  {
    icon: Cog,
    name: "Fabrication",
    tagline: "Custom metalwork & manufacturing",
    color: "#facc15",
    colorRgb: "250, 204, 21",
  },
];

/* ----------------------------------------------------------------
   IndustryTile - single interactive tile
   ---------------------------------------------------------------- */
function IndustryTile({
  icon: Icon,
  name,
  tagline,
  color,
  colorRgb,
  index,
}: {
  icon: ElementType;
  name: string;
  tagline: string;
  color: string;
  colorRgb: string;
  index: number;
}) {
  const tileRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const tile = tileRef.current;
      const glow = glowRef.current;
      if (!tile || !glow) return;
      const rect = tile.getBoundingClientRect();
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top = `${e.clientY - rect.top}px`;
    },
    []
  );

  return (
    <div
      className="ind-v2__tile"
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        {
          "--tile-color": color,
          "--tile-rgb": colorRgb,
        } as React.CSSProperties
      }
    >
      {/* Glow orb */}
      <div className="ind-v2__tile-glow" ref={glowRef} />

      {/* Shimmer */}
      <div className="ind-v2__tile-shimmer" />

      {/* Number watermark */}
      <span className="ind-v2__tile-num">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="ind-v2__tile-content">
        <div className="ind-v2__tile-icon">
          <Icon size={22} strokeWidth={1.5} />
        </div>

        <div className="ind-v2__tile-text">
          <h3 className="ind-v2__tile-name">{name}</h3>
          <p className="ind-v2__tile-tagline">{tagline}</p>
        </div>

        <div className="ind-v2__tile-arrow">
          <ArrowUpRight size={14} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   IndustriesV2 - Main section
   ================================================================ */
export default function IndustriesV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);

  const headingWords = [
    { text: "Industry", accent: false },
    { text: " ", accent: false },
    { text: "Expertise", accent: true },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;
    if (!section || !header || !grid || !cta) return;

    const tiles = grid.querySelectorAll<HTMLElement>(".ind-v2__tile");
    const eyebrow = header.querySelector(".ind-v2__eyebrow");
    const subtext = header.querySelector(".ind-v2__subtext");

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(eyebrow, { opacity: 0, y: 20, scale: 0.9 });
      gsap.set(subtext, { opacity: 0, y: 30 });
      gsap.set(cta, { opacity: 0, y: 40 });

      tiles.forEach((tile) => {
        gsap.set(tile, { opacity: 0, y: 60, scale: 0.92 });
      });

      // Scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "center center",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Eyebrow
      tl.to(eyebrow, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      }, 0);

      // Heading words
      wordRefs.current.forEach((word, i) => {
        if (!word) return;
        tl.add(() => {
          word.classList.add("revealed");
        }, 0.08 + i * 0.06);
      });

      // Subtext
      tl.to(subtext, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      }, 0.2);

      // Tiles stagger - masonry-like cascade
      tiles.forEach((tile, i) => {
        tl.to(tile, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        }, 0.3 + i * 0.04);
      });

      // CTA
      tl.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      }, 0.65);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="ind-v2 slide-over"
      id="industries"
      ref={sectionRef}
    >
      {/* Ambient */}
      <div className="ind-v2__ambient">
        <div className="ind-v2__orb ind-v2__orb--1" />
        <div className="ind-v2__orb ind-v2__orb--2" />
        <div className="ind-v2__noise" />
      </div>

      {/* Header */}
      <div className="ind-v2__header" ref={headerRef}>
        <div className="ind-v2__eyebrow">
          <span className="ind-v2__eyebrow-dot" />
          Who We Serve
        </div>

        <h2 className="ind-v2__heading">
          {headingWords.map((word, i) => {
            if (word.text === " ") return " ";
            return (
              <span key={i} className="ind-v2__heading-word">
                <span
                  className={`ind-v2__heading-word-inner${
                    word.accent ? " ind-v2__heading-accent" : ""
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

        <p className="ind-v2__subtext">
          We specialize in blue-collar authority. We know your customers and
          what they need to see before they pick up the phone.
        </p>
      </div>

      {/* Tile Grid */}
      <div className="ind-v2__grid" ref={gridRef}>
        {industries.map((item, i) => (
          <IndustryTile key={item.name} {...item} index={i} />
        ))}
      </div>

      {/* CTA Banner */}
      <div className="ind-v2__cta" ref={ctaRef}>
        <div className="ind-v2__cta-content">
          <span className="ind-v2__cta-label">
            Don&apos;t see your industry?
          </span>
          <span className="ind-v2__cta-title">Your Industry Next</span>
        </div>
        <a href="#" className="ind-v2__cta-btn">
          <span>Get Started</span>
          <span className="ind-v2__cta-arrow">
            <ArrowUpRight size={16} strokeWidth={2} />
          </span>
        </a>
      </div>
    </section>
  );
}

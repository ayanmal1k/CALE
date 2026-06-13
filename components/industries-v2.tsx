"use client";

import { useEffect, useRef, useState } from "react";
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
    description: "Custom booking engines, service pages, and project galleries designed to showcase your craftsmanship and keep your lift bays booked solid.",
    stat: "+142% Leads",
    statLabel: "Average increase in booking inquiries",
    color: "#a855f7",
    colorRgb: "168, 85, 247",
  },
  {
    icon: Truck,
    name: "Diesel Companies",
    tagline: "Heavy-duty digital presence",
    description: "High-performance web platforms that match the scale of your fleet and diesel operations, built to win lucrative commercial service contracts.",
    stat: "$2.4M+",
    statLabel: "Commercial contract value generated",
    color: "#22d3ee",
    colorRgb: "34, 211, 238",
  },
  {
    icon: Thermometer,
    name: "HVAC",
    tagline: "Climate control, online authority",
    description: "Emergency-optimized mobile layouts that capture high-intent service requests during peak weather seasons and build recurring membership agreements.",
    stat: "4.8x ROI",
    statLabel: "Average return on local service ads",
    color: "#f472b6",
    colorRgb: "244, 114, 182",
  },
  {
    icon: Droplets,
    name: "Plumbing",
    tagline: "Emergency-ready, trust-first",
    description: "Ultra-fast loading click-to-call interfaces that establish immediate trust when homeowners are facing critical water and sewer emergencies.",
    stat: "18 Min",
    statLabel: "Average response time on new leads",
    color: "#60a5fa",
    colorRgb: "96, 165, 250",
  },
  {
    icon: Sprout,
    name: "Landscaping",
    tagline: "Seasonal services, year-round leads",
    description: "Stunning design portfolios and interactive service packages that turn local homeowners and property managers into premium hardscaping contracts.",
    stat: "3.2x",
    statLabel: "Increase in commercial bids requested",
    color: "#34d399",
    colorRgb: "52, 211, 153",
  },
  {
    icon: Building2,
    name: "Contractors",
    tagline: "General & specialty trades",
    description: "Premium galleries, client testimonials, and interactive estimators that build confidence with residential and commercial developers.",
    stat: "+89%",
    statLabel: "Project close rate improvement",
    color: "#fb923c",
    colorRgb: "251, 146, 60",
  },
  {
    icon: Cog,
    name: "Fabrication",
    tagline: "Custom metalwork & manufacturing",
    description: "Technical capability showcases, precision equipment specs, and RFQ forms that make it easy for engineers to submit job bids.",
    stat: "12 Days",
    statLabel: "Saved per RFQ cycle on average",
    color: "#facc15",
    colorRgb: "250, 204, 21",
  },
  {
    icon: ArrowUpRight,
    name: "Your Trade Next?",
    tagline: "Let's build your authority",
    description: "We don't build generic cookie-cutter templates. If you run a high-quality service business, we will engineer a custom website tailored specifically to dominate your local market.",
    stat: "100% Custom",
    statLabel: "Zero templates. Built for your business.",
    color: "#f3f4f6",
    colorRgb: "243, 244, 246",
  },
];

export default function IndustriesV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const trigger = triggerRef.current;
    const drum = drumRef.current;
    if (!container || !trigger || !drum) return;

    const cards = drum.querySelectorAll<HTMLElement>(".ind-v3__card");
    const totalItems = industries.length;
    const anglePerItem = 360 / totalItems;

    // Radius of cylinder based on card size
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const radius = isMobile ? 220 : 360;

    // Arrange cards in 3D Cylinder
    cards.forEach((card, i) => {
      const angle = i * anglePerItem;
      gsap.set(card, {
        transform: `rotateX(${-angle}deg) translateZ(${radius}px)`,
      });
    });

    const ctx = gsap.context(() => {
      // Rotation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            // Calculate active index based on scroll progress
            const progress = self.progress;
            const floatIndex = progress * (totalItems - 1);
            const index = Math.min(
              Math.max(Math.round(floatIndex), 0),
              totalItems - 1
            );
            setActiveIndex(index);
          },
        },
      });

      // Rotate the drum based on scroll
      // We rotate from 0 to -(totalItems - 1) * anglePerItem
      tl.fromTo(
        drum,
        { rotateX: 0 },
        {
          rotateX: (totalItems - 1) * anglePerItem,
          ease: "none",
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const activeIndustry = industries[activeIndex];
  const ActiveIcon = activeIndustry.icon;

  return (
    <div
      ref={triggerRef}
      className="ind-v3__scroll-trigger"
      style={{
        "--active-color": activeIndustry.color,
        "--active-rgb": activeIndustry.colorRgb,
      } as React.CSSProperties}
    >
      <div ref={containerRef} className="ind-v3__container">
        {/* Ambient background glow matching active color */}
        <div className="ind-v3__ambient">
          <div className="ind-v3__glow-orb" />
          <div className="ind-v3__noise" />
        </div>

        <div className="ind-v3__content-grid">
          {/* Left panel: Info & Stats */}
          <div className="ind-v3__info-panel">
            <div className="ind-v3__eyebrow-container">
              <span className="ind-v3__eyebrow">INDUSTRY EXPERTISE</span>
              <span className="ind-v3__index">
                {String(activeIndex + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
              </span>
            </div>

            {/* Dynamic text reveal container */}
            <div className="ind-v3__dynamic-text">
              <div className="ind-v3__title-row">
                <span className="ind-v3__title-prefix">We Build for</span>
                <h2 className="ind-v3__title-name" key={activeIndustry.name}>
                  {activeIndustry.name}
                </h2>
              </div>
              <p className="ind-v3__description" key={activeIndustry.tagline}>
                {activeIndustry.description}
              </p>
            </div>

            {/* Stat Box */}
            <div className="ind-v3__stat-card" key={`stat-${activeIndex}`}>
              <div className="ind-v3__stat-value">{activeIndustry.stat}</div>
              <div className="ind-v3__stat-label">{activeIndustry.statLabel}</div>
            </div>

            {/* General CTA */}
            <a href="#quote" className="ind-v3__general-cta">
              <span>EXPLORE ALL SERVICES</span>
              <span className="ind-v3__cta-circle">
                <ArrowUpRight size={16} strokeWidth={2} />
              </span>
            </a>
          </div>

          {/* Right panel: 3D Cylinder Drum */}
          <div className="ind-v3__drum-container">
            <div className="ind-v3__drum-perspective">
              <div ref={drumRef} className="ind-v3__drum">
                {industries.map((ind, i) => {
                  const Icon = ind.icon;
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={ind.name}
                      className={`ind-v3__card ${isActive ? "is-active" : ""}`}
                      style={{
                        "--card-color": ind.color,
                        "--card-rgb": ind.colorRgb,
                      } as React.CSSProperties}
                    >
                      <div className="ind-v3__card-inner">
                        <div className="ind-v3__card-icon">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <div className="ind-v3__card-text">
                          <h4 className="ind-v3__card-name">{ind.name}</h4>
                          <p className="ind-v3__card-tagline">{ind.tagline}</p>
                        </div>
                        <div className="ind-v3__card-arrow">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Guide markers */}
            <div className="ind-v3__guide-lines">
              <div className="ind-v3__guide-line ind-v3__guide-line--top" />
              <div className="ind-v3__guide-line ind-v3__guide-line--bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

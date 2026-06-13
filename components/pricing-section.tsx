"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles, Layers, ShieldCheck, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pricingPlans = [
  {
    icon: Sparkles,
    title: "Website Redesign",
    price: "$2,500",
    prefix: "Starting at",
    description: "Modernizing dated frameworks to match high conversion speeds and contemporary UX standards.",
    color: "#a855f7",
    colorRgb: "168, 85, 247",
    features: [
      "UX/UI Visual Modernization",
      "Mobile-First Responsive Layouts",
      "Speed & Load-Time Optimizations",
      "Preservation of Existing SEO Rankings",
    ],
  },
  {
    icon: Layers,
    title: "Complete Custom Build",
    price: "$3,500",
    prefix: "Starting at",
    description: "Custom digital frameworks engineered from the ground up for high-margin service authority.",
    color: "#22d3ee",
    colorRgb: "34, 211, 238",
    features: [
      "100% Bespoke Creative Direction",
      "High-Performance Tech Stack",
      "Bespoke Lead-Capture Funnels",
      "Easy CMS Content Operations",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Website Care Plan",
    price: "$500",
    suffix: "/mo",
    prefix: "Starting at",
    description: "Continual speed optimization, security updates, and active content support.",
    color: "#34d399",
    colorRgb: "52, 211, 153",
    features: [
      "Active Development & Updates",
      "Uptime & Attack Monitoring",
      "Daily Cloud Backup Archives",
      "Ongoing Performance Auditing",
    ],
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".pricing-v3__card");
    const eyebrow = header.querySelector(".pricing-v3__eyebrow-container");
    const heading = header.querySelector(".pricing-v3__heading");
    const subtext = header.querySelector(".pricing-v3__subtext");

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([eyebrow, heading, subtext], { opacity: 0, y: 30 });
      cards.forEach((card, i) => {
        const offsetRotation = (i - 1) * 8;
        gsap.set(card, {
          opacity: 0,
          y: 100,
          rotateY: offsetRotation,
          scale: 0.9,
        });
      });

      // Scroll Trigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "center center",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.25 })
        .to(heading, { opacity: 1, y: 0, duration: 0.3 }, 0.1)
        .to(subtext, { opacity: 1, y: 0, duration: 0.25 }, 0.2);

      // Staggered cards reveal
      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
          },
          0.35 + i * 0.1
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, colorRgb: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    // Apply tilt transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Move interactive glow orb
    const glow = card.querySelector<HTMLElement>(".pricing-v3__card-glow");
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "";
  };

  return (
    <section ref={sectionRef} className="pricing-v3 slide-over" id="pricing">
      {/* Background ambient orbs */}
      <div className="pricing-v3__ambient">
        <div className="pricing-v3__orb pricing-v3__orb--1" />
        <div className="pricing-v3__orb pricing-v3__orb--2" />
        <div className="pricing-v3__noise" />
      </div>

      <div className="pricing-v3__inner">
        {/* Header */}
        <div ref={headerRef} className="pricing-v3__header">
          <div className="pricing-v3__eyebrow-container">
            <span className="pricing-v3__eyebrow-dot" />
            <span className="pricing-v3__eyebrow">TRANSPARENT VALUE</span>
          </div>
          <h2 className="pricing-v3__heading">
            SaaS-Grade <br />
            <span className="pricing-v3__highlight">Investment Plans</span>
          </h2>
          <p className="pricing-v3__subtext">
            No hidden retainers. No cookie-cutter systems. Select the digital structure that fits your current business growth timeline.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div ref={gridRef} className="pricing-v3__grid">
          {pricingPlans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.title}
                className="pricing-v3__card"
                onMouseMove={(e) => handleMouseMove(e, plan.colorRgb)}
                onMouseLeave={handleMouseLeave}
                style={{
                  "--plan-color": plan.color,
                  "--plan-rgb": plan.colorRgb,
                } as React.CSSProperties}
              >
                {/* Magnetic glow orb */}
                <div className="pricing-v3__card-glow" />

                <div className="pricing-v3__card-header">
                  <div className="pricing-v3__card-icon-wrap">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="pricing-v3__card-title">{plan.title}</h3>
                  <p className="pricing-v3__card-desc">{plan.description}</p>
                </div>

                <div className="pricing-v3__card-price-row">
                  <span className="pricing-v3__card-prefix">{plan.prefix}</span>
                  <div className="pricing-v3__card-price">
                    {plan.price}
                    {plan.suffix && (
                      <span className="pricing-v3__card-suffix">{plan.suffix}</span>
                    )}
                  </div>
                </div>

                <div className="pricing-v3__card-features">
                  {plan.features.map((feat) => (
                    <div key={feat} className="pricing-v3__feature-item">
                      <Check size={14} className="pricing-v3__check-icon" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pricing-v3__card-bottom">
                  <a href="#quote" className="pricing-v3__card-cta">
                    <span>GET STARTED TODAY</span>
                    <span className="pricing-v3__cta-arrow">
                      <ArrowUpRight size={14} />
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

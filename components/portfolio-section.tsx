"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "proj-1",
    title: "Diesel Auto Parts",
    category: "Custom E-commerce Design",
    color: "#a855f7",
    colorRgb: "168, 85, 247",
    src: "/portfolio/1.jpeg",
  },
  {
    id: "proj-2",
    title: "Quickfix Plumbing",
    category: "Service Business Redesign",
    color: "#22d3ee",
    colorRgb: "34, 211, 238",
    src: "/portfolio/2.jpeg",
  },
  {
    id: "proj-3",
    title: "Howlett Landscaping",
    category: "Premium Hardscaping Design",
    color: "#34d399",
    colorRgb: "52, 211, 153",
    src: "/portfolio/3.jpeg",
  },
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const cardsContainer = cardsRef.current;
    if (!container || !sticky || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll<HTMLElement>(".portfolio-v3__card");
    const header = sticky.querySelector(".portfolio-v3__header");
    const bgGlow = sticky.querySelector(".portfolio-v3__bg-glow");

    const ctx = gsap.context(() => {
      // Set initial state for stack
      cards.forEach((card, i) => {
        const rotationY = (i - 1) * 12; // tilted slightly in stack
        gsap.set(card, {
          opacity: 0,
          scale: 0.5,
          z: -400,
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          rotateY: rotationY,
          transformOrigin: "center center",
        });
      });

      gsap.set(header, { opacity: 0, y: 40 });
      gsap.set(bgGlow, { scale: 0.5, opacity: 0 });

      // Create scroll-driven 3D stack reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 1. Entry & Fan Out (progress 0% to 50%)
      tl.to(header, { opacity: 1, y: 0, duration: 0.3 }, 0)
        .to(bgGlow, { opacity: 1, scale: 1, duration: 0.4 }, 0)
        // Card 1 fans left
        .to(cards[0], {
          opacity: 1,
          scale: 0.95,
          z: 0,
          left: "22%",
          rotateY: 20,
          duration: 0.5,
          ease: "power2.out",
        }, 0.1)
        // Card 2 centers
        .to(cards[1], {
          opacity: 1,
          scale: 1,
          z: 40,
          left: "50%",
          rotateY: 0,
          duration: 0.55,
          ease: "power2.out",
        }, 0.05)
        // Card 3 fans right
        .to(cards[2], {
          opacity: 1,
          scale: 0.95,
          z: 0,
          left: "78%",
          rotateY: -20,
          duration: 0.5,
          ease: "power2.out",
        }, 0.1);

      // 2. Interactive Hold
      tl.to({}, { duration: 0.2 });

      // 3. Exit Camera Zoom-Through (progress 70% to 100%)
      tl.to(header, { opacity: 0, y: -40, duration: 0.3 }, 0.7)
        .to(bgGlow, { opacity: 0, scale: 1.5, duration: 0.35 }, 0.7)
        // Card 1 zooms out left
        .to(cards[0], {
          opacity: 0,
          scale: 1.5,
          z: 300,
          left: "-10%",
          rotateY: 40,
          duration: 0.35,
          ease: "power2.in",
        }, 0.7)
        // Card 2 zooms straight past camera
        .to(cards[1], {
          opacity: 0,
          scale: 1.7,
          z: 400,
          left: "50%",
          rotateX: -10,
          duration: 0.38,
          ease: "power2.in",
        }, 0.68)
        // Card 3 zooms out right
        .to(cards[2], {
          opacity: 0,
          scale: 1.5,
          z: 300,
          left: "110%",
          rotateY: -40,
          duration: 0.35,
          ease: "power2.in",
        }, 0.7);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="portfolio-v3__scroll-trigger" id="work">
      <div ref={stickyRef} className="portfolio-v3__sticky-container">
        {/* Ambient background glow */}
        <div className="portfolio-v3__bg-glow" />
        <div className="portfolio-v3__noise" />

        <div className="portfolio-v3__inner">
          {/* Header */}
          <div className="portfolio-v3__header">
            <div className="portfolio-v3__eyebrow-container">
              <span className="portfolio-v3__eyebrow-dot" />
              <span className="portfolio-v3__eyebrow">OUR PORTFOLIO</span>
            </div>
            <h2 className="portfolio-v3__heading">
              Recent <span className="portfolio-v3__highlight">Work</span>
            </h2>
            <p className="portfolio-v3__subtext">
              We design custom platforms designed to establish online authority and convert local traffic into calls.
            </p>
          </div>

          {/* 3D Perspective Card Stage */}
          <div ref={cardsRef} className="portfolio-v3__stage">
            {projects.map((project) => (
              <div
                key={project.id}
                className="portfolio-v3__card"
                style={{
                  "--card-accent": project.color,
                  "--card-rgb": project.colorRgb,
                } as React.CSSProperties}
              >
                <div className="portfolio-v3__card-inner">
                  {/* Laptop Mockup */}
                  <div className="portfolio-v3__laptop">
                    <div className="portfolio-v3__laptop-screen">
                      <div className="portfolio-v3__screen-bar">
                        <div className="portfolio-v3__screen-dots">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="portfolio-v3__screen-url">
                          cale.agency/work/{project.id}
                        </div>
                      </div>
                      <div className="portfolio-v3__screen-media">
                        <img src={project.src} alt={project.title} />
                      </div>
                    </div>
                    <div className="portfolio-v3__laptop-base">
                      <div className="portfolio-v3__laptop-groove" />
                    </div>
                  </div>

                  {/* Card Description info overlay */}
                  <div className="portfolio-v3__card-details">
                    <div className="portfolio-v3__card-top">
                      <span className="portfolio-v3__card-category">
                        {project.category}
                      </span>
                      <h4 className="portfolio-v3__card-title">{project.title}</h4>
                    </div>
                    <a href="#" className="portfolio-v3__card-link">
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

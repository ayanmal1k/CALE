"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  PenLine,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function HeroSection() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const nextScale = Math.max(
        1,
        Math.min(window.innerWidth / 1200, window.innerHeight / 800),
      );
      setScale(Number(nextScale.toFixed(4)));
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="hero-page">
      <Navbar />
      <div
        className="hero-scale-stage"
        style={{ "--hero-scale": scale } as CSSProperties}
      >
        <section className="hero-main">
          <div className="hero-main-inner">
            <div className="hero-left">
              <span className="hero-label">WEBSITE DESIGN &amp; REDESIGN</span>
              <h1 className="hero-heading">
                Websites That
                <br />
                Make Businesses
                <br />
                <span className="hero-heading-purple">Look As Good As</span>
                <br />
                <span className="hero-heading-purple">Their Work.</span>
              </h1>
              <p className="hero-subtext">
                High-converting websites for service businesses
                <br />
                that want to stand out, win trust, and grow.
              </p>
              <div className="hero-cta-row">
                <motion.a
                  href="#"
                  className="hero-btn-primary"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Request Quote
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </motion.a>
                <motion.a
                  href="#"
                  className="hero-btn-secondary"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  See Our Work
                  <ArrowRight size={16} strokeWidth={2} />
                </motion.a>
              </div>
            </div>

            <div className="hero-center">
              <Image
                src="/Hero.png"
                alt="Website mockups showcase"
                width={940}
                height={1220}
                className="hero-mockup-image"
                priority
              />
            </div>

            <div className="hero-right">
              <div className="hero-price-card">
                <div className="hero-price-card-header">
                  <div className="hero-price-icon">
                    <PenLine size={19} strokeWidth={1.9} />
                  </div>
                  <div>
                    <div className="hero-price-title">WEBSITE REDESIGN</div>
                    <div className="hero-price-starting">Starting at</div>
                  </div>
                </div>
                <div className="hero-price-amount">
                  <span className="hero-price-dollar">$</span>2,500
                </div>
                <p className="hero-price-desc">
                  Modernize your site and turn
                  <br />
                  more visitors into clients.
                </p>
                <div className="hero-price-arrow">
                  <ArrowRight size={16} strokeWidth={2} />
                </div>
              </div>

              <div className="hero-price-card">
                <div className="hero-price-card-header">
                  <div className="hero-price-icon">
                    <SlidersHorizontal size={19} strokeWidth={1.9} />
                  </div>
                  <div>
                    <div className="hero-price-title">WEBSITE DESIGN</div>
                    <div className="hero-price-starting">Starting at</div>
                  </div>
                </div>
                <div className="hero-price-amount">
                  <span className="hero-price-dollar">$</span>3,500
                </div>
                <p className="hero-price-desc">
                  Custom websites built to look
                  <br />
                  professional and perform.
                </p>
                <div className="hero-price-arrow">
                  <ArrowRight size={16} strokeWidth={2} />
                </div>
              </div>

              <div className="hero-price-card">
                <div className="hero-price-card-header">
                  <div className="hero-price-icon">
                    <ShieldCheck size={19} strokeWidth={1.9} />
                  </div>
                  <div>
                    <div className="hero-price-title">CARE PLAN</div>
                    <div className="hero-price-starting">Starting at</div>
                  </div>
                </div>
                <div className="hero-price-amount">
                  <span className="hero-price-dollar">$</span>500<span className="hero-price-per">/mo</span>
                </div>
                <p className="hero-price-desc">
                  Ongoing updates, security,
                  <br />
                  and performance care.
                </p>
                <div className="hero-price-arrow">
                  <ArrowRight size={16} strokeWidth={2} />
                </div>
              </div>

              <motion.a
                href="#"
                className="hero-price-cta"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Request Quote
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.a>
            </div>
          </div>
        </section>

        <section className="hero-trusted">
          <div className="hero-trusted-inner">
            <span className="hero-trusted-label">TRUSTED BY SERVICE BUSINESSES</span>
            <div className="hero-trusted-logos">
              <div className="hero-logo-item">
                <span className="hero-logo-a1">A1</span>
                <span className="hero-logo-a1-sub">PLUMBING</span>
              </div>
              <div className="hero-logo-item hero-logo-diesel">
                <span className="hero-logo-circle">⊙</span>
                <span className="hero-logo-diesel-text">DIESEL</span>
              </div>
              <div className="hero-logo-item">
                <span className="hero-logo-summit">SUMMIT</span>
              </div>
              <div className="hero-logo-item hero-logo-evergreen">
                <span className="hero-logo-evergreen-icon">✦</span>
                <div>
                  <span className="hero-logo-evergreen-name">EVERGREEN</span>
                  <span className="hero-logo-evergreen-sub">Landscaping</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

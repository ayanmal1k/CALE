"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Crosshair,
  PenLine,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function HeroSection() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const nextScale = Math.max(
        1,
        Math.min(window.innerWidth / 1080, window.innerHeight / 720),
      );

      setScale(Number(nextScale.toFixed(4)));
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="hero-page" style={{ "--hero-scale": scale } as CSSProperties}>
      <div className="hero-scale-stage">
      <Navbar />

      {/* ========== HERO MAIN ========== */}
      <section className="hero-main">
        <div className="hero-main-inner">
          {/* LEFT COLUMN */}
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

          {/* CENTER COLUMN - Hero Image */}
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

          {/* RIGHT COLUMN - Pricing Cards */}
          <div className="hero-right">
            {/* Card 1 - Website Redesign */}
            <div className="hero-price-card">
              <div className="hero-price-card-header">
                <div className="hero-price-icon hero-price-icon-purple">
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

            {/* Card 2 - Website Design */}
            <div className="hero-price-card">
              <div className="hero-price-card-header">
                <div className="hero-price-icon hero-price-icon-purple">
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

            {/* Card 3 - Care Plan */}
            <div className="hero-price-card">
              <div className="hero-price-card-header">
                <div className="hero-price-icon hero-price-icon-purple">
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

      {/* ========== TRUSTED BY ========== */}
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

      {/* ========== BOTTOM STATS BAR ========== */}
      <section className="hero-stats-bar">
        <div className="hero-stats-inner">
          <div className="hero-stat">
            <Star size={18} className="hero-stat-icon hero-stat-icon-purple" fill="currentColor" />
            <span className="hero-stat-text">5.0 RATED BY BUSINESS OWNERS</span>
          </div>
          <div className="hero-stat">
            <Zap size={18} className="hero-stat-icon" fill="currentColor" />
            <span className="hero-stat-text">FAST TURNAROUND</span>
          </div>
          <div className="hero-stat">
            <Crosshair size={18} className="hero-stat-icon" />
            <span className="hero-stat-text">INDUSTRY-FOCUSED DESIGN</span>
          </div>
          <div className="hero-stat">
            <TrendingUp size={18} className="hero-stat-icon" />
            <span className="hero-stat-text">RESULTS THAT GROW YOUR BUSINESS</span>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

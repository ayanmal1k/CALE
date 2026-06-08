"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowRight, Star, Zap, Target, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="hero-page">
      {/* ========== NAVBAR ========== */}
      <nav className="hero-navbar">
        <div className="hero-navbar-inner">
          <div className="hero-nav-logo">C A L E</div>
          <div className="hero-nav-links">
            <a href="#" className="hero-nav-link">
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className="hero-nav-link">Process</a>
            <a href="#" className="hero-nav-link">Our Work</a>
            <a href="#" className="hero-nav-link">About</a>
            <a href="#" className="hero-nav-link">Pricing</a>
          </div>
          <a href="#" className="hero-nav-cta">
            Request Quote
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>
      </nav>

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
              <a href="#" className="hero-btn-primary">
                Request Quote
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
              <a href="#" className="hero-btn-secondary">
                See Our Work
                <ArrowRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* CENTER COLUMN - Hero Image */}
          <div className="hero-center">
            <Image
              src="/Hero.png"
              alt="Website mockups showcase"
              width={520}
              height={620}
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z" />
                  </svg>
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
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

            <a href="#" className="hero-price-cta">
              Request Quote
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
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
            <Target size={18} className="hero-stat-icon" />
            <span className="hero-stat-text">INDUSTRY-FOCUSED DESIGN</span>
          </div>
          <div className="hero-stat">
            <TrendingUp size={18} className="hero-stat-icon" />
            <span className="hero-stat-text">RESULTS THAT GROW YOUR BUSINESS</span>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Smartphone, Frown, Star, AlertTriangle, ArrowRight, ShieldAlert } from "lucide-react";

/* ═══════════════════════════════════════════════════
   DIAGNOSTIC DISPLAY 1: SPEED
   ═══════════════════════════════════════════════════ */
function SpeedDiagnostic() {
  const [speed, setSpeed] = useState(0);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1.5;
      if (progress >= 67) {
        clearInterval(interval);
        setSpeed(67);
        setIsStuck(true);
      } else {
        setSpeed(progress);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="diag-speed">
      <div className="diag-browser">
        <div className="diag-browser__dots">
          <span className="diag-browser__dot diag-browser__dot--red" />
          <span className="diag-browser__dot" />
          <span className="diag-browser__dot" />
        </div>
        <div className="diag-browser__url">yourwebsite.com</div>
      </div>

      <div className="diag-speed__gauge-container">
        {/* Speedometer Gauge */}
        <div className="diag-speed__gauge">
          <svg viewBox="0 0 100 50" className="diag-speed__svg">
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="url(#speed-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="126"
              strokeDashoffset={126 - (126 * (isStuck ? 40 : speed)) / 100}
              className="diag-speed__path-fill"
            />
            <defs>
              <linearGradient id="speed-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
          <div
            className="diag-speed__needle"
            style={{
              transform: `rotate(${((isStuck ? 40 : speed) / 100) * 180 - 90}deg)`,
            }}
          />
          <div className="diag-speed__value">
            {isStuck ? "STUCK" : `${speed.toFixed(0)}%`}
          </div>
        </div>
      </div>

      <div className="diag-speed__track">
        <div
          className={`diag-speed__bar ${isStuck ? "is-stuck" : ""}`}
          style={{ width: `${speed}%` }}
        />
      </div>

      {isStuck && (
        <div className="diag-speed__alert">
          <ShieldAlert className="diag-speed__alert-icon" size={16} />
          <span><strong>40% Bounce Rate:</strong> Visitors leave if load exceeds 3s.</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DIAGNOSTIC DISPLAY 2: MOBILE
   ═══════════════════════════════════════════════════ */
function MobileDiagnostic() {
  return (
    <div className="diag-mobile">
      <div className="diag-mobile__phone">
        <div className="diag-mobile__notch" />
        <div className="diag-mobile__screen">
          <div className="diag-mobile__broken-header">
            <div className="diag-mobile__logo-placeholder" />
            <div className="diag-mobile__burger" />
          </div>

          <div className="diag-mobile__overlap-box">
            <div className="diag-mobile__overlapping-text diag-mobile__overlapping-text--1">
              EMERGENCY PLUMBING NOW
            </div>
            <div className="diag-mobile__overlapping-text diag-mobile__overlapping-text--2">
              Call us today for affordable rates
            </div>
          </div>

          <div className="diag-mobile__button-glitch">
            <span>CALL NOW</span>
          </div>

          <div className="diag-mobile__broken-lines">
            <span style={{ width: "80%" }} />
            <span style={{ width: "55%" }} />
          </div>
        </div>
        {/* Broken glass aesthetic overlay */}
        <div className="diag-mobile__fracture" />
      </div>
      <div className="diag-mobile__tag">
        <AlertTriangle size={12} /> Unresponsive Layout
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DIAGNOSTIC DISPLAY 3: TRUST
   ═══════════════════════════════════════════════════ */
function TrustDiagnostic() {
  return (
    <div className="diag-trust">
      {/* Competitor Listing (Bad) */}
      <div className="diag-trust__card diag-trust__card--bad">
        <div className="diag-trust__header">
          <div className="diag-trust__avatar" />
          <div>
            <div className="diag-trust__name">Your Business</div>
            <div className="diag-trust__reviews">4 reviews</div>
          </div>
        </div>
        <div className="diag-trust__stars">
          <Star size={12} fill="#ef4444" color="#ef4444" />
          <Star size={12} fill="#ef4444" color="#ef4444" />
          <Star size={12} color="#d1d5db" />
          <Star size={12} color="#d1d5db" />
          <Star size={12} color="#d1d5db" />
        </div>
        <div className="diag-trust__badge diag-trust__badge--bad">
          2.0 rating • Low social trust
        </div>
      </div>

      <div className="diag-trust__vs">VS</div>

      {/* Competitor Listing (Good) */}
      <div className="diag-trust__card diag-trust__card--good">
        <div className="diag-trust__header">
          <div className="diag-trust__avatar diag-trust__avatar--good" />
          <div>
            <div className="diag-trust__name">Competitor Inc.</div>
            <div className="diag-trust__reviews">148 reviews</div>
          </div>
        </div>
        <div className="diag-trust__stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={12} fill="#10b981" color="#10b981" />
          ))}
        </div>
        <div className="diag-trust__badge diag-trust__badge--good">
          4.9 rating • Customers convert
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COSTING SECTION
   ═══════════════════════════════════════════════════ */
const diagnosticData = [
  {
    id: 0,
    icon: Clock,
    title: "Frictional Loading Speeds",
    accent: "Speed Is Profit",
    text: "Every microsecond of latency degrades your customer conversion pipeline. Modern prospects expect instantaneous responses—if your site takes longer than 3 seconds to load, 40% of your traffic bounces directly to your local competitors.",
    component: <SpeedDiagnostic />,
  },
  {
    id: 1,
    icon: Smartphone,
    title: "Broken Mobile Usability",
    accent: "Responsive Breakdown",
    text: "Over 75% of emergency service calls originate from mobile devices. Overlapping content, unclickable CTA triggers, and slow responsive scaling will convince potential customers that your business is amateurish and out of touch.",
    component: <MobileDiagnostic />,
  },
  {
    id: 2,
    icon: Frown,
    title: "The Reputation Review Gap",
    accent: "Trust Deficit",
    text: "In the home services industry, trust is the highest converting asset. Without visual social proof widgets, integrated local reviews, and secure brand signifiers, customers will bypass your company in favor of businesses with established authority.",
    component: <TrustDiagnostic />,
  },
];

export default function CostingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      // Create ScrollTrigger to monitor active indices based on vertical progression
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.max(Math.floor(progress * diagnosticData.length), 0),
            diagnosticData.length - 1
          );
          setActiveTab(index);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="costing-v3__scroll-trigger" id="leak">
      <div ref={stickyRef} className="costing-v3__sticky-container">
        <div className="costing-v3__noise" />

        <div className="costing-v3__grid">
          {/* Left panel: Info content */}
          <div className="costing-v3__left">
            <div className="costing-v3__eyebrow-container">
              <span className="costing-v3__dot" />
              <span className="costing-v3__eyebrow">DIAGNOSTIC ANALYSIS</span>
            </div>

            <h2 className="costing-v3__heading">
              Why Your Old Website Is <br />
              <span className="costing-v3__heading-gradient">Costing You Sales</span>
            </h2>

            <p className="costing-v3__subtext">
              A poorly designed website is a silent leak in your marketing budget. We diagnose and rebuild your local brand identity to convert visitors into phone calls.
            </p>

            {/* Sticky Step Progress list */}
            <div className="costing-v3__steps">
              {diagnosticData.map((item, i) => {
                const Icon = item.icon;
                const isActive = i === activeTab;
                return (
                  <div
                    key={item.id}
                    className={`costing-v3__step-item ${isActive ? "is-active" : ""}`}
                    onClick={() => {
                      // Smooth scroll to the corresponding viewport offset
                      const trigger = containerRef.current;
                      if (!trigger) return;
                      const rect = trigger.getBoundingClientRect();
                      const scrollY = window.scrollY + rect.top + (i / diagnosticData.length) * rect.height;
                      window.scrollTo({ top: scrollY, behavior: "smooth" });
                    }}
                  >
                    <div className="costing-v3__step-icon-wrap">
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                    </div>
                    <div className="costing-v3__step-content">
                      <span className="costing-v3__step-accent">{item.accent}</span>
                      <h3 className="costing-v3__step-title">{item.title}</h3>
                      <p className="costing-v3__step-desc">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Live Diagnostic Console */}
          <div className="costing-v3__right">
            <div className="costing-v3__console-window">
              <div className="costing-v3__console-header">
                <div className="costing-v3__console-controls">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="costing-v3__console-title">DIAGNOSTIC_VIEWER.EXE</div>
                <div className="costing-v3__console-status">LIVE</div>
              </div>

              <div className="costing-v3__console-body">
                {diagnosticData.map((item, i) => {
                  const isActive = i === activeTab;
                  return (
                    <div
                      key={item.id}
                      className={`costing-v3__console-slide ${isActive ? "is-active" : ""}`}
                    >
                      {item.component}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

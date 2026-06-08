"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatePresence, motion } from "framer-motion"
import { Clock, Frown, Smartphone, Star, X } from "lucide-react"
import { useState } from "react"

function LoadingDemo() {
  const [progress, setProgress] = useState(0)
  const [stuck, setStuck] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 65) {
          clearInterval(id)
          setStuck(true)
          setTimeout(() => setShowWarning(true), 800)
          return 65
        }
        return p + 1.2
      })
    }, 40)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="demo-loading">
      <div className="demo-browser">
        <div className="demo-browser-dots"><span /><span /><span /></div>
        <span className="demo-browser-url">cale.agency</span>
      </div>
      <div className="demo-loader-track">
        <motion.div
          className="demo-loader-fill"
          animate={stuck ? { width: ["65%", "70%", "62%", "67%", "65%"] } : { width: `${progress}%` }}
          transition={stuck ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.1 }}
        />
      </div>
      <div className="demo-loader-info">
        <span style={{ color: stuck ? "#ef4444" : "rgba(255,255,255,0.3)" }}>
          {stuck ? "Stuck loading..." : "Loading..."}
        </span>
        <span style={{ color: stuck ? "#ef4444" : "rgba(255,255,255,0.3)" }}>
          {progress.toFixed(0)}%
        </span>
      </div>
      <div className="demo-placeholders">
        <div className="demo-ph" style={{ width: "70%", height: 8 }} />
        <div className="demo-ph" style={{ width: "45%", height: 8 }} />
      </div>
      {!stuck && (
        <div className="demo-ph-row">
          <div className="demo-ph" style={{ width: "40%", height: 6 }} />
          <div className="demo-ph" style={{ width: "25%", height: 6 }} />
        </div>
      )}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            className="demo-warning"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
          >
            <span className="demo-warning-icon"><X size={12} /></span>
            <span>40% of your visitors already left</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileDemo() {
  return (
    <div className="demo-mobile">
      <div className="demo-phone-wrap">
        <motion.div
          className="demo-phone"
          animate={{ x: [0, -2, 2, -1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="demo-phone-notch" />
          <div className="demo-phone-screen">
            <motion.div
              className="demo-phone-avatar"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="demo-phone-line"
              style={{ width: "60%", height: 5 }}
              animate={{ width: ["60%", "55%", "65%", "60%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="demo-phone-line"
              style={{ width: "40%", height: 4 }}
              animate={{ width: ["40%", "50%", "35%", "40%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="demo-phone-grid">
              <motion.div
                className="demo-phone-block"
                animate={{ scale: [1, 0.95, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="demo-phone-block"
                animate={{ scale: [1, 1.05, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
        <div className="demo-phone-broken-overlay">
          <motion.div
            className="demo-broken-shard"
            style={{ width: "70%", left: "10%", top: "32%" }}
            animate={{ rotate: [-4, 2, -5, 1, -4], x: [0, 3, -2, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="demo-broken-shard"
            style={{ width: "50%", left: "30%", top: "44%" }}
            animate={{ rotate: [3, -2, 5, -3, 3], x: [0, -3, 2, -1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="demo-broken-shard"
            style={{ width: "60%", left: "20%", top: "56%" }}
            animate={{ rotate: [-2, 4, -3, 2, -2], x: [0, 2, -3, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
        </div>
      </div>
      <motion.p
        className="demo-mobile-label"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Unclickable buttons, overlapping text
      </motion.p>
    </div>
  )
}

function SocialDemo() {
  return (
    <div className="demo-social">
      <motion.div
        className="demo-business bad"
        animate={{ boxShadow: ["0 0 0 0 rgba(239,68,68,0)", "0 0 20px 0 rgba(239,68,68,0.06)", "0 0 0 0 rgba(239,68,68,0)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10Z" />
          <path d="M22 15V2h-3v13h3Z" />
        </motion.svg>
        <div className="demo-biz-row">
          <motion.div
            className="demo-biz-avatar"
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div>
            <div className="demo-biz-name">ABC Plumbing</div>
            <motion.div
              className="demo-biz-reviews"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              2 reviews
            </motion.div>
          </div>
        </div>
        <div className="demo-biz-stars">
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              style={{ display: "inline-flex" }}
              animate={{ scale: [1, 0.8, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            >
              <Star size={10} fill="#ef4444" color="#ef4444" />
            </motion.span>
          ))}
          {[0, 1, 2].map((i) => <Star key={i} size={10} color="rgba(255,255,255,0.08)" />)}
        </div>
        <motion.div
          className="demo-biz-status bad"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Poor rating — customers leave
        </motion.div>
      </motion.div>
      <motion.svg
        className="demo-vs" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
        animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.15, 1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </motion.svg>
      <motion.div
        className="demo-business good"
        animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0)", "0 0 20px 0 rgba(34,197,94,0.06)", "0 0 0 0 rgba(34,197,94,0)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <motion.svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z" />
          <path d="M2 9v13h3V9H2Z" />
        </motion.svg>
        <div className="demo-biz-row">
          <motion.div
            className="demo-biz-avatar"
            style={{ background: "#7c4fe8" }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <div>
            <div className="demo-biz-name">Miller Fab</div>
            <motion.div
              className="demo-biz-reviews"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              187 reviews
            </motion.div>
          </div>
        </div>
        <div className="demo-biz-stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              style={{ display: "inline-flex" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            >
              <Star size={10} fill="#22c55e" color="#22c55e" />
            </motion.span>
          ))}
        </div>
        <motion.div
          className="demo-biz-status good"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          Trusted — customers convert
        </motion.div>
      </motion.div>
    </div>
  )
}

const cards = [
  {
    id: "loading",
    icon: Clock,
    title: "Slow Loading Times",
    text: "If your site takes more than 3 seconds to load, 40% of your visitors are already gone. Speed is a feature, not an afterthought.",
    demo: <LoadingDemo />,
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Poor Mobile Experience",
    text: "Most service calls happen on mobile. If your site isn't perfectly responsive, layouts break and you lose customers to competitors.",
    demo: <MobileDemo />,
  },
  {
    id: "social",
    icon: Frown,
    title: "Lack of Social Proof",
    text: "Without clear trust signals and star ratings, potential clients will look for other agencies who display reviews prominently.",
    demo: <SocialDemo />,
  },
]

function CostingCard({
  icon: Icon,
  title,
  text,
  demo,
}: {
  icon: any
  title: string
  text: string
  demo: React.ReactNode
}) {
  return (
    <div className="costing-card">
      <div className="costing-card-info">
        <div className="costing-card-top">
          <div className="costing-card-icon">
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <h3 className="costing-card-title">{title}</h3>
        </div>
        <p className="costing-card-text">{text}</p>
      </div>
      <div className="costing-card-demo">{demo}</div>
    </div>
  )
}

export default function CostingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      if (!section) return

      const cardItems = section.querySelectorAll<HTMLElement>(".costing-card-item")
      if (cardItems.length < 3) return

      const [card1, card2, card3] = cardItems

      // Set initial states
      gsap.set(card1, { opacity: 1, scale: 1, x: "0%", filter: "blur(0px)" })
      gsap.set(card2, { opacity: 0, scale: 0.95, x: "100%", filter: "blur(8px)" })
      gsap.set(card3, { opacity: 0, scale: 0.95, x: "100%", filter: "blur(8px)" })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=450vh",
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })

      tl
        // Card 1 -> Card 2
        .to(card1, {
          x: "-100%",
          opacity: 0.15,
          scale: 0.95,
          filter: "blur(8px)",
          ease: "power3.inOut",
          duration: 1
        }, 0)
        .to(card2, {
          x: "0%",
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power3.inOut",
          duration: 1
        }, 0)
        // Card 2 -> Card 3
        .to(card2, {
          x: "-100%",
          opacity: 0.15,
          scale: 0.95,
          filter: "blur(8px)",
          ease: "power3.inOut",
          duration: 1
        }, 1)
        .to(card3, {
          x: "0%",
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power3.inOut",
          duration: 1
        }, 1)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="costing-section-outer">
      <section ref={sectionRef} className="costing-section slide-over" id="problems">
        <div className="costing-parallax-bg" />

        <div className="costing-inner">
          <div ref={headerRef} className="costing-header">
            <span className="costing-eyebrow">
              <span className="costing-eyebrow-dot" />
              The Problem
            </span>
            <h2 className="costing-heading">
              Why Your Website Is Costing You{" "}
              <span className="costing-highlight">Customers</span>
            </h2>
            <p className="costing-sub">
              Three critical issues driving potential clients away — see them simulated in real time below.
            </p>
          </div>

          <div className="costing-cards-stack">
            {cards.map((card) => (
              <div key={card.id} className="costing-card-item">
                <CostingCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Clock, Frown, Smartphone, Star, X, AlertTriangle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { staggerContainer, fadeUp } from "@/lib/animations"

const springConfig = { stiffness: 80, damping: 30, restDelta: 0.001 }

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
        <span style={{ color: stuck ? "#ef4444" : "rgba(255,255,255,0.2)" }}>
          {stuck ? "Stuck loading..." : "Loading..."}
        </span>
        <span style={{ color: stuck ? "#ef4444" : "rgba(255,255,255,0.2)" }}>
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
            <div className="demo-biz-name">ABC Plumbin</div>
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
    text: "If your site takes more than 3 seconds to load, 40% of your visitors are already gone.",
    demo: <LoadingDemo />,
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Poor Mobile Experience",
    text: "Most service calls happen on mobile. If your site isn't perfectly responsive, you're invisible.",
    demo: <MobileDemo />,
  },
  {
    id: "social",
    icon: Frown,
    title: "Lack of Social Proof",
    text: "Without trust signals, potential customers will choose the competitor with the better reviews.",
    demo: <SocialDemo />,
  },
]

export default function CostingSection() {
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "start 0.5"],
  })

  const headerOpacity = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    springConfig
  )
  const headerY = useSpring(
    useTransform(scrollYProgress, [0, 1], [60, 0]),
    springConfig
  )

  return (
    <section className="costing-section">
      <motion.div
        className="costing-header"
        ref={headerRef}
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <span className="costing-eyebrow">
          <span className="costing-eyebrow-dot" />
          The Problem
        </span>
        <h2 className="costing-heading">
          Why Your Website Is Costing You{" "}
          <span className="costing-highlight">Customers</span>
        </h2>
        <p className="costing-sub">
          Three critical issues driving potential customers away — see them in
          action.
        </p>
      </motion.div>
      <motion.div
        className="costing-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="costing-card"
            variants={fadeUp}
          >
            <div className="costing-card-top">
              <div className="costing-card-icon">
                <card.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="costing-card-title">{card.title}</h3>
            </div>
            <p className="costing-card-text">{card.text}</p>
            <div className="costing-card-demo">{card.demo}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

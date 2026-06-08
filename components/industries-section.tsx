"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  Building2,
  Car,
  Cog,
  Droplets,
  Sprout,
  Thermometer,
  Truck,
  ArrowUpRight,
} from "lucide-react"
import type { ElementType } from "react"
import { useRef } from "react"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

const industries = [
  { icon: Car, name: "Auto Shops", tagline: "From brake jobs to full builds" },
  { icon: Truck, name: "Diesel Companies", tagline: "Heavy-duty digital presence" },
  { icon: Thermometer, name: "HVAC", tagline: "Climate control, online authority" },
  { icon: Droplets, name: "Plumbing", tagline: "Emergency-ready, trust-first" },
  { icon: Sprout, name: "Landscaping", tagline: "Seasonal services, year-round leads" },
  { icon: Building2, name: "Contractors", tagline: "General & specialty trades" },
  { icon: Cog, name: "Fabrication", tagline: "Custom metalwork & manufacturing" },
]

/* ── Single industry row with parallax ── */
function IndustryRow({
  icon: Icon,
  name,
  tagline,
  index,
}: {
  icon: ElementType
  name: string
  tagline: string
  index: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  })

  // Stagger parallax speeds — alternating directions for depth
  const direction = index % 2 === 0 ? 1 : -1
  const speed = 8 + (index % 3) * 4
  const rowX = useSpring(
    useTransform(scrollYProgress, [0, 1], [direction * speed, direction * -speed]),
    springConfig
  )

  // Vertical float for icon
  const iconY = useSpring(
    useTransform(scrollYProgress, [0, 1], [12, -12]),
    springConfig
  )

  // Number parallax — moves faster for depth illusion
  const numY = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, -20]),
    springConfig
  )

  return (
    <motion.div
      ref={rowRef}
      className="ind-row"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0, 1],
      }}
    >
      {/* Ghost number with own parallax */}
      <motion.span className="ind-row-num" style={{ y: numY }}>
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.div className="ind-row-inner" style={{ x: rowX }}>
        <motion.div className="ind-row-icon" style={{ y: iconY }}>
          <Icon size={22} strokeWidth={1.5} />
        </motion.div>

        <div className="ind-row-content">
          <span className="ind-row-name">{name}</span>
          <span className="ind-row-tagline">{tagline}</span>
        </div>

        <div className="ind-row-arrow">
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "start 0.5"],
  })

  const headerOpacity = useSpring(
    useTransform(headerProgress, [0, 1], [0, 1]),
    springConfig
  )
  const headerY = useSpring(
    useTransform(headerProgress, [0, 1], [60, 0]),
    springConfig
  )

  // Background parallax shift (like first-impressions)
  const { scrollYProgress: bgProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useSpring(
    useTransform(bgProgress, [0, 1], [60, -60]),
    springConfig
  )

  return (
    <section
      className="industries-section slide-over parallax-section"
      id="industries"
      ref={sectionRef}
      style={{ zIndex: 4 }}
    >
      {/* Parallax background layer — same gradient style as first-impressions */}
      <motion.div className="ind-bg-shift" style={{ y: bgY }} />

      <div className="industries-inner">
        {/* ── Header ── */}
        <motion.div
          className="ind-header parallax-content"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <h2 className="ind-heading">
            Industry{" "}
            <span className="ind-heading-accent">
              <span className="ind-shiny-text">Expertise</span>
            </span>
          </h2>
          <p className="ind-subtext">
            We specialize in blue-collar authority. We know your customers and
            what they need to see before they pick up the phone.
          </p>
        </motion.div>

        {/* ── Industry Rows ── */}
        <div className="ind-list">
          {industries.map((item, i) => (
            <IndustryRow key={item.name} {...item} index={i} />
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <motion.div
          className="ind-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
        >
          <div className="ind-cta-left">
            <span className="ind-cta-label">Don&apos;t see your industry?</span>
            <span className="ind-cta-title">Your Industry Next</span>
          </div>
          <div className="ind-cta-action">
            <span>Get Started</span>
            <div className="ind-cta-circle">
              <ArrowUpRight size={16} strokeWidth={2} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

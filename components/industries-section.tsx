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
import { useCallback, useEffect, useRef, useState } from "react"
import { staggerContainer, fadeUp } from "@/lib/animations"

const springConfig = { stiffness: 80, damping: 30, restDelta: 0.001 }

const industries = [
  { icon: Car, name: "Auto Shops" },
  { icon: Truck, name: "Diesel Companies" },
  { icon: Thermometer, name: "HVAC" },
  { icon: Droplets, name: "Plumbing" },
  { icon: Sprout, name: "Landscaping" },
  { icon: Building2, name: "Contractors" },
  { icon: Cog, name: "Fabrication" },
]

const orbs = [
  { size: 350, x: "10%", y: "10%", delay: 0 },
  { size: 250, x: "70%", y: "60%", delay: 2 },
  { size: 300, x: "50%", y: "20%", delay: 4 },
]

function IndustryCard({
  icon: Icon,
  name,
  index,
}: {
  icon: React.ElementType
  name: string
  index: number
}) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      e.currentTarget.style.setProperty("--mouse-x", `${x}%`)
      e.currentTarget.style.setProperty("--mouse-y", `${y}%`)
    },
    []
  )

  return (
    <motion.div
      className="industries-grid-item"
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      custom={index}
    >
      <div className="industries-grid-icon">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <span className="industries-grid-name">{name}</span>
      <div className="industries-grid-arrow">
        <ArrowUpRight size={14} strokeWidth={1.5} />
      </div>
    </motion.div>
  )
}

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

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

  const orbY = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    springConfig
  )

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    el.addEventListener("mousemove", handle)
    return () => el.removeEventListener("mousemove", handle)
  }, [])

  return (
    <section
      className="industries-section slide-over parallax-section"
      id="industries"
      ref={sectionRef}
      style={{ zIndex: 4 }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="industries-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            y: orbY,
          }}
          animate={{ x: [0, 30, -20, 10, 0], y: [0, -20, 30, -10, 0] }}
          transition={{
            duration: 14 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
      <motion.div
        className="industries-spotlight"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
        }}
      />

      <div className="industries-inner">
        <motion.div
          className="industries-header parallax-content"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="industries-eyebrow">Who We Serve</span>
          <h2 className="industries-heading">
            Industry <span className="industries-accent">Expertise</span>
          </h2>
          <p className="industries-subtext">
            We specialize in blue-collar authority. We know your customers and
            what they need to see before they pick up the phone.
          </p>
        </motion.div>

        <motion.div
          className="industries-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {industries.map((item, i) => (
            <IndustryCard key={item.name} {...item} index={i} />
          ))}

          {/* CTA Card */}
          <motion.div className="industries-cta-card" variants={fadeUp}>
            <div className="industries-cta-left">
              <span className="industries-cta-label">
                Don&apos;t see your industry?
              </span>
              <span className="industries-cta-title">
                Your Industry Next
              </span>
            </div>
            <div className="industries-cta-action">
              <span>Get Started</span>
              <div className="industries-cta-action-circle">
                <ArrowUpRight size={16} strokeWidth={2} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

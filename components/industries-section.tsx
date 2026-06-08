"use client"

import { motion } from "framer-motion"
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
import { useEffect, useRef, useState } from "react"

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
  { size: 300, x: "10%", y: "10%", delay: 0 },
  { size: 200, x: "70%", y: "60%", delay: 2 },
  { size: 250, x: "50%", y: "20%", delay: 4 },
]

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

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
    <section className="industries-section" id="industries" ref={sectionRef}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="industries-orb"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ x: [0, 30, -20, 10, 0], y: [0, -20, 30, -10, 0] }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}
      <motion.div
        className="industries-spotlight"
        style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%` }}
      />

      <div className="industries-inner">
        <motion.div
          className="industries-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="industries-eyebrow">Who We Serve</span>
          <h2 className="industries-heading">
            Industry <span className="industries-accent">Expertise</span>
          </h2>
          <p className="industries-subtext">
            We specialize in blue-collar authority. We know your customers and what they need to see before they pick up the phone.
          </p>
        </motion.div>

        <div className="industries-list">
          <div className="industries-list-line" />

          {industries.map((item, i) => (
            <motion.div
              key={item.name}
              className={`industries-item ${activeIndex === i ? "active" : ""}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="industries-item-dot">
                <div className={`industries-dot ${activeIndex === i ? "pulse" : ""}`} />
              </div>
              <div className="industries-item-card">
                <div className="industries-item-icon">
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <span className="industries-item-name">{item.name}</span>
                <motion.div
                  className="industries-item-arrow"
                  animate={activeIndex === i ? { x: 3, opacity: 1 } : { x: 0, opacity: 0.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="industries-item industries-item-cta"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: 0.4, ease: "easeOut" }}
          >
            <div className="industries-item-dot">
              <div className="industries-dot" />
            </div>
            <div className="industries-item-card industries-card-cta">
              <span className="industries-cta-label">Your Industry Next</span>
              <span className="industries-cta-action">
                Get Started <ArrowUpRight size={12} strokeWidth={2} />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

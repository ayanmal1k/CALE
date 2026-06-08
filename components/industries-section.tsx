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
  ArrowRight,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

const industries = [
  { icon: Car, name: "Auto Shops", desc: "Repair shops, dealers & service centers" },
  { icon: Truck, name: "Diesel Companies", desc: "Fleet services, trucking & diesel repair" },
  { icon: Thermometer, name: "HVAC", desc: "Heating, cooling & ventilation pros" },
  { icon: Droplets, name: "Plumbing", desc: "Residential & commercial plumbing" },
  { icon: Sprout, name: "Landscaping", desc: "Lawn care, design & outdoor services" },
  { icon: Building2, name: "Contractors", desc: "General contractors & specialty trades" },
  { icon: Cog, name: "Fabrication", desc: "Metalwork, welding & custom fabrication" },
]

const floatingOrbs = [
  { size: 300, x: "10%", y: "10%", delay: 0 },
  { size: 200, x: "70%", y: "60%", delay: 2 },
  { size: 250, x: "50%", y: "20%", delay: 4 },
]

export default function IndustriesSection() {
  const [hovered, setHovered] = useState<number | null>(null)
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
      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="industries-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Gradient follow cursor */}
      <motion.div
        className="industries-spotlight"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
        }}
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
            We specialize in blue-collar authority. We know your customers and what they need
            to see before they pick up the phone.
          </p>
        </motion.div>

        <div className="industries-showcase">
          {industries.map((item, i) => (
            <motion.div
              key={item.name}
              className={`industries-tile ${hovered === i ? "active" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="industries-tile-bg-icon">
                <item.icon size={80} strokeWidth={1} />
              </div>
              <div className="industries-tile-content">
                <div className="industries-tile-icon">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <span className="industries-tile-name">{item.name}</span>
                <span className="industries-tile-desc">{item.desc}</span>
              </div>
              <motion.div
                className="industries-tile-glow"
                animate={hovered === i ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}

          <motion.div
            className="industries-tile industries-tile-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 7 * 0.06, ease: "easeOut" }}
          >
            <div className="industries-tile-cta-bg" />
            <div className="industries-tile-cta-content">
              <span className="industries-tile-cta-label">Your Industry</span>
              <span className="industries-tile-cta-action">
                Get Started <ArrowRight size={14} strokeWidth={2} />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

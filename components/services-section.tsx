"use client"

import { motion } from "framer-motion"
import { Code, Palette, ShieldCheck } from "lucide-react"
import type { ElementType } from "react"
import { useState } from "react"

const services = [
  {
    icon: Palette,
    title: "Website Redesign",
    description:
      "Modernizing dated sites to meet current UX standards and mobile-first performance needs.",
  },
  {
    icon: Code,
    title: "Design & Development",
    description:
      "Ground-up custom builds designed to capture high-intent traffic and convert visitors into leads.",
  },
  {
    icon: ShieldCheck,
    title: "Website Care Plans",
    description:
      "Continuous monitoring, speed optimization, and security updates so you can focus on your business.",
  },
]

function ServiceCard({ icon: Icon, title, description }: { icon: ElementType; title: string; description: string }) {
  const [hovered, setHovered] = useState(false)

  const fillAnim = { scaleY: hovered ? 1 : 0 }
  const iconBg = hovered ? "rgba(255,255,255,0.15)" : "#f1eaff"
  const iconColor = hovered ? "#fff" : "#6334df"
  const titleColor = hovered ? "#fff" : "#070707"
  const textColor = hovered ? "rgba(255,255,255,0.75)" : "#6f6f73"

  return (
    <motion.div
      className="services-card"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="services-card-fill"
        initial={{ scaleY: 0 }}
        animate={fillAnim}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <div className="services-card-content">
        <motion.div
          className="services-icon-box"
          animate={{ background: iconBg, color: iconColor }}
          transition={{ duration: 0.25 }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </motion.div>
        <div className="services-card-body">
          <motion.h3
            className="services-card-title"
            animate={{ color: titleColor }}
            transition={{ duration: 0.25 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="services-card-text"
            animate={{ color: textColor }}
            transition={{ duration: 0.25 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <div className="services-inner">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="services-heading">
            Core <span className="services-heading-accent">Capabilities</span>
          </h2>
          <p className="services-subtext">
            Built for scale, optimized for conversion. Every service is designed to turn visitors into clients.
          </p>
        </motion.div>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

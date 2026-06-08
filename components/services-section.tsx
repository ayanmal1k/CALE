"use client"

import { motion } from "framer-motion"
import { Code, Palette, ShieldCheck } from "lucide-react"
import type { ElementType } from "react"
import { useState } from "react"
import { staggerContainer, fadeUp } from "@/lib/animations"

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
  const iconBg = hovered ? "rgba(255,255,255,0.1)" : "rgba(124, 79, 232, 0.08)"
  const iconColor = hovered ? "#fff" : "#7c4fe8"
  const titleColor = hovered ? "#fff" : "#f5f5f7"
  const textColor = hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)"

  return (
    <motion.div
      className="services-card"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      variants={fadeUp}
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
        <motion.div
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

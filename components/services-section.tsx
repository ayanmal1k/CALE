"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Code, Palette, ShieldCheck, ArrowUpRight } from "lucide-react"
import type { ElementType } from "react"
import { useRef, useState, useCallback } from "react"
import { staggerContainer, fadeUp } from "@/lib/animations"

const springConfig = { stiffness: 80, damping: 30, restDelta: 0.001 }

const services = [
  {
    icon: Palette,
    number: "01",
    title: "Website Redesign",
    description:
      "Modernizing dated sites to meet current UX standards and mobile-first performance needs.",
  },
  {
    icon: Code,
    number: "02",
    title: "Design & Development",
    description:
      "Ground-up custom builds designed to capture high-intent traffic and convert visitors into leads.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Website Care Plans",
    description:
      "Continuous monitoring, speed optimization, and security updates so you can focus on your business.",
  },
]

function ServiceCard({
  icon: Icon,
  number,
  title,
  description,
  index,
}: {
  icon: ElementType
  number: string
  title: string
  description: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const speed = 20 + index * 10
  const cardY = useSpring(
    useTransform(scrollYProgress, [0, 1], [speed, -speed]),
    springConfig
  )

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`)
  }, [])

  return (
    <motion.div
      className="services-card"
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      variants={fadeUp}
      style={{ y: cardY }}
    >
      <motion.div
        className="services-card-fill"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
      />
      <div className="services-card-content">
        <div className="services-card-number">{number}</div>
        <motion.div
          className="services-icon-box"
          animate={{
            background: hovered
              ? "rgba(124, 79, 232, 0.12)"
              : "rgba(124, 79, 232, 0.06)",
            borderColor: hovered
              ? "rgba(124, 79, 232, 0.2)"
              : "rgba(124, 79, 232, 0.08)",
          }}
          transition={{ duration: 0.35 }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </motion.div>
        <div className="services-card-body">
          <h3 className="services-card-title">{title}</h3>
          <p className="services-card-text">{description}</p>
        </div>
        <motion.div
          className="services-card-arrow"
          animate={{
            color: hovered ? "#7c4fe8" : "rgba(255,255,255,0.2)",
          }}
          transition={{ duration: 0.3 }}
        >
          <span>Learn more</span>
          <motion.div
            className="services-card-arrow-icon"
            animate={{
              x: hovered ? 4 : 0,
              background: hovered
                ? "rgba(124, 79, 232, 0.15)"
                : "rgba(124, 79, 232, 0.08)",
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0, 1] }}
          >
            <ArrowUpRight size={14} strokeWidth={2} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
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
    <section
      className="services-section slide-over parallax-section"
      id="services"
      ref={sectionRef}
      style={{ zIndex: 3 }}
    >
      <div className="services-inner">
        <motion.div
          className="services-header parallax-content"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="services-eyebrow">
            <span className="services-eyebrow-dot" />
            What We Do
          </span>
          <h2 className="services-heading">
            Core{" "}
            <span className="services-heading-accent">Capabilities</span>
          </h2>
          <p className="services-subtext">
            Built for scale, optimized for conversion. Every service is
            designed to turn visitors into clients.
          </p>
        </motion.div>
        <motion.div
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

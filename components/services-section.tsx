"use client"

import { motion } from "framer-motion"
import { Code, Palette, ShieldCheck, ArrowUpRight } from "lucide-react"
import type { ElementType } from "react"
import { useRef, useState, useCallback, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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
}: {
  icon: ElementType
  number: string
  title: string
  description: string
}) {
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`)
  }, [])

  return (
    <div
      className="services-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
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
    </div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const inner = innerRef.current
      const header = headerRef.current
      if (!section || !inner || !header) return

      const cards = section.querySelectorAll<HTMLElement>(".services-card")
      if (cards.length < 3) return

      // Set initial states for entrance animations
      gsap.set(header, { opacity: 0, y: 60 })
      gsap.set(cards[0], { x: -80, rotate: -3, opacity: 0 })
      gsap.set(cards[1], { y: 80, scale: 0.95, opacity: 0 })
      gsap.set(cards[2], { x: 80, rotate: 3, opacity: 0 })

      // Create scroll-driven 3D section tilt and elements entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })

      // Section 3D tilt
      tl.fromTo(inner, 
        { rotateX: 8, z: -100 },
        { rotateX: -8, z: -100, ease: "none", duration: 2 },
        0
      )

      // Header entrance (early scroll)
      tl.to(header, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.6
      }, 0.2)

      // Cards unfold/slide-in
      tl.to(cards[0], {
        x: 0,
        rotate: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.8
      }, 0.4)
      .to(cards[1], {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        duration: 0.8
      }, 0.45)
      .to(cards[2], {
        x: 0,
        rotate: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.8
      }, 0.5)

      // Exit animations (when scrolling past the section)
      tl.to(header, {
        opacity: 0,
        y: -60,
        ease: "power2.in",
        duration: 0.6
      }, 1.3)
      .to(cards[0], {
        y: -100,
        opacity: 0,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.7
      }, 1.3)
      .to(cards[1], {
        y: -120,
        opacity: 0,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.7
      }, 1.35)
      .to(cards[2], {
        y: -100,
        opacity: 0,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.7
      }, 1.4)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="services-section slide-over parallax-section"
      id="services"
      ref={sectionRef}
      style={{ zIndex: 3, perspective: 1200 }}
    >
      <div 
        ref={innerRef}
        className="services-inner"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="services-header parallax-content"
          ref={headerRef}
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
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

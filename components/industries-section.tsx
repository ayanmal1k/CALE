"use client"

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
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const industries = [
  { icon: Car, name: "Auto Shops", tagline: "From brake jobs to full builds" },
  { icon: Truck, name: "Diesel Companies", tagline: "Heavy-duty digital presence" },
  { icon: Thermometer, name: "HVAC", tagline: "Climate control, online authority" },
  { icon: Droplets, name: "Plumbing", tagline: "Emergency-ready, trust-first" },
  { icon: Sprout, name: "Landscaping", tagline: "Seasonal services, year-round leads" },
  { icon: Building2, name: "Contractors", tagline: "General & specialty trades" },
  { icon: Cog, name: "Fabrication", tagline: "Custom metalwork & manufacturing" },
]

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
  const direction = index % 2 === 0 ? 1 : -1
  const speed = 15 + (index % 3) * 8
  const offsetDistance = direction * speed

  return (
    <div
      className="ind-row"
      style={{
        "--offset-distance": `${offsetDistance}px`,
      } as any}
    >
      {/* Ghost number */}
      <span className="ind-row-num">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="ind-row-inner">
        <div className="ind-row-icon">
          <Icon size={22} strokeWidth={1.5} />
        </div>

        <div className="ind-row-content">
          <span className="ind-row-name">{name}</span>
          <span className="ind-row-tagline">{tagline}</span>
        </div>

        <div className="ind-row-arrow">
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const inner = innerRef.current
      const header = headerRef.current
      const bg = bgRef.current
      const cta = ctaRef.current
      if (!section || !inner || !header || !bg || !cta) return

      const rows = section.querySelectorAll<HTMLElement>(".ind-row")
      if (rows.length === 0) return

      // Set initial state
      gsap.set(header, { opacity: 0, y: 60 })
      gsap.set(cta, { opacity: 0, y: 40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })

      // Background shift
      tl.fromTo(bg, { y: 60 }, { y: -60, ease: "none", duration: 2 }, 0)

      // Section 3D tilt
      tl.fromTo(inner, 
        { rotateX: 10, z: -120 },
        { rotateX: -10, z: -120, ease: "none", duration: 2 },
        0
      )

      // Header entrance
      tl.to(header, { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 }, 0.1)

      // Staggered horizontal drift zipper effect for rows
      rows.forEach((row, i) => {
        const driftDirection = i % 2 === 0 ? -50 : 50
        tl.fromTo(row,
          { x: driftDirection },
          { x: -driftDirection, ease: "power1.inOut", duration: 1.2 },
          0.3 + (i * 0.05)
        )
      })

      // CTA entrance at the end of section scroll
      tl.to(cta, { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 }, 1.2)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="industries-section slide-over parallax-section"
      id="industries"
      ref={sectionRef}
      style={{ zIndex: 4, perspective: 1200 }}
    >
      {/* Parallax background layer */}
      <div ref={bgRef} className="ind-bg-shift" />

      <div 
        ref={innerRef}
        className="industries-inner"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── Header ── */}
        <div
          className="ind-header parallax-content"
          ref={headerRef}
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
        </div>

        {/* ── Industry Rows ── */}
        <div className="ind-list">
          {industries.map((item, i) => (
            <IndustryRow key={item.name} {...item} index={i} />
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div
          ref={ctaRef}
          className="ind-cta"
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
        </div>
      </div>
    </section>
  )
}

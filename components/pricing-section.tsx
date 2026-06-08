"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles, Layers, ShieldCheck, Check } from "lucide-react"
import { useParallaxY } from "@/hooks/use-parallax"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const pricingPlans = [
  {
    icon: Sparkles,
    title: "Website Redesign",
    price: "$2,500",
    prefix: "Starting at",
    features: [
      "UX/UI modernization",
      "Conversion rate optimization",
      "Mobile-first design",
      "SEO preservation",
    ],
  },
  {
    icon: Layers,
    title: "Website Design",
    price: "$3,500",
    prefix: "Starting at",
    features: [
      "100% custom aesthetics",
      "High-speed performance",
      "Tailored lead capture",
      "CMS integration",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Website Care Plan",
    price: "$500",
    suffix: "/mo",
    prefix: "Starting at",
    features: [
      "Ongoing development support",
      "Security & uptime monitoring",
      "Daily backups",
      "Performance optimization",
    ],
  },
]

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgParallax = useParallaxY(sectionRef, 0.15)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const header = headerRef.current
      const cards = cardsRef?.current?.querySelectorAll<HTMLElement>(".pricing-card")
      if (!section || !header || !cards || cards.length === 0) return

      // Set initial state
      gsap.set(header, { opacity: 0, y: 50 })
      cards.forEach((card) => {
        gsap.set(card, {
          opacity: 0,
          y: 80,
          scale: 0.95,
        })
      })

      // Create scroll animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })

      // Header fades/moves in
      tl.to(header, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.6,
      }, 0.1)

      // Cards slide and scale in
      cards.forEach((card, index) => {
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.8,
        }, 0.3 + index * 0.15)
      })

      // Exit animations as user scrolls past
      tl.to(header, {
        opacity: 0,
        y: -50,
        ease: "power2.in",
        duration: 0.5,
      }, 1.4)

      cards.forEach((card) => {
        tl.to(card, {
          opacity: 0,
          y: -80,
          scale: 0.95,
          ease: "power2.in",
          duration: 0.6,
        }, 1.4)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="pricing-section slide-over" ref={sectionRef} style={{ zIndex: 6 }}>
      <motion.div
        className="pricing-bg-shift"
        style={{ y: bgParallax }}
      />
      <div className="pricing-inner">
        <div ref={headerRef} className="pricing-header">
          <span className="pricing-label">INVESTMENT</span>
          <h2 className="pricing-heading">
            Transparent <br />
            <span className="pricing-highlight">Pricing Plans.</span>
          </h2>
          <p className="pricing-subtext">
            Simple, upfront rates. No hidden fees. Select the plan that aligns with your business goals.
          </p>
        </div>

        <div ref={cardsRef} className="pricing-cards-grid">
          {pricingPlans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <div key={plan.title} className="pricing-card">
                <div className="pricing-card-top">
                  <div className="pricing-card-icon-wrap">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="pricing-card-title">{plan.title}</h3>
                </div>

                <div className="pricing-card-middle">
                  <div className="pricing-card-price-wrap">
                    <span className="pricing-card-prefix">{plan.prefix}</span>
                    <span className="pricing-card-price">
                      {plan.price}
                      {plan.suffix && <span className="pricing-card-suffix">{plan.suffix}</span>}
                    </span>
                  </div>

                  <div className="pricing-card-features">
                    {plan.features.map((feat) => (
                      <div key={feat} className="pricing-feature-item">
                        <Check size={14} strokeWidth={2.5} className="pricing-check-icon" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pricing-card-bottom">
                  <motion.a
                    href="#"
                    className="pricing-card-cta"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span>Get Started</span>
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </motion.a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

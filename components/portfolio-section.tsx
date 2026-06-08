"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: "proj-1",
    title: "A1 Plumbing & HVAC",
    category: "Service Business Redesign",
    color: "#7c4fe8",
    src: "/Work1.png"
  },
  {
    id: "proj-2",
    title: "Diesel Auto Parts",
    category: "Custom Web App Design",
    color: "#ef4444",
    src: "/Work2.png"
  },
  {
    id: "proj-3",
    title: "Summit Construction",
    category: "High-Converting Landing Page",
    color: "#22c55e",
    src: "/Work3.png"
  }
]

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const row = rowRef.current
      if (!section || !row) return

      // Build ScrollTrigger timeline for horizontal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${row.offsetWidth - window.innerWidth + 400}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })

      tl.to(row, {
        x: () => -(row.offsetWidth - window.innerWidth + 120),
        ease: "none",
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Mouse move handler for interactive 3D straightening tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Map mouse coordinates to tilt (closer to center means closer to 0 rotation)
    const rotateX = ((y - centerY) / centerY) * 10
    const rotateY = ((x - centerX) / centerX) * -10

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto"
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    // Reset back to original tilted state
    gsap.to(card, {
      rotateX: 10,
      rotateY: -20,
      scale: 0.96,
      duration: 0.8,
      ease: "elastic.out(1, 0.75)",
      overwrite: "auto"
    })
  }

  return (
    <div className="portfolio-section-outer">
      <section ref={sectionRef} className="portfolio-section slide-over" id="work">
        <div className="portfolio-bg-shift" />

        <div className="portfolio-inner">
          <div className="portfolio-header">
            <span className="portfolio-eyebrow">
              <span className="portfolio-eyebrow-dot" />
              Our Portfolio
            </span>
            <h2 className="portfolio-heading">
              Recent <span className="portfolio-highlight">Work</span>
            </h2>
            <p className="portfolio-sub">
              Explore custom-designed premium website interfaces built for high conversions.
            </p>
          </div>

          <div ref={rowRef} className="portfolio-cards-row">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="portfolio-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: "perspective(1200px) rotateY(-20deg) rotateX(10deg) scale(0.96)"
                }}
              >
                <div className="portfolio-card-canvas">
                  {/* Laptop Mockup Wrapper */}
                  <div className="laptop-mockup">
                    <div className="laptop-screen">
                      {/* Light Grey/White Mockup Placeholder */}
                      <div className="laptop-screen-content">
                        <div className="mockup-browser-header">
                          <div className="mockup-dots"><span /><span /><span /></div>
                          <div className="mockup-url">cale.agency/work/{project.id}</div>
                        </div>
                        <div className="mockup-body">
                          <div className="mockup-hero" style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)` }}>
                            <span className="mockup-tag" style={{ color: project.color, borderColor: `${project.color}30` }}>{project.category}</span>
                            <h4 className="mockup-heading">{project.title}</h4>
                            <div className="mockup-button" style={{ backgroundColor: project.color }}>View Project</div>
                          </div>
                          <div className="mockup-grid">
                            <div className="mockup-box" />
                            <div className="mockup-box" />
                            <div className="mockup-box" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="laptop-keyboard">
                      <div className="laptop-keyboard-groove" />
                    </div>
                  </div>
                </div>
                
                <div className="portfolio-card-info">
                  <span className="portfolio-card-cat">{project.category}</span>
                  <h3 className="portfolio-card-title">
                    {project.title}
                    <span className="portfolio-card-arrow">
                      <ArrowUpRight size={18} />
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

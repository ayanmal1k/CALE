"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const navLinks = [
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Process", href: "#" },
  { label: "Our Work", href: "#" },
  { label: "About", href: "#" },
  { label: "Pricing", href: "#" },
]

const serviceItems = [
  "Website Design",
  "Website Redesign",
  "Care Plan",
  "SEO Optimization",
]

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#" className="nav-logo" aria-label="CALE home">
          C A L E
        </a>

        <div className="nav-links-desktop">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="nav-item"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <motion.a
                  href={link.href}
                  className="nav-link"
                  whileHover={{ color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                  <motion.svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: hoveredLink === link.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.a>
                <AnimatePresence>
                  {hoveredLink === link.label && (
                    <motion.div
                      className="nav-dropdown"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      {serviceItems.map((item) => (
                        <a key={item} href="#" className="nav-dropdown-item">
                          {item}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.a
                key={link.label}
                href={link.href}
                className="nav-link"
                whileHover={{ color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ),
          )}
        </div>

        <motion.a
          href="#"
          className="nav-cta nav-cta-desktop"
          onHoverStart={() => setCtaHovered(true)}
          onHoverEnd={() => setCtaHovered(false)}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.span
            className="nav-cta-fill"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: ctaHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <span className="nav-cta-content">
            Request Quote
            <ArrowUpRight size={13} strokeWidth={2} />
          </span>
        </motion.a>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="nav-mobile-links">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      className="nav-mobile-link"
                      onClick={() =>
                        setHoveredLink(
                          hoveredLink === link.label ? null : link.label,
                        )
                      }
                    >
                      {link.label}
                    </a>
                    <AnimatePresence>
                      {hoveredLink === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="nav-mobile-dropdown"
                        >
                          {serviceItems.map((item) => (
                            <a
                              key={item}
                              href="#"
                              className="nav-mobile-dropdown-item"
                            >
                              {item}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="nav-mobile-link"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
            <a href="#" className="nav-cta nav-mobile-cta">
              Request Quote
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

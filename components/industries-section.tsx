"use client"

import { motion } from "framer-motion"

const industries = [
  { number: "01", name: "Auto Shops" },
  { number: "02", name: "Diesel Companies" },
  { number: "03", name: "HVAC" },
  { number: "04", name: "Plumbing" },
  { number: "05", name: "Landscaping" },
  { number: "06", name: "Contractors" },
  { number: "07", name: "Fabrication" },
]

export default function IndustriesSection() {
  return (
    <section className="industries-section" id="industries">
      <div className="industries-inner">
        <motion.div
          className="industries-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="industries-heading">Industry Expertise</h2>
          <p className="industries-subtext">
            We specialize in blue-collar authority. We know your customers and what they need to see before they pick up the phone.
          </p>
        </motion.div>
        <div className="industries-grid">
          {industries.map((item, i) => (
            <motion.div
              key={item.number}
              className="industries-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
            >
              <span className="industries-card-number">{item.number}</span>
              <span className="industries-card-name">{item.name}</span>
            </motion.div>
          ))}
          <motion.div
            className="industries-card industries-card-cta"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 7 * 0.05, ease: "easeOut" }}
          >
            <span className="industries-card-cta-text">Your Industry Next</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

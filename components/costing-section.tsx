"use client"

import { motion } from "framer-motion"
import { Clock, Frown, Smartphone } from "lucide-react"

const problems = [
  {
    icon: Clock,
    title: "Slow Loading Times",
    description:
      "If your site takes more than 3 seconds to load, 40% of your visitors are already gone.",
  },
  {
    icon: Smartphone,
    title: "Poor Mobile Experience",
    description:
      "Most service calls happen on mobile. If your site isn't perfectly responsive, you're invisible.",
  },
  {
    icon: Frown,
    title: "Lack of Social Proof",
    description:
      "Without trust signals, potential customers will choose the competitor with the better reviews.",
  },
]

export default function CostingSection() {
  return (
    <section className="costing-section">
      <div className="costing-inner">
        <motion.div
          className="costing-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="costing-heading">Why Your Website Is Costing You Customers</h2>
          <div className="costing-problems">
            {problems.map((item, i) => (
              <motion.div
                key={item.title}
                className="costing-problem"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              >
                <div className="costing-problem-icon">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="costing-problem-title">{item.title}</h4>
                  <p className="costing-problem-text">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="costing-card"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <div className="costing-card-badge">CONVERSION LOSS</div>
          <div className="costing-card-body">
            <div className="costing-stat-bar" style={{ width: "100%" }} />
            <div className="costing-stat-bar" style={{ width: "75%" }} />
            <div className="costing-stat-bar" style={{ width: "83%" }} />
            <div className="costing-quote">
              <p className="costing-quote-text">
                &ldquo;We saw a 300% increase in service inquiries after switching to CALE&rsquo;s optimized framework.&rdquo;
              </p>
            </div>
            <div className="costing-author">
              <div className="costing-author-avatar" />
              <div>
                <p className="costing-author-name">James Miller</p>
                <p className="costing-author-role">Owner, Miller Fabrication</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

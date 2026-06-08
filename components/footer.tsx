"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#" },
  { label: "Process", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Contact", href: "#" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070708]">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <motion.a
              href="#"
              className="inline-block text-2xl font-semibold tracking-[0.12em] text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            >
              C A L E
            </motion.a>
            <motion.p
              className="mt-4 max-w-md text-sm leading-relaxed text-white/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0, 1] }}
            >
              Premium website design and redesign for service businesses that want to stand out, win trust, and grow.
            </motion.p>
          </div>
          <div className="flex flex-col gap-3">
            {footerLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/70"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: [0.25, 0.1, 0, 1] }}
              >
                <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
        <motion.div
          className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 text-sm text-white/20 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span>&copy; {new Date().getFullYear()} CALE. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white/50">Privacy</a>
            <a href="#" className="transition-colors hover:text-white/50">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

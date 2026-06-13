"use client";

import { motion } from "framer-motion";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Expertise", href: "#industries" },
  { label: "Diagnostics", href: "#leak" },
  { label: "Portfolio", href: "#work" },
  { label: "Pricing", href: "#pricing" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black py-16 overflow-hidden">
      {/* Self-contained CSS keyframes for the rainbow animation */}
      <style jsx global>{`
        @keyframes footer-rainbow {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`
        }}
      />

      {/* Massive ambient bottom glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        {/* Massive center-aligned animated rainbow title */}
        <div className="w-full text-center mb-16 mt-4">
          <h2 
            className="text-[14vw] md:text-[10vw] font-black tracking-[-0.05em] leading-none select-none bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #a855f7 0%, #f472b6 20%, #fb923c 40%, #facc15 55%, #34d399 70%, #22d3ee 85%, #a855f7 100%)",
              backgroundSize: "200% auto",
              animation: "footer-rainbow 6s linear infinite",
              filter: "brightness(1.1) saturate(1.15)"
            }}
          >
            C A L E
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
          {/* Brand Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xs text-white/35 font-medium tracking-wide">
              Premium Web Design for Home Services & Trades
            </span>
          </div>

          {/* Links Row styled like Navbar navigation */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-white/40 transition-colors hover:text-white/80"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* System status node */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.1em] text-white/45">
              CALE_ONLINE
            </span>
          </div>
        </div>

        {/* Shorter bottom copyright info */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/20 gap-4">
          <span>&copy; {new Date().getFullYear()} CALE. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/45 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/45 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

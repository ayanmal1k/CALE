"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(left, { opacity: 0, x: -60 });
      gsap.set(right, { opacity: 0, x: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "center center",
          scrub: 0.8,
        },
      });

      tl.to(left, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0)
        .to(right, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0.1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <section ref={sectionRef} className="contact-v3 slide-over" id="quote">
      {/* Background ambient orbs */}
      <div className="contact-v3__ambient">
        <div className="contact-v3__orb contact-v3__orb--1" />
        <div className="contact-v3__orb contact-v3__orb--2" />
        <div className="contact-v3__noise" />
      </div>

      <div className="contact-v3__inner">
        <div className="contact-v3__grid">
          {/* Left Panel */}
          <div ref={leftRef} className="contact-v3__left">
            <div className="contact-v3__eyebrow-container">
              <span className="contact-v3__eyebrow-dot" />
              <span className="contact-v3__eyebrow">GET IN TOUCH</span>
            </div>
            <h2 className="contact-v3__heading">
              Ready to Stand Out and <br />
              <span className="contact-v3__highlight">Scale Your Sales?</span>
            </h2>
            <p className="contact-v3__subtext">
              We design premium platforms engineered to establish local trade authority and drive high-intent inquiries. Let's discuss your custom project.
            </p>

            <div className="contact-v3__info-list">
              <div className="contact-v3__info-item">
                <div className="contact-v3__info-num">01</div>
                <div className="contact-v3__info-text">
                  <h4>Consultation</h4>
                  <p>Book a free 15-minute diagnostic call to review your current site metrics.</p>
                </div>
              </div>

              <div className="contact-v3__info-item">
                <div className="contact-v3__info-num">02</div>
                <div className="contact-v3__info-text">
                  <h4>Strategy Proposal</h4>
                  <p>Get a comprehensive custom wireframe architecture and transparent quote.</p>
                </div>
              </div>

              <div className="contact-v3__info-item">
                <div className="contact-v3__info-num">03</div>
                <div className="contact-v3__info-text">
                  <h4>Brand Domination</h4>
                  <p>Deploy a custom design built to rank #1 locally and convert visitors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div ref={rightRef} className="contact-v3__right">
            <div className="contact-v3__form-window">
              <div className="contact-v3__form-header">
                <div className="contact-v3__form-controls">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="contact-v3__form-title">PROJECT_AUDIT_REQUEST.EXE</div>
              </div>

              <div className="contact-v3__form-body">
                {isSubmitted ? (
                  <div className="contact-v3__success">
                    <div className="contact-v3__success-icon">
                      <Check size={28} />
                    </div>
                    <h3>Request Received!</h3>
                    <p>We are analyzing your digital footprint and will respond within 4 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-v3__form">
                    {/* Name input */}
                    <div className="contact-v3__field">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder=" "
                        className="contact-v3__input"
                        id="name"
                      />
                      <label htmlFor="name" className="contact-v3__label">Full Name / Business Name</label>
                    </div>

                    {/* Email input */}
                    <div className="contact-v3__field">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder=" "
                        className="contact-v3__input"
                        id="email"
                      />
                      <label htmlFor="email" className="contact-v3__label">Email Address</label>
                    </div>

                    {/* Phone input */}
                    <div className="contact-v3__field">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder=" "
                        className="contact-v3__input"
                        id="phone"
                      />
                      <label htmlFor="phone" className="contact-v3__label">Phone Number</label>
                    </div>

                    {/* Message textarea */}
                    <div className="contact-v3__field">
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder=" "
                        className="contact-v3__input contact-v3__textarea"
                        id="message"
                        rows={4}
                      />
                      <label htmlFor="message" className="contact-v3__label">Tell us about your trade / project goals</label>
                    </div>

                    <button type="submit" className="contact-v3__submit">
                      <span>SEND REQUEST NOW</span>
                      <Send size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Parallax } from "react-scroll-parallax";

export default function FirstImpressions() {
  return (
    <section className="first-impressions">
      <div className="first-impressions-inner">
        <Parallax translateY={[-15, 15]}>
        <h2 className="first-impressions-heading">
          First Impressions <br />
          <span className="first-impressions-highlight">
            <span className="shiny-text">Are Everything.</span>
          </span>
        </h2>
        </Parallax>
        <Parallax translateY={[-8, 8]}>
        <p className="first-impressions-text">
          In the service industry, trust is the primary currency. Your website is often the first and only chance you have to prove you&apos;re the authority in your market. We make that impression count.
        </p>
        </Parallax>
      </div>
    </section>
  )
}

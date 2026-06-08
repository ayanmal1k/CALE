"use client"

import { useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"
import type { RefObject } from "react"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

/**
 * Vertical parallax — element moves at `speed` multiplier relative to scroll.
 * speed < 1 = slower than scroll (recedes), speed > 1 = faster (advances).
 * Returns a smooth spring-based MotionValue for `y`.
 */
export function useParallaxY(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.3,
  offset: [string, string] = ["start end", "end start"]
) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const range = 100 * speed
  const y = useTransform(scrollYProgress, [0, 1], [range, -range])
  return useSpring(y, springConfig)
}

/**
 * Scale transform tied to scroll progress.
 * Element scales from `from` to `to` as it scrolls through the viewport.
 */
export function useParallaxScale(
  ref: RefObject<HTMLElement | null>,
  from: number = 1,
  to: number = 0.95,
  offset: [string, string] = ["start start", "end start"]
) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const scale = useTransform(scrollYProgress, [0, 1], [from, to])
  return useSpring(scale, springConfig)
}

/**
 * Opacity fade tied to scroll progress.
 * Fades between `from` and `to` opacity as element scrolls through viewport.
 */
export function useParallaxOpacity(
  ref: RefObject<HTMLElement | null>,
  from: number = 1,
  to: number = 0,
  offset: [string, string] = ["start start", "end start"]
) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [from, from, to])
  return useSpring(opacity, springConfig)
}

/**
 * Section reveal — combines opacity (0→1) + translateY (offset→0) as section enters viewport.
 * Returns { opacity, y } MotionValues.
 */
export function useSectionReveal(
  ref: RefObject<HTMLElement | null>,
  yOffset: number = 60
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.65"],
  })
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rawY = useTransform(scrollYProgress, [0, 1], [yOffset, 0])
  const opacity = useSpring(rawOpacity, springConfig)
  const y = useSpring(rawY, springConfig)
  return { opacity, y }
}

/**
 * Hero pinned fade — as user scrolls past the hero section, content fades and scales down.
 * Returns { opacity, scale, y } for the hero content container.
 */
export function useHeroPinnedFade(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])

  return {
    opacity: useSpring(opacity, springConfig),
    scale: useSpring(scale, springConfig),
    y: useSpring(y, springConfig),
  }
}

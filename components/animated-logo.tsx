"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function AnimatedLogo() {
  const maskRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    // 애니메이션 시작
    if (maskRef.current) {
      startWaveAnimation()
    }
  }, [])

  const startWaveAnimation = () => {
    if (!maskRef.current) return

    // 초기 위치 (10% 위치에서 시작)
    const startY = 36 // 10% 위치 (40 * 0.9 = 36)
    const endY = 4 // 90% 위치 (40 * 0.1 = 4)

    maskRef.current.setAttribute("y", String(startY))

    // 애니메이션 함수
    const animate = () => {
      if (!maskRef.current) return

      // 위로 차오르는 애니메이션 (5초)
      const upAnimation = maskRef.current.animate(
        [
          { y: startY }, // 10% 위치에서 시작
          { y: endY }, // 90% 위치까지 올라감
        ],
        {
          duration: 5000,
          easing: "linear",
          fill: "forwards",
        },
      )

      // 위로 차오른 후 아래로 내려가는 애니메이션 (5초)
      upAnimation.onfinish = () => {
        if (!maskRef.current) return

        const downAnimation = maskRef.current.animate(
          [
            { y: endY }, // 90% 위치에서 시작
            { y: startY }, // 10% 위치로 내려감
          ],
          {
            duration: 5000,
            easing: "linear",
            fill: "forwards",
          },
        )

        // 내려간 후 다시 올라가는 애니메이션 시작
        downAnimation.onfinish = () => {
          animate()
        }
      }
    }

    animate()
  }

  return (
    <Link href="/" className="flex items-center">
      <div className="logo-container relative">
        <svg
          className="logo-svg"
          width="160"
          height="50"
          viewBox="0 0 160 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="water" width=".25" height=".5" patternContentUnits="objectBoundingBox">
              <path
                fill="#fff"
                d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25-0.25C0.25,0.327,0.25,1,0.25,1z"
              />
            </pattern>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 162, 255, 1)" />
              <stop offset="100%" stopColor="rgba(0, 217, 255, 1)" />
            </linearGradient>
            <mask id="water-mask">
              <rect
                ref={maskRef}
                x="0"
                y="36"
                width="160"
                height="50"
                fill="url(#water)"
                className="water-wave-animation"
              />
            </mask>
          </defs>

          {/* Text background */}
          <text x="0" y="35" fontSize="32" fontWeight="400" fill="white" className="logo-text">
            GVine
            <tspan fontWeight="400" fill="white">
              PRO
            </tspan>
          </text>

          {/* Animated water fill */}
          <text
            x="0"
            y="35"
            fontSize="32"
            fontWeight="400"
            fill="url(#logo-gradient)"
            mask="url(#water-mask)"
            className="logo-text"
          >
            GVine<tspan fontWeight="400">PRO</tspan>
          </text>
        </svg>
      </div>
    </Link>
  )
}


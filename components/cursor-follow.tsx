"use client"

import { useEffect, useState } from "react"

export default function CursorFollow() {
  // 초기 상태 설정
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isLinkHovered, setIsLinkHovered] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // 컴포넌트 마운트 및 모바일 감지
  useEffect(() => {
    setIsMounted(true)
    
    // 모바일 기기 감지
    const mobileCheck =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.matchMedia && window.matchMedia("(max-width: 768px)").matches)
    
    setIsMobile(mobileCheck)
    
    // 모바일이면 커서 효과를 적용하지 않음
    if (mobileCheck) {
      return
    }

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")

      if (isLink) {
        setIsLinkHovered(true)

        // 버튼 여부 확인
        const isButton = target.tagName === "BUTTON" ||
                         target.closest("button") !== null ||
                         target.classList.contains("btn")
        setIsButtonHovered(isButton)
      } else {
        setIsLinkHovered(false)
        setIsButtonHovered(false)
      }
    }

    document.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mousemove", handleLinkHover)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // 모바일이 아닌 경우에만 커서 숨기기
    if (!isMobile) {
      document.body.classList.add("cursor-none")
    }

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mousemove", handleLinkHover)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.body.classList.remove("cursor-none")
    }
  }, [])

  // 아직 마운트되지 않았거나 모바일이면 아무것도 렌더링하지 않음
  if (!isMounted || isMobile) return null

  return (
    <>
      {/* 큰 원 */}
      <div
        className={`cursor-follower fixed pointer-events-none z-[9999] transition-transform duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isLinkHovered ? "cursor-follower-link" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isLinkHovered ? (isButtonHovered ? 1.2 : 1.5) : 1})`,
          width: "24px",
          height: "24px",
          backgroundColor: isLinkHovered ? "rgba(0, 153, 255, 0.2)" : "rgba(0, 153, 255, 0.15)",
          mixBlendMode: "exclusion",
          borderRadius: "50%",
          transition:
            "transform 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out, background-color 0.3s ease-out, opacity 0.2s ease-out",
        }}
      ></div>

      {/* 작은 점 */}
      <div
        className={`cursor-dot fixed pointer-events-none z-[9999] ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isLinkHovered ? "cursor-dot-link" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%)`,
          width: "4px",
          height: "4px",
          backgroundColor: "#00a2ff",
          mixBlendMode: "normal",
          borderRadius: "50%",
          transition: "transform 0.1s ease-out, opacity 0.2s ease-out",
        }}
      ></div>
    </>
  )
}


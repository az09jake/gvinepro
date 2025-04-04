"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const RippleButton = ({ children, className, onClick }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const nextId = useRef(0)

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 2

    const newRipple = {
      x,
      y,
      size,
      id: nextId.current,
    }

    nextId.current += 1
    setRipples((prevRipples) => [...prevRipples, newRipple])

    if (onClick) {
      onClick()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples((prevRipples) => prevRipples.slice(1))
      }
    }, 850)

    return () => clearTimeout(timer)
  }, [ripples])

  return (
    <button
      ref={buttonRef}
      className={cn("relative overflow-hidden inline-flex items-center justify-center", className)}
      onClick={addRipple}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/20 animate-ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      {children}
    </button>
  )
}

export default RippleButton


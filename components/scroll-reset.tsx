"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function ScrollReset() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }
  }, [pathname, searchParams])

  return null
}


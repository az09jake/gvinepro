"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // 페이지 변경 시 스크롤을 최상단으로 이동
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}


"use client"

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import dynamic from "next/dynamic"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// 스크롤 위치를 최상단으로 재설정하는 컴포넌트
function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, searchParams])

  return null
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // CursorFollow 컴포넌트를 클라이언트 측에서만 로드
  const CursorFollow = dynamic(() => import("@/components/cursor-follow"), {
    ssr: false,
  })

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CursorFollow />
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import type React from "react"
import type { Metadata } from "next"
import ScrollReset from "@/components/scroll-reset"

export const metadata: Metadata = {
  title: "블로그 - GVine PRO",
  description: "GVine PRO의 최신 소식과 업데이트를 확인하세요.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollReset />
      {children}
    </>
  )
}


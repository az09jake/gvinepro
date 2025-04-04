import type React from "react"
import type { Metadata } from "next"
import ScrollReset from "@/components/scroll-reset"

export const metadata: Metadata = {
  title: "고객 지원 - GVine PRO",
  description: "GVine PRO의 고객 지원 서비스를 이용하세요.",
}

export default function SupportLayout({
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


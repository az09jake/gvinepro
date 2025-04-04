import type React from "react"
import type { Metadata } from "next"
import ScrollReset from "@/components/scroll-reset"

export const metadata: Metadata = {
  title: "회사 소개 - GVine PRO",
  description: "GVine PRO에 대해 알아보세요.",
}

export default function AboutLayout({
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


import type React from "react"
import type { Metadata } from "next"
import ScrollReset from "@/components/scroll-reset"

export const metadata: Metadata = {
  title: "솔루션 - GVine PRO",
  description: "GVine PRO의 다양한 솔루션을 확인하세요.",
}

export default function SolutionLayout({
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


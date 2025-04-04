import type React from "react"
import type { Metadata } from "next"
import ScrollReset from "@/components/scroll-reset"

export const metadata: Metadata = {
  title: "관리자 - GVine PRO",
  description: "GVine PRO 관리자 페이지",
}

export default function AdminLayout({
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


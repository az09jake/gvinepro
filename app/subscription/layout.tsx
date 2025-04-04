import type React from "react"
import type { Metadata } from "next"
import ScrollReset from "@/components/scroll-reset"

export const metadata: Metadata = {
  title: "구독 서비스 - GVine PRO",
  description: "GVine PRO의 구독 서비스를 이용하세요.",
}

export default function SubscriptionLayout({
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


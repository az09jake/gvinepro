"use client"

import { useState, useEffect } from "react"
import { DashboardWidget } from "@/components/admin/dashboard-widget"
import { Globe } from "lucide-react"

interface ClockWidgetProps {
  id: string
  onRemove?: (id: string) => void
  onResize?: (id: string, size: "sm" | "md" | "lg" | "xl") => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function ClockWidget({ id, onRemove, onResize, size = "sm" }: ClockWidgetProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }).format(date)
  }

  return (
    <DashboardWidget
      id={id}
      title="시계"
      description="현재 시간 및 타임존을 확인합니다."
      onRemove={onRemove}
      onResize={onResize}
      size={size}
    >
      <div className="flex flex-col items-center justify-center space-y-2 py-2">
        <div className="text-4xl font-light">{formatTime(time)}</div>
        <div className="text-sm text-muted-foreground">{formatDate(time)}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <Globe className="h-3 w-3 mr-1" />
          <span>Asia/Seoul (GMT+9)</span>
        </div>
      </div>
    </DashboardWidget>
  )
}


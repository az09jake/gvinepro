"use client"

import { DashboardWidget } from "@/components/admin/dashboard-widget"
import { Button } from "@/components/ui/button"
import { FileText, Users, Settings, Mail, ImageIcon, Shield, Activity, Database } from "lucide-react"
import Link from "next/link"

interface QuickActionsWidgetProps {
  id: string
  onRemove?: (id: string) => void
  onResize?: (id: string, size: "sm" | "md" | "lg" | "xl") => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function QuickActionsWidget({ id, onRemove, onResize, size = "md" }: QuickActionsWidgetProps) {
  const actions = [
    {
      name: "새 게시물",
      icon: <FileText className="h-4 w-4" />,
      href: "/admin/dashboard/posts/new",
    },
    {
      name: "미디어 업로드",
      icon: <ImageIcon className="h-4 w-4" />,
      href: "/admin/dashboard/media",
    },
    {
      name: "사용자 관리",
      icon: <Users className="h-4 w-4" />,
      href: "/admin/dashboard/users",
    },
    {
      name: "구독 관리",
      icon: <Mail className="h-4 w-4" />,
      href: "/admin/dashboard/subscriptions",
    },
    {
      name: "백업 생성",
      icon: <Database className="h-4 w-4" />,
      href: "/admin/dashboard/backup",
    },
    {
      name: "시스템 로그",
      icon: <Activity className="h-4 w-4" />,
      href: "/admin/dashboard/logs",
    },
    {
      name: "보안 설정",
      icon: <Shield className="h-4 w-4" />,
      href: "/admin/dashboard/security",
    },
    {
      name: "시스템 설정",
      icon: <Settings className="h-4 w-4" />,
      href: "/admin/dashboard/settings",
    },
  ]

  return (
    <DashboardWidget
      id={id}
      title="빠른 작업"
      description="자주 사용하는 작업에 빠르게 접근합니다."
      onRemove={onRemove}
      onResize={onResize}
      size={size}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            asChild
          >
            <Link href={action.href}>
              <div className="p-2 rounded-full bg-muted">{action.icon}</div>
              <span className="text-xs">{action.name}</span>
            </Link>
          </Button>
        ))}
      </div>
    </DashboardWidget>
  )
}


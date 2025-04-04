"use client"

import { DashboardWidget } from "@/components/admin/dashboard-widget"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"

// 샘플 데이터
const systemStatus = {
  cpu: {
    usage: 45,
    status: "normal", // normal, warning, critical
  },
  memory: {
    usage: 68,
    status: "warning",
  },
  disk: {
    usage: 72,
    status: "warning",
  },
  services: [
    {
      name: "웹 서버",
      status: "online", // online, offline, maintenance
      uptime: "99.9%",
    },
    {
      name: "데이터베이스",
      status: "online",
      uptime: "99.8%",
    },
    {
      name: "이메일 서비스",
      status: "maintenance",
      uptime: "98.5%",
    },
    {
      name: "백업 서비스",
      status: "online",
      uptime: "99.7%",
    },
  ],
}

interface SystemStatusWidgetProps {
  id: string
  onRemove?: (id: string) => void
  onResize?: (id: string, size: "sm" | "md" | "lg" | "xl") => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function SystemStatusWidget({ id, onRemove, onResize, size = "md" }: SystemStatusWidgetProps) {
  // 상태에 따른 색상 및 아이콘
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500"
      case "warning":
        return "text-amber-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getServiceStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            온라인
          </Badge>
        )
      case "offline":
        return (
          <Badge className="bg-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            오프라인
          </Badge>
        )
      case "maintenance":
        return (
          <Badge className="bg-amber-500">
            <Clock className="h-3 w-3 mr-1" />
            유지보수
          </Badge>
        )
      default:
        return <Badge>알 수 없음</Badge>
    }
  }

  const getProgressColor = (usage: number) => {
    if (usage < 60) return "bg-green-500"
    if (usage < 80) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <DashboardWidget
      id={id}
      title="시스템 상태"
      description="서버 및 시스템 상태를 확인합니다."
      onRemove={onRemove}
      onResize={onResize}
      size={size}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">리소스 사용량</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>CPU</span>
                <span className={getStatusColor(systemStatus.cpu.status)}>{systemStatus.cpu.usage}%</span>
              </div>
              <Progress value={systemStatus.cpu.usage} className={getProgressColor(systemStatus.cpu.usage)} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>메모리</span>
                <span className={getStatusColor(systemStatus.memory.status)}>{systemStatus.memory.usage}%</span>
              </div>
              <Progress value={systemStatus.memory.usage} className={getProgressColor(systemStatus.memory.usage)} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>디스크</span>
                <span className={getStatusColor(systemStatus.disk.status)}>{systemStatus.disk.usage}%</span>
              </div>
              <Progress value={systemStatus.disk.usage} className={getProgressColor(systemStatus.disk.usage)} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">서비스 상태</h3>
          <div className="space-y-2">
            {systemStatus.services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <span className="text-sm">{service.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">가동률: {service.uptime}</span>
                  {getServiceStatusBadge(service.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardWidget>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  BarChart4,
  LineChart,
  PieChart,
  Activity,
  Users,
  FileText,
  Mail,
  ShoppingCart,
  Calendar,
  Clock,
  Database,
  Server,
  Shield,
  Settings,
} from "lucide-react"

export interface WidgetType {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: "analytics" | "content" | "users" | "system" | "security" | "other"
  size: "sm" | "md" | "lg" | "xl"
  component: string
}

const availableWidgets: WidgetType[] = [
  {
    id: "visitors-chart",
    title: "방문자 통계",
    description: "일별, 주별, 월별 방문자 통계를 확인합니다.",
    icon: <LineChart className="h-5 w-5" />,
    category: "analytics",
    size: "md",
    component: "VisitorsChart",
  },
  {
    id: "page-views",
    title: "페이지 조회수",
    description: "가장 많이 조회된 페이지를 확인합니다.",
    icon: <BarChart4 className="h-5 w-5" />,
    category: "analytics",
    size: "md",
    component: "PageViewsWidget",
  },
  {
    id: "traffic-sources",
    title: "트래픽 소스",
    description: "방문자 유입 경로를 확인합니다.",
    icon: <PieChart className="h-5 w-5" />,
    category: "analytics",
    size: "md",
    component: "TrafficSourcesWidget",
  },
  {
    id: "recent-posts",
    title: "최근 게시물",
    description: "최근에 작성된 게시물을 확인합니다.",
    icon: <FileText className="h-5 w-5" />,
    category: "content",
    size: "md",
    component: "RecentPostsWidget",
  },
  {
    id: "comments",
    title: "댓글 관리",
    description: "최근 댓글을 확인하고 관리합니다.",
    icon: <Mail className="h-5 w-5" />,
    category: "content",
    size: "md",
    component: "CommentsWidget",
  },
  {
    id: "media-usage",
    title: "미디어 사용량",
    description: "미디어 라이브러리 사용량을 확인합니다.",
    icon: <Database className="h-5 w-5" />,
    category: "content",
    size: "sm",
    component: "MediaUsageWidget",
  },
  {
    id: "recent-users",
    title: "최근 사용자",
    description: "최근에 가입한 사용자를 확인합니다.",
    icon: <Users className="h-5 w-5" />,
    category: "users",
    size: "md",
    component: "RecentUsersWidget",
  },
  {
    id: "user-activity",
    title: "사용자 활동",
    description: "사용자 활동 통계를 확인합니다.",
    icon: <Activity className="h-5 w-5" />,
    category: "users",
    size: "md",
    component: "UserActivityWidget",
  },
  {
    id: "subscriptions",
    title: "구독 현황",
    description: "구독 현황 및 통계를 확인합니다.",
    icon: <ShoppingCart className="h-5 w-5" />,
    category: "users",
    size: "md",
    component: "SubscriptionsWidget",
  },
  {
    id: "system-status",
    title: "시스템 상태",
    description: "서버 및 시스템 상태를 확인합니다.",
    icon: <Server className="h-5 w-5" />,
    category: "system",
    size: "md",
    component: "SystemStatusWidget",
  },
  {
    id: "recent-backups",
    title: "최근 백업",
    description: "최근 백업 기록을 확인합니다.",
    icon: <Database className="h-5 w-5" />,
    category: "system",
    size: "sm",
    component: "RecentBackupsWidget",
  },
  {
    id: "scheduled-tasks",
    title: "예약된 작업",
    description: "예약된 작업을 확인합니다.",
    icon: <Calendar className="h-5 w-5" />,
    category: "system",
    size: "md",
    component: "ScheduledTasksWidget",
  },
  {
    id: "security-alerts",
    title: "보안 경고",
    description: "보안 경고 및 알림을 확인합니다.",
    icon: <Shield className="h-5 w-5" />,
    category: "security",
    size: "md",
    component: "SecurityAlertsWidget",
  },
  {
    id: "login-activity",
    title: "로그인 활동",
    description: "최근 로그인 활동을 확인합니다.",
    icon: <Activity className="h-5 w-5" />,
    category: "security",
    size: "md",
    component: "LoginActivityWidget",
  },
  {
    id: "system-updates",
    title: "시스템 업데이트",
    description: "사용 가능한 업데이트를 확인합니다.",
    icon: <Settings className="h-5 w-5" />,
    category: "system",
    size: "sm",
    component: "SystemUpdatesWidget",
  },
  {
    id: "quick-actions",
    title: "빠른 작업",
    description: "자주 사용하는 작업에 빠르게 접근합니다.",
    icon: <Settings className="h-5 w-5" />,
    category: "other",
    size: "md",
    component: "QuickActionsWidget",
  },
  {
    id: "calendar",
    title: "일정 관리",
    description: "일정 및 이벤트를 확인합니다.",
    icon: <Calendar className="h-5 w-5" />,
    category: "other",
    size: "lg",
    component: "CalendarWidget",
  },
  {
    id: "notes",
    title: "메모장",
    description: "간단한 메모를 작성하고 관리합니다.",
    icon: <FileText className="h-5 w-5" />,
    category: "other",
    size: "md",
    component: "NotesWidget",
  },
  {
    id: "clock",
    title: "시계",
    description: "현재 시간 및 타임존을 확인합니다.",
    icon: <Clock className="h-5 w-5" />,
    category: "other",
    size: "sm",
    component: "ClockWidget",
  },
]

interface WidgetGalleryProps {
  onAddWidget: (widget: WidgetType) => void
}

export function WidgetGallery({ onAddWidget }: WidgetGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [open, setOpen] = useState(false)

  const filteredWidgets = availableWidgets.filter((widget) => {
    const matchesSearch =
      widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeTab === "all" || widget.category === activeTab
    return matchesSearch && matchesCategory
  })

  const handleAddWidget = (widget: WidgetType) => {
    onAddWidget(widget)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-point hover:bg-point/90">
          <Plus className="mr-2 h-4 w-4" />
          위젯 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>위젯 갤러리</DialogTitle>
          <DialogDescription>대시보드에 추가할 위젯을 선택하세요.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="위젯 검색..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="analytics">분석</TabsTrigger>
              <TabsTrigger value="content">콘텐츠</TabsTrigger>
              <TabsTrigger value="users">사용자</TabsTrigger>
              <TabsTrigger value="system">시스템</TabsTrigger>
              <TabsTrigger value="security">보안</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-2 gap-4">
                {filteredWidgets.map((widget) => (
                  <Card key={widget.id} className="cursor-pointer hover:border-point transition-colors">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-muted">{widget.icon}</div>
                          <CardTitle className="text-base">{widget.title}</CardTitle>
                        </div>
                        <Badge variant="outline">{widget.size}</Badge>
                      </div>
                      <CardDescription className="text-xs mt-1">{widget.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        className="w-full bg-point hover:bg-point/90"
                        size="sm"
                        onClick={() => handleAddWidget(widget)}
                      >
                        <Plus className="mr-2 h-3 w-3" />
                        추가
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                {filteredWidgets.length === 0 && (
                  <div className="col-span-2 flex flex-col items-center justify-center py-8 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">위젯을 찾을 수 없습니다</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      다른 검색어를 입력하거나 다른 카테고리를 선택해보세요.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}


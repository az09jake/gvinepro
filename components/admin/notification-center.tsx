"use client"

import { useState } from "react"
import { Bell, X, Check, AlertTriangle, Info, User, Settings, FileText, Database, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// 알림 타입 정의
export type NotificationType = "info" | "warning" | "error" | "success"
export type NotificationCategory = "system" | "security" | "content" | "user" | "performance" | "backup"

export interface Notification {
  id: string
  type: NotificationType
  category: NotificationCategory
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

// 알림 아이콘 컴포넌트
const NotificationIcon = ({ type, category }: { type: NotificationType; category: NotificationCategory }) => {
  // 카테고리별 아이콘
  const getCategoryIcon = () => {
    switch (category) {
      case "system":
        return <Settings className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "content":
        return <FileText className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      case "performance":
        return <AlertTriangle className="h-4 w-4" />
      case "backup":
        return <Database className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  // 타입별 색상
  const getTypeColor = () => {
    switch (type) {
      case "info":
        return "text-blue-500 bg-blue-100"
      case "warning":
        return "text-amber-500 bg-amber-100"
      case "error":
        return "text-red-500 bg-red-100"
      case "success":
        return "text-green-500 bg-green-100"
      default:
        return "text-gray-500 bg-gray-100"
    }
  }

  return <div className={`p-2 rounded-full ${getTypeColor()}`}>{getCategoryIcon()}</div>
}

// 알림 카테고리 배지
const CategoryBadge = ({ category }: { category: NotificationCategory }) => {
  const getCategoryStyle = () => {
    switch (category) {
      case "system":
        return "bg-gray-500"
      case "security":
        return "bg-red-500"
      case "content":
        return "bg-blue-500"
      case "user":
        return "bg-green-500"
      case "performance":
        return "bg-amber-500"
      case "backup":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryLabel = () => {
    switch (category) {
      case "system":
        return "시스템"
      case "security":
        return "보안"
      case "content":
        return "콘텐츠"
      case "user":
        return "사용자"
      case "performance":
        return "성능"
      case "backup":
        return "백업"
      default:
        return category
    }
  }

  return <Badge className={getCategoryStyle()}>{getCategoryLabel()}</Badge>
}

// 시간 포맷팅 함수
const formatTimestamp = (date: Date) => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffDay > 0) {
    return `${diffDay}일 전`
  } else if (diffHour > 0) {
    return `${diffHour}시간 전`
  } else if (diffMin > 0) {
    return `${diffMin}분 전`
  } else {
    return "방금 전"
  }
}

// 샘플 알림 데이터 생성
const generateSampleNotifications = (): Notification[] => {
  return [
    {
      id: "1",
      type: "error",
      category: "security",
      title: "비정상적인 로그인 시도",
      message: "IP 주소 203.0.113.1에서 5회 연속 로그인 실패가 감지되었습니다.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15분 전
      read: false,
      actionUrl: "/admin/dashboard/security",
    },
    {
      id: "2",
      type: "warning",
      category: "performance",
      title: "서버 CPU 사용량 높음",
      message: "서버 CPU 사용량이 85%를 초과했습니다. 시스템 성능이 저하될 수 있습니다.",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45분 전
      read: false,
      actionUrl: "/admin/dashboard/performance",
    },
    {
      id: "3",
      type: "info",
      category: "content",
      title: "새 댓글 승인 대기 중",
      message: "3개의 새 댓글이 승인을 기다리고 있습니다.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
      read: true,
      actionUrl: "/admin/dashboard/comments",
    },
    {
      id: "4",
      type: "success",
      category: "backup",
      title: "백업 완료",
      message: "자동 백업이 성공적으로 완료되었습니다.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6시간 전
      read: true,
      actionUrl: "/admin/dashboard/backup",
    },
    {
      id: "5",
      type: "info",
      category: "user",
      title: "새 구독 신청",
      message: "새로운 구독 신청이 접수되었습니다. 확인이 필요합니다.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12시간 전
      read: false,
      actionUrl: "/admin/dashboard/subscriptions",
    },
    {
      id: "6",
      type: "warning",
      category: "system",
      title: "시스템 업데이트 필요",
      message: "새로운 시스템 업데이트가 있습니다. 보안 패치를 포함하고 있으니 가능한 빨리 업데이트하세요.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1일 전
      read: true,
      actionUrl: "/admin/dashboard/settings",
    },
    {
      id: "7",
      type: "error",
      category: "performance",
      title: "데이터베이스 연결 오류",
      message: "데이터베이스 연결 오류가 발생했습니다. 자동으로 재연결을 시도합니다.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2일 전
      read: true,
      actionUrl: "/admin/dashboard/logs",
    },
    {
      id: "8",
      type: "success",
      category: "content",
      title: "콘텐츠 업데이트 완료",
      message: "예약된 콘텐츠 업데이트가 성공적으로 완료되었습니다.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
      read: true,
      actionUrl: "/admin/dashboard/posts",
    },
  ]
}

interface NotificationCenterProps {
  onClose?: () => void
  className?: string
}

export function NotificationCenter({ onClose, className }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(generateSampleNotifications())
  const [activeTab, setActiveTab] = useState("all")
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    security: true,
    performance: true,
    content: true,
    user: true,
    system: true,
    backup: true,
  })

  // 읽지 않은 알림 수
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // 알림 필터링
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.category === activeTab
  })

  // 알림 읽음 처리
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // 모든 알림 읽음 처리
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // 알림 삭제
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // 모든 알림 삭제
  const deleteAllNotifications = () => {
    setNotifications([])
  }

  // 설정 변경 핸들러
  const handleSettingChange = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    })
  }

  return (
    <Card className={cn("w-full max-w-md shadow-lg", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-point" />
          <h2 className="text-lg font-medium">알림 센터</h2>
          {unreadCount > 0 && <Badge className="ml-2 bg-point">{unreadCount}</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4 mr-1" />
            모두 읽음
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="p-4 border-b">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="unread">안 읽음</TabsTrigger>
            <TabsTrigger value="security">보안</TabsTrigger>
            <TabsTrigger value="system">시스템</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="m-0">
          <ScrollArea className="h-[400px] p-4">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-3 p-3 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
                  >
                    <NotificationIcon type={notification.type} category={notification.category} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <CategoryBadge category={notification.category} />
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => markAsRead(notification.id)}
                            disabled={notification.read}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(notification.timestamp)}</span>
                        </div>
                        {notification.actionUrl && (
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                            자세히 보기
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">알림이 없습니다</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "all"
                    ? "현재 알림이 없습니다."
                    : activeTab === "unread"
                      ? "읽지 않은 알림이 없습니다."
                      : `${activeTab} 카테고리의 알림이 없습니다.`}
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="settings" className="m-0">
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">알림 방법</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">이메일 알림</Label>
                    <p className="text-sm text-muted-foreground">중요한 알림을 이메일로 받습니다.</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => handleSettingChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">브라우저 알림</Label>
                    <p className="text-sm text-muted-foreground">브라우저 푸시 알림을 받습니다.</p>
                  </div>
                  <Switch
                    id="browser-notifications"
                    checked={notificationSettings.browser}
                    onCheckedChange={(checked) => handleSettingChange("browser", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">알림 카테고리</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="security-notifications">보안 알림</Label>
                    <p className="text-sm text-muted-foreground">보안 관련 알림을 받습니다.</p>
                  </div>
                  <Switch
                    id="security-notifications"
                    checked={notificationSettings.security}
                    onCheckedChange={(checked) => handleSettingChange("security", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="performance-notifications">성능 알림</Label>
                    <p className="text-sm text-muted-foreground">시스템 성능 관련 알림을 받습니다.</p>
                  </div>
                  <Switch
                    id="performance-notifications"
                    checked={notificationSettings.performance}
                    onCheckedChange={(checked) => handleSettingChange("performance", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="content-notifications">콘텐츠 알림</Label>
                    <p className="text-sm text-muted-foreground">콘텐츠 관련 알림을 받습니다.</p>
                  </div>
                  <Switch
                    id="content-notifications"
                    checked={notificationSettings.content}
                    onCheckedChange={(checked) => handleSettingChange("content", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-notifications">사용자 알림</Label>
                    <p className="text-sm text-muted-foreground">사용자 활동 관련 알림을 받습니다.</p>
                  </div>
                  <Switch
                    id="user-notifications"
                    checked={notificationSettings.user}
                    onCheckedChange={(checked) => handleSettingChange("user", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-notifications">시스템 알림</Label>
                    <p className="text-sm text-muted-foreground">시스템 관련 알림을 받습니다.</p>
                  </div>
                  <Switch
                    id="system-notifications"
                    checked={notificationSettings.system}
                    onCheckedChange={(checked) => handleSettingChange("system", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="backup-notifications">백업 알림</Label>
                    <p className="text-sm text-muted-foreground">백업 관련 알림을 받습니다.</p>
                  </div>
                  <Switch
                    id="backup-notifications"
                    checked={notificationSettings.backup}
                    onCheckedChange={(checked) => handleSettingChange("backup", checked)}
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between p-4 border-t">
        <Button variant="outline" size="sm" onClick={deleteAllNotifications} disabled={notifications.length === 0}>
          모든 알림 삭제
        </Button>
        <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
          <Settings className="h-4 w-4 mr-1" />
          알림 설정
        </Button>
      </div>
    </Card>
  )
}


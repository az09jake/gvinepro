"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { Notification } from "@/components/admin/notification-center"
import { Bell, Clock, Check, X, Trash2, Download, Settings, Mail, MessageSquare } from "lucide-react"

export default function NotificationsPage() {
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

  const [notifications, setNotifications] = useState<Notification[]>(generateSampleNotifications())

  // 설정 변경 핸들러
  const handleSettingChange = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    })
  }

  // 알림 삭제
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // 모든 알림 삭제
  const deleteAllNotifications = () => {
    setNotifications([])
  }

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

  // 읽지 않은 알림 수
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // 알림 필터링
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.category === activeTab
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light">알림 센터</h1>
          <p className="text-muted-foreground">시스템 알림을 확인하고 관리합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="mr-2 h-4 w-4" />
            모두 읽음 표시
          </Button>
          <Button className="bg-point hover:bg-point/90" size="sm" onClick={() => setActiveTab("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            알림 설정
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardDescription>
                {unreadCount > 0 ? `${unreadCount}개의 읽지 않은 알림이 있습니다.` : "모든 알림을 읽었습니다."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="unread">안 읽음</TabsTrigger>
                  <TabsTrigger value="security">보안</TabsTrigger>
                  <TabsTrigger value="system">시스템</TabsTrigger>
                </TabsList>

                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex gap-3 p-3 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            notification.type === "info"
                              ? "bg-blue-100 text-blue-500"
                              : notification.type === "warning"
                                ? "bg-amber-100 text-amber-500"
                                : notification.type === "error"
                                  ? "bg-red-100 text-red-500"
                                  : "bg-green-100 text-green-500"
                          }`}
                        >
                          <Bell className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              <Badge
                                className={
                                  notification.category === "security"
                                    ? "bg-red-500"
                                    : notification.category === "performance"
                                      ? "bg-amber-500"
                                      : notification.category === "content"
                                        ? "bg-blue-500"
                                        : notification.category === "user"
                                          ? "bg-green-500"
                                          : notification.category === "backup"
                                            ? "bg-purple-500"
                                            : "bg-gray-500"
                                }
                              >
                                {notification.category}
                              </Badge>
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
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
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
                </div>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={deleteAllNotifications}
                disabled={notifications.length === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                모든 알림 삭제
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>알림 수신 방법 및 유형을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">이메일 알림 설정</h3>
                <div className="space-y-2">
                  <Label htmlFor="notification-email">알림 수신 이메일</Label>
                  <Input id="notification-email" type="email" placeholder="your-email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">알림 빈도</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="알림 빈도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">실시간</SelectItem>
                      <SelectItem value="hourly">시간별 요약</SelectItem>
                      <SelectItem value="daily">일별 요약</SelectItem>
                      <SelectItem value="weekly">주별 요약</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-point hover:bg-point/90">
                <Mail className="mr-2 h-4 w-4" />
                테스트 알림 보내기
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>알림 기록</CardTitle>
          <CardDescription>지난 30일간의 알림 기록을 확인합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-4 py-2 text-left">날짜</th>
                  <th className="px-4 py-2 text-left">유형</th>
                  <th className="px-4 py-2 text-left">카테고리</th>
                  <th className="px-4 py-2 text-left">제목</th>
                  <th className="px-4 py-2 text-left">상태</th>
                  <th className="px-4 py-2 text-right">작업</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification.id} className="border-t">
                    <td className="px-4 py-2 text-sm">
                      {notification.timestamp.toLocaleDateString()} {notification.timestamp.toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2">
                      <Badge
                        className={
                          notification.type === "info"
                            ? "bg-blue-500"
                            : notification.type === "warning"
                              ? "bg-amber-500"
                              : notification.type === "error"
                                ? "bg-red-500"
                                : "bg-green-500"
                        }
                      >
                        {notification.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-2">
                      <Badge variant="outline">{notification.category}</Badge>
                    </td>
                    <td className="px-4 py-2 text-sm">{notification.title}</td>
                    <td className="px-4 py-2">
                      {notification.read ? (
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          읽음
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          안 읽음
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            알림 기록 내보내기
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


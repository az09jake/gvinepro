"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  User,
  Settings,
  FileText,
  Database,
  Shield,
  Globe,
  Mail,
  Users,
  ImageIcon,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { format } from "date-fns"

// 모의 로그 데이터
const logs = [
  {
    id: 1,
    timestamp: "2023-08-20T15:30:45",
    level: "info",
    category: "auth",
    message: "사용자 로그인: admin",
    user: "admin",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    timestamp: "2023-08-20T15:25:12",
    level: "warning",
    category: "security",
    message: "로그인 실패 시도 (3회): user123",
    user: "user123",
    ip: "192.168.1.2",
  },
  {
    id: 3,
    timestamp: "2023-08-20T15:20:05",
    level: "error",
    category: "database",
    message: "데이터베이스 연결 오류: Connection timed out",
    user: "system",
    ip: "localhost",
  },
  {
    id: 4,
    timestamp: "2023-08-20T15:15:30",
    level: "info",
    category: "content",
    message: "새 포스트 작성: 'AI와 전문가의 협업'",
    user: "editor",
    ip: "192.168.1.3",
  },
  {
    id: 5,
    timestamp: "2023-08-20T15:10:22",
    level: "success",
    category: "system",
    message: "시스템 백업 완료",
    user: "system",
    ip: "localhost",
  },
  {
    id: 6,
    timestamp: "2023-08-20T15:05:18",
    level: "info",
    category: "auth",
    message: "사용자 로그아웃: editor",
    user: "editor",
    ip: "192.168.1.3",
  },
  {
    id: 7,
    timestamp: "2023-08-20T15:00:05",
    level: "error",
    category: "api",
    message: "외부 API 호출 실패: 404 Not Found",
    user: "system",
    ip: "localhost",
  },
  {
    id: 8,
    timestamp: "2023-08-20T14:55:30",
    level: "warning",
    category: "security",
    message: "비정상적인 접근 시도 감지",
    user: "unknown",
    ip: "203.0.113.1",
  },
  {
    id: 9,
    timestamp: "2023-08-20T14:50:12",
    level: "info",
    category: "content",
    message: "포스트 수정: 'UX/UI 디자인 트렌드 2023'",
    user: "author",
    ip: "192.168.1.4",
  },
  {
    id: 10,
    timestamp: "2023-08-20T14:45:05",
    level: "success",
    category: "email",
    message: "뉴스레터 발송 완료: 50명 수신",
    user: "system",
    ip: "localhost",
  },
  {
    id: 11,
    timestamp: "2023-08-20T14:40:30",
    level: "info",
    category: "subscription",
    message: "새 구독 신청: hong@example.com",
    user: "system",
    ip: "localhost",
  },
  {
    id: 12,
    timestamp: "2023-08-20T14:35:22",
    level: "error",
    category: "media",
    message: "파일 업로드 실패: 용량 초과",
    user: "editor",
    ip: "192.168.1.3",
  },
]

// 로그 레벨에 따른 배지 색상 및 아이콘
const getLogLevelBadge = (level: string) => {
  switch (level) {
    case "info":
      return (
        <Badge className="bg-blue-500 text-white">
          <Info className="h-3 w-3 mr-1" />
          정보
        </Badge>
      )
    case "warning":
      return (
        <Badge className="bg-yellow-500 text-white">
          <AlertTriangle className="h-3 w-3 mr-1" />
          경고
        </Badge>
      )
    case "error":
      return (
        <Badge className="bg-red-500 text-white">
          <XCircle className="h-3 w-3 mr-1" />
          오류
        </Badge>
      )
    case "success":
      return (
        <Badge className="bg-green-500 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          성공
        </Badge>
      )
    default:
      return <Badge variant="outline">{level}</Badge>
  }
}

// 로그 카테고리에 따른 아이콘
const getLogCategoryIcon = (category: string) => {
  switch (category) {
    case "auth":
      return <User className="h-4 w-4 text-muted-foreground" />
    case "security":
      return <Shield className="h-4 w-4 text-muted-foreground" />
    case "database":
      return <Database className="h-4 w-4 text-muted-foreground" />
    case "content":
      return <FileText className="h-4 w-4 text-muted-foreground" />
    case "system":
      return <Settings className="h-4 w-4 text-muted-foreground" />
    case "api":
      return <Globe className="h-4 w-4 text-muted-foreground" />
    case "email":
      return <Mail className="h-4 w-4 text-muted-foreground" />
    case "subscription":
      return <Users className="h-4 w-4 text-muted-foreground" />
    case "media":
      return <ImageIcon className="h-4 w-4 text-muted-foreground" />
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />
  }
}

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("all")
  const [autoRefresh, setAutoRefresh] = useState(false)

  // 필터링된 로그 목록
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter
    const matchesUser = userFilter === "all" || log.user === userFilter
    const matchesTab = activeTab === "all" || log.level === activeTab

    // 날짜 범위 필터링
    let matchesDateRange = true
    if (dateRange?.from && dateRange?.to) {
      const logDate = new Date(log.timestamp)
      matchesDateRange = logDate >= dateRange.from && logDate <= dateRange.to
    }

    return matchesSearch && matchesLevel && matchesCategory && matchesUser && matchesDateRange && matchesTab
  })

  // 로그 레벨 목록 (중복 제거)
  const logLevels = ["all", ...Array.from(new Set(logs.map((log) => log.level)))]

  // 로그 카테고리 목록 (중복 제거)
  const logCategories = ["all", ...Array.from(new Set(logs.map((log) => log.category)))]

  // 사용자 목록 (중복 제거)
  const users = ["all", ...Array.from(new Set(logs.map((log) => log.user)))]

  // 로그 다운로드 처리
  const handleDownloadLogs = () => {
    // 실제 구현에서는 여기에 로그 다운로드 로직이 들어갑니다.
    console.log("Downloading logs...")

    // 로그 데이터를 JSON 문자열로 변환
    const logsJson = JSON.stringify(filteredLogs, null, 2)

    // Blob 생성
    const blob = new Blob([logsJson], { type: "application/json" })

    // 다운로드 링크 생성
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `logs_${new Date().toISOString().split("T")[0]}.json`

    // 다운로드 링크 클릭
    document.body.appendChild(a)
    a.click()

    // 정리
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 필터 초기화
  const resetFilters = () => {
    setSearchTerm("")
    setLevelFilter("all")
    setCategoryFilter("all")
    setUserFilter("all")
    setDateRange(undefined)
    setActiveTab("all")
  }

  // 자동 새로고침 토글
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
    // 실제 구현에서는 여기에 자동 새로고침 로직이 들어갑니다.
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light">시스템 로그</h1>
          <p className="text-muted-foreground">시스템 로그를 확인하고 관리합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadLogs}>
            <Download className="mr-2 h-4 w-4" />
            로그 다운로드
          </Button>
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={toggleAutoRefresh}
            className={autoRefresh ? "bg-point hover:bg-point/90" : ""}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`} />
            {autoRefresh ? "자동 새로고침 중" : "자동 새로고침"}
          </Button>
        </div>
      </div>

      {/* 로그 레벨 탭 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="info" className="text-blue-500">
            정보
          </TabsTrigger>
          <TabsTrigger value="warning" className="text-yellow-500">
            경고
          </TabsTrigger>
          <TabsTrigger value="error" className="text-red-500">
            오류
          </TabsTrigger>
          <TabsTrigger value="success" className="text-green-500">
            성공
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 필터 및 검색 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="로그 검색..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="로그 레벨" />
              </SelectTrigger>
              <SelectContent>
                {logLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "all" ? "모든 레벨" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                {logCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "모든 카테고리" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="사용자" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user === "all" ? "모든 사용자" : user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DatePickerWithRange className="w-full md:w-auto" selected={dateRange} onSelect={setDateRange} />
          </div>
        </div>

        {/* 필터 요약 */}
        {(searchTerm || levelFilter !== "all" || categoryFilter !== "all" || userFilter !== "all" || dateRange) && (
          <div className="flex items-center gap-2 text-sm">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">필터:</span>

            {searchTerm && (
              <Badge variant="outline" className="font-normal">
                검색: {searchTerm}
                <button className="ml-1 text-muted-foreground hover:text-foreground" onClick={() => setSearchTerm("")}>
                  ×
                </button>
              </Badge>
            )}

            {levelFilter !== "all" && (
              <Badge variant="outline" className="font-normal">
                레벨: {levelFilter}
                <button
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setLevelFilter("all")}
                >
                  ×
                </button>
              </Badge>
            )}

            {categoryFilter !== "all" && (
              <Badge variant="outline" className="font-normal">
                카테고리: {categoryFilter}
                <button
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setCategoryFilter("all")}
                >
                  ×
                </button>
              </Badge>
            )}

            {userFilter !== "all" && (
              <Badge variant="outline" className="font-normal">
                사용자: {userFilter}
                <button
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setUserFilter("all")}
                >
                  ×
                </button>
              </Badge>
            )}

            {dateRange && (
              <Badge variant="outline" className="font-normal">
                기간: {format(dateRange.from, "yyyy-MM-dd")} ~ {format(dateRange.to, "yyyy-MM-dd")}
                <button
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setDateRange(undefined)}
                >
                  ×
                </button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={resetFilters}
            >
              모두 지우기
            </Button>
          </div>
        )}
      </div>

      {/* 로그 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>로그 목록</CardTitle>
          <CardDescription>
            총 {logs.length}개 중 {filteredLogs.length}개 표시
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length > 0 ? (
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex flex-col border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getLogLevelBadge(log.level)}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getLogCategoryIcon(log.category)}
                        <span>{log.category}</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{log.user}</span>
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm">{log.message}</p>
                  <div className="text-xs text-muted-foreground mt-1">IP: {log.ip}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || levelFilter !== "all" || categoryFilter !== "all" || userFilter !== "all" || dateRange
                ? "검색 결과가 없습니다."
                : "로그가 없습니다."}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 로그 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>로그 설정</CardTitle>
          <CardDescription>로그 수집 및 보관 설정을 관리합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">로그 수집</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-info" defaultChecked />
                  <Label htmlFor="log-info">정보 로그 수집</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-warning" defaultChecked />
                  <Label htmlFor="log-warning">경고 로그 수집</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-error" defaultChecked />
                  <Label htmlFor="log-error">오류 로그 수집</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-success" defaultChecked />
                  <Label htmlFor="log-success">성공 로그 수집</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-retention">로그 보관 기간 (일)</Label>
                <Input id="log-retention" type="number" min="1" max="365" defaultValue="30" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">카테고리별 설정</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-auth" defaultChecked />
                  <Label htmlFor="log-auth">인증 로그</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-security" defaultChecked />
                  <Label htmlFor="log-security">보안 로그</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-database" defaultChecked />
                  <Label htmlFor="log-database">데이터베이스 로그</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-content" defaultChecked />
                  <Label htmlFor="log-content">콘텐츠 로그</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="log-system" defaultChecked />
                  <Label htmlFor="log-system">시스템 로그</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-export">로그 내보내기 형식</Label>
                <Select defaultValue="json">
                  <SelectTrigger id="log-export">
                    <SelectValue placeholder="내보내기 형식 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="txt">텍스트</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex justify-end">
            <Button className="bg-point hover:bg-point/90">설정 저장</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


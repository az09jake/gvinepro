"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, Download, RefreshCw, Filter } from "lucide-react"

// 로그 타입 정의
type LogLevel = "info" | "warning" | "error" | "debug"

interface SystemLog {
  id: string
  timestamp: Date
  level: LogLevel
  source: string
  message: string
  details?: string
  user?: string
}

// 샘플 로그 데이터
const generateSampleLogs = (count: number): SystemLog[] => {
  const sources = ["auth", "api", "database", "file-system", "admin", "frontend", "cache", "email"]
  const infoMessages = [
    "사용자 로그인 성공",
    "API 요청 완료",
    "데이터베이스 쿼리 실행",
    "파일 업로드 완료",
    "설정 변경됨",
    "페이지 렌더링 완료",
    "캐시 갱신됨",
    "이메일 전송 성공",
  ]
  const warningMessages = [
    "비정상적인 로그인 시도",
    "API 응답 지연",
    "데이터베이스 연결 지연",
    "대용량 파일 업로드",
    "중요 설정 변경",
    "페이지 로딩 지연",
    "캐시 부분 실패",
    "이메일 전송 재시도",
  ]
  const errorMessages = [
    "인증 실패",
    "API 요청 실패",
    "데이터베이스 쿼리 오류",
    "파일 업로드 실패",
    "설정 저장 실패",
    "렌더링 오류 발생",
    "캐시 오류",
    "이메일 전송 실패",
  ]
  const debugMessages = [
    "세션 토큰 생성",
    "API 요청 헤더 분석",
    "쿼리 실행 계획",
    "파일 메타데이터 처리",
    "설정 객체 직렬화",
    "컴포넌트 라이프사이클",
    "캐시 키 생성",
    "이메일 템플릿 컴파일",
  ]

  const users = ["admin", "editor", "user123", "system", "scheduler"]

  const logs: SystemLog[] = []

  for (let i = 0; i < count; i++) {
    const now = new Date()
    const randomTime = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    const level: LogLevel = ["info", "warning", "error", "debug"][Math.floor(Math.random() * 4)] as LogLevel
    const sourceIndex = Math.floor(Math.random() * sources.length)
    const source = sources[sourceIndex]

    let message = ""
    switch (level) {
      case "info":
        message = infoMessages[sourceIndex]
        break
      case "warning":
        message = warningMessages[sourceIndex]
        break
      case "error":
        message = errorMessages[sourceIndex]
        break
      case "debug":
        message = debugMessages[sourceIndex]
        break
    }

    logs.push({
      id: `log-${i}`,
      timestamp: randomTime,
      level,
      source,
      message,
      details: level === "error" ? "상세 오류 스택 트레이스 정보" : undefined,
      user: Math.random() > 0.3 ? users[Math.floor(Math.random() * users.length)] : undefined,
    })
  }

  // 시간순 정렬
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// 로그 레벨에 따른 배지 색상
const getLevelBadge = (level: LogLevel) => {
  switch (level) {
    case "info":
      return <Badge className="bg-blue-500 hover:bg-blue-600">정보</Badge>
    case "warning":
      return <Badge className="bg-amber-500 hover:bg-amber-600">경고</Badge>
    case "error":
      return <Badge className="bg-red-500 hover:bg-red-600">오류</Badge>
    case "debug":
      return <Badge className="bg-gray-500 hover:bg-gray-600">디버그</Badge>
    default:
      return <Badge>알 수 없음</Badge>
  }
}

// 날짜 포맷팅 함수
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date)
}

interface SystemLogTableProps {
  initialLogs?: SystemLog[]
  itemsPerPage?: number
}

export function SystemLogTable({ initialLogs, itemsPerPage = 10 }: SystemLogTableProps) {
  const [logs] = useState<SystemLog[]>(initialLogs || generateSampleLogs(100))
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLevels, setSelectedLevels] = useState<LogLevel[]>(["info", "warning", "error", "debug"])
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  // 로그 필터링
  const filteredLogs = logs.filter((log) => {
    // 검색어 필터링
    const searchMatch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()))

    // 레벨 필터링
    const levelMatch = selectedLevels.includes(log.level)

    // 소스 필터링
    const sourceMatch = selectedSources.length === 0 || selectedSources.includes(log.source)

    return searchMatch && levelMatch && sourceMatch
  })

  // 페이지네이션
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // 소스 목록 추출
  const sources = Array.from(new Set(logs.map((log) => log.source)))

  // 레벨 필터 토글
  const toggleLevel = (level: LogLevel) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((l) => l !== level))
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }

  // 소스 필터 토글
  const toggleSource = (source: string) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter((s) => s !== source))
    } else {
      setSelectedSources([...selectedSources, source])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="로그 검색..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                레벨 필터
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => toggleLevel("info")}
                className={selectedLevels.includes("info") ? "bg-blue-50" : ""}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes("info")}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <Badge className="bg-blue-500">정보</Badge>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toggleLevel("warning")}
                className={selectedLevels.includes("warning") ? "bg-amber-50" : ""}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes("warning")}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <Badge className="bg-amber-500">경고</Badge>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toggleLevel("error")}
                className={selectedLevels.includes("error") ? "bg-red-50" : ""}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes("error")}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <Badge className="bg-red-500">오류</Badge>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toggleLevel("debug")}
                className={selectedLevels.includes("debug") ? "bg-gray-50" : ""}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes("debug")}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <Badge className="bg-gray-500">디버그</Badge>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                소스 필터
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
              {sources.map((source) => (
                <DropdownMenuItem
                  key={source}
                  onClick={() => toggleSource(source)}
                  className={selectedSources.includes(source) ? "bg-gray-50" : ""}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSources.includes(source)}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    {source}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="h-9">
            <RefreshCw className="h-4 w-4 mr-2" />
            새로고침
          </Button>

          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">시간</TableHead>
              <TableHead className="w-[100px]">레벨</TableHead>
              <TableHead className="w-[120px]">소스</TableHead>
              <TableHead>메시지</TableHead>
              <TableHead className="w-[100px]">사용자</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{formatDate(log.timestamp)}</TableCell>
                  <TableCell>{getLevelBadge(log.level)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.source}</Badge>
                  </TableCell>
                  <TableCell className="max-w-md truncate">{log.message}</TableCell>
                  <TableCell>{log.user || "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">메뉴 열기</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>상세 보기</DropdownMenuItem>
                        <DropdownMenuItem>관련 로그 검색</DropdownMenuItem>
                        <DropdownMenuItem>복사</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          총 {filteredLogs.length}개 로그 중 {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredLogs.length)}개 표시
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            {currentPage} / {totalPages || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


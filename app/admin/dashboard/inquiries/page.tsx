"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, Search, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import InquiryDetailModal from "@/components/admin/inquiry-detail-modal"
import { useData } from "@/lib/hooks/use-swr"

export default function InquiriesPage() {
  const { data: inquiries, isLoading, mutate } = useData("/api/inquiries")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const itemsPerPage = 5

  // 필터링된 문의 내용 목록
  const filteredInquiries = inquiries
    ? inquiries.filter((inquiry: any) => {
        const matchesSearch =
          inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter

        return matchesSearch && matchesStatus
      })
    : []

  // 페이지네이션
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInquiries = filteredInquiries.slice(startIndex, startIndex + itemsPerPage)

  // 상태에 따른 배지 색상 및 텍스트
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "answered":
        return <Badge className="bg-blue-500">응답 완료</Badge>
      case "reviewing":
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-white">
            검토 중
          </Badge>
        )
      case "unanswered":
        return <Badge variant="destructive">미응답</Badge>
      default:
        return <Badge variant="outline">알 수 없음</Badge>
    }
  }

  // 상세 정보 모달 열기
  const openDetailModal = (inquiry: any) => {
    setSelectedInquiry(inquiry)
    setIsDetailModalOpen(true)
  }

  // 상태 변경 처리
  const handleStatusChange = (id: number, newStatus: string) => {
    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
    console.log(`Changing status of inquiry ${id} to ${newStatus}`)

    // 모의 업데이트 처리 (실제 구현에서는 API 호출로 대체)
    const updatedInquiries = inquiries.map((inquiry: any) =>
      inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry,
    )

    // 문의 목록 업데이트
    mutate(updatedInquiries, false)

    // 선택된 문의 정보도 업데이트
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus })
    }
  }

  // 응답 처리
  const handleReply = (id: number, replyText: string) => {
    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
    console.log(`Replying to inquiry ${id}: ${replyText}`)

    // 현재 날짜 생성
    const now = new Date()
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    // 새 응답 객체
    const newReply = {
      text: replyText,
      date: formattedDate,
    }

    // 모의 업데이트 처리 (실제 구현에서는 API 호출로 대체)
    const updatedInquiries = inquiries.map((inquiry: any) => {
      if (inquiry.id === id) {
        const replies = inquiry.replies || []
        return {
          ...inquiry,
          replies: [...replies, newReply],
          status: "answered",
        }
      }
      return inquiry
    })

    // 문의 목록 업데이트
    mutate(updatedInquiries, false)

    // 선택된 문의 정보도 업데이트
    if (selectedInquiry && selectedInquiry.id === id) {
      const replies = selectedInquiry.replies || []
      setSelectedInquiry({
        ...selectedInquiry,
        replies: [...replies, newReply],
        status: "answered",
      })
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-light">문의 내용 관리</h1>
        <p className="text-muted-foreground">고객의 문의 내용을 관리하고 응답 상태를 업데이트하세요.</p>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="제목, 이름 또는 내용 검색..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="answered">응답 완료</SelectItem>
                <SelectItem value="reviewing">검토 중</SelectItem>
                <SelectItem value="unanswered">미응답</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 필터 요약 */}
        {statusFilter !== "all" && (
          <div className="flex items-center gap-2 text-sm">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">필터:</span>
            <Badge variant="outline" className="font-normal">
              상태: {statusFilter === "answered" ? "응답 완료" : statusFilter === "reviewing" ? "검토 중" : "미응답"}
              <button
                className="ml-1 text-muted-foreground hover:text-foreground"
                onClick={() => setStatusFilter("all")}
              >
                ×
              </button>
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => setStatusFilter("all")}
            >
              모두 지우기
            </Button>
          </div>
        )}
      </div>

      {/* 문의 내용 테이블 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center">
                  제목
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">이름</TableHead>
              <TableHead className="hidden md:table-cell">이메일</TableHead>
              <TableHead className="hidden lg:table-cell">내용</TableHead>
              <TableHead>
                <div className="flex items-center">
                  날짜
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : paginatedInquiries.length > 0 ? (
              paginatedInquiries.map((inquiry: any) => (
                <TableRow
                  key={inquiry.id}
                  className="cursor-pointer hover:bg-secondary/50"
                  onClick={() => openDetailModal(inquiry)}
                >
                  <TableCell className="font-medium">{inquiry.id}</TableCell>
                  <TableCell>{inquiry.subject}</TableCell>
                  <TableCell className="hidden md:table-cell">{inquiry.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{inquiry.email}</TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[300px] truncate">{inquiry.message}</TableCell>
                  <TableCell>{inquiry.date}</TableCell>
                  <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">메뉴 열기</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            openDetailModal(inquiry)
                          }}
                        >
                          상세 정보 보기
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(inquiry.id, "answered")
                          }}
                        >
                          응답 완료로 변경
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(inquiry.id, "reviewing")
                          }}
                        >
                          검토 중으로 변경
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(inquiry.id, "unanswered")
                          }}
                        >
                          미응답으로 변경
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  {searchTerm || statusFilter !== "all" ? "검색 결과가 없습니다." : "문의 내역이 없습니다."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      {filteredInquiries.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            총 {filteredInquiries.length}개 중 {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredInquiries.length)}개 표시
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">이전 페이지</span>
            </Button>
            <div className="text-sm">
              {currentPage} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">다음 페이지</span>
            </Button>
          </div>
        </div>
      )}

      {/* 상세 정보 모달 */}
      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onStatusChange={handleStatusChange}
          onReply={handleReply}
        />
      )}
    </div>
  )
}


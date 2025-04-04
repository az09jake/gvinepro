"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, Search, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import SubscriptionDetailModal from "@/components/admin/subscription-detail-modal"
import { useData } from "@/lib/hooks/use-swr"

export default function SubscriptionsPage() {
  const { data: subscriptions, isLoading, mutate } = useData("/api/subscriptions")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [businessTypeFilter, setBusinessTypeFilter] = useState("all")
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const itemsPerPage = 5

  // 필터링된 구독 신청 목록
  const filteredSubscriptions = subscriptions
    ? subscriptions.filter((subscription: any) => {
        const matchesSearch =
          subscription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subscription.phone.includes(searchTerm)
        const matchesStatus = statusFilter === "all" || subscription.status === statusFilter
        const matchesBusinessType = businessTypeFilter === "all" || subscription.businessType === businessTypeFilter
        const matchesServiceType = serviceTypeFilter === "all" || subscription.serviceType === serviceTypeFilter

        return matchesSearch && matchesStatus && matchesBusinessType && matchesServiceType
      })
    : []

  // 페이지네이션
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSubscriptions = filteredSubscriptions.slice(startIndex, startIndex + itemsPerPage)

  // 상태에 따른 배지 색상 및 텍스트
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">처리 완료</Badge>
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-white">
            검토 중
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">거절됨</Badge>
      default:
        return <Badge variant="outline">알 수 없음</Badge>
    }
  }

  // 서비스 타입 텍스트 변환
  const getServiceTypeText = (type: string) => {
    switch (type) {
      case "monthly":
        return "원스톱 솔루션 월간 구독"
      case "subscription":
        return "원스톱 솔루션 월정성 구독"
      case "partial":
        return "일부 서비스 이용"
      case "other":
        return "기타"
      default:
        return type
    }
  }

  // 상세 정보 모달 열기
  const openDetailModal = (subscription: any) => {
    setSelectedSubscription(subscription)
    setIsDetailModalOpen(true)
  }

  // 상태 변경 처리
  const handleStatusChange = (id: number, newStatus: string) => {
    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
    console.log(`Changing status of subscription ${id} to ${newStatus}`)

    // 모의 업데이트 처리 (실제 구현에서는 API 호출로 대체)
    const updatedSubscriptions = subscriptions.map((subscription: any) =>
      subscription.id === id ? { ...subscription, status: newStatus } : subscription,
    )

    // 구독 목록 업데이트
    mutate(updatedSubscriptions, false)

    // 선택된 구독 정보도 업데이트
    if (selectedSubscription && selectedSubscription.id === id) {
      setSelectedSubscription({ ...selectedSubscription, status: newStatus })
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-light">구독 신청 관리</h1>
        <p className="text-muted-foreground">고객의 구독 신청 내역을 관리하고 처리 상태를 업데이트하세요.</p>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="이름, 이메일 또는 전화번호 검색..."
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
                <SelectItem value="completed">처리 완료</SelectItem>
                <SelectItem value="pending">검토 중</SelectItem>
                <SelectItem value="rejected">거절됨</SelectItem>
              </SelectContent>
            </Select>

            <Select value={businessTypeFilter} onValueChange={setBusinessTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="비즈니스 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 유형</SelectItem>
                <SelectItem value="스타트업">스타트업</SelectItem>
                <SelectItem value="소규모 비즈니스">소규모 비즈니스</SelectItem>
                <SelectItem value="중견기업">중견기업</SelectItem>
                <SelectItem value="대기업">대기업</SelectItem>
                <SelectItem value="개인사업자">개인사업자</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="서비스 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 유형</SelectItem>
                <SelectItem value="monthly">월간 구독</SelectItem>
                <SelectItem value="subscription">월정성 구독</SelectItem>
                <SelectItem value="partial">일부 서비스</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 필터 요약 */}
        {(statusFilter !== "all" || businessTypeFilter !== "all" || serviceTypeFilter !== "all") && (
          <div className="flex items-center gap-2 text-sm">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">필터:</span>
            {statusFilter !== "all" && (
              <Badge variant="outline" className="font-normal">
                상태: {statusFilter === "completed" ? "처리 완료" : statusFilter === "pending" ? "검토 중" : "거절됨"}
                <button
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setStatusFilter("all")}
                >
                  ×
                </button>
              </Badge>
            )}
            {businessTypeFilter !== "all" && (
              <Badge variant="outline" className="font-normal">
                비즈니스: {businessTypeFilter}
                <button
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setBusinessTypeFilter("all")}
                >
                  ×
                </button>
              </Badge>
            )}
            {serviceTypeFilter !== "all" && (
              <Badge variant="outline" className="font-normal">
                서비스:{" "}
                {serviceTypeFilter === "monthly"
                  ? "월간 구독"
                  : serviceTypeFilter === "subscription"
                    ? "월정성 구독"
                    : serviceTypeFilter === "partial"
                      ? "일부 서비스"
                      : "기타"}
                <button
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setServiceTypeFilter("all")}
                >
                  ×
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setStatusFilter("all")
                setBusinessTypeFilter("all")
                setServiceTypeFilter("all")
              }}
            >
              모두 지우기
            </Button>
          </div>
        )}
      </div>

      {/* 구독 신청 테이블 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center">
                  이름
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">이메일</TableHead>
              <TableHead className="hidden md:table-cell">전화번호</TableHead>
              <TableHead className="hidden lg:table-cell">비즈니스 유형</TableHead>
              <TableHead className="hidden lg:table-cell">서비스 유형</TableHead>
              <TableHead>
                <div className="flex items-center">
                  신청일
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
                <TableCell colSpan={9} className="h-24 text-center">
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : paginatedSubscriptions.length > 0 ? (
              paginatedSubscriptions.map((subscription: any) => (
                <TableRow
                  key={subscription.id}
                  className="cursor-pointer hover:bg-secondary/50"
                  onClick={() => openDetailModal(subscription)}
                >
                  <TableCell className="font-medium">{subscription.id}</TableCell>
                  <TableCell>{subscription.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{subscription.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{subscription.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{subscription.businessType}</TableCell>
                  <TableCell className="hidden lg:table-cell">{getServiceTypeText(subscription.serviceType)}</TableCell>
                  <TableCell>{subscription.date}</TableCell>
                  <TableCell>{getStatusBadge(subscription.status)}</TableCell>
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
                            openDetailModal(subscription)
                          }}
                        >
                          상세 정보 보기
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(subscription.id, "completed")
                          }}
                        >
                          처리 완료로 변경
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(subscription.id, "pending")
                          }}
                        >
                          검토 중으로 변경
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(subscription.id, "rejected")
                          }}
                        >
                          거절됨으로 변경
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  {searchTerm || statusFilter !== "all" || businessTypeFilter !== "all" || serviceTypeFilter !== "all"
                    ? "검색 결과가 없습니다."
                    : "구독 신청 내역이 없습니다."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      {filteredSubscriptions.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            총 {filteredSubscriptions.length}개 중 {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredSubscriptions.length)}개 표시
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
      {selectedSubscription && (
        <SubscriptionDetailModal
          subscription={selectedSubscription}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}


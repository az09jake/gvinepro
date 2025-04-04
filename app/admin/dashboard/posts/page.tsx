"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Filter,
  Calendar,
  Tag,
  User,
  FileText,
  MessageSquare,
  LayoutGrid,
  LayoutList,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// 블로그 포스트 데이터 (실제로는 API나 데이터베이스에서 가져와야 함)
const blogPosts = [
  {
    id: 1,
    title: "AI와 전문가의 협업, 비즈니스 효율성을 극대화하는 방법",
    category: "AI",
    author: "김경환",
    date: "2023-05-15",
    status: "published",
    views: 1245,
    comments: 8,
    tags: ["AI", "비즈니스 효율성", "전문가 협업", "디지털 전환"],
  },
  {
    id: 2,
    title: "디지털 마케팅의 새로운 패러다임, AI 기반 타겟팅",
    category: "마케팅",
    author: "김영주",
    date: "2023-06-02",
    status: "published",
    views: 982,
    comments: 5,
    tags: ["디지털 마케팅", "AI 타겟팅", "마케팅 자동화", "데이터 분석"],
  },
  {
    id: 3,
    title: "UX/UI 디자인 트렌드 2023: 사용자 중심 디자인의 진화",
    category: "디자인",
    author: "최슬기",
    date: "2023-06-20",
    status: "published",
    views: 756,
    comments: 3,
    tags: ["UX/UI 디자인", "디자인 트렌드", "사용자 경험", "인터페이스 디자인"],
  },
  {
    id: 4,
    title: "웹 개발의 미래: JAMstack과 서버리스 아키텍처",
    category: "개발",
    author: "박수철",
    date: "2023-07-05",
    status: "published",
    views: 843,
    comments: 6,
    tags: ["웹 개발", "JAMstack", "서버리스", "클라우드 컴퓨팅"],
  },
  {
    id: 5,
    title: "콘텐츠 마케팅: 스토리텔링으로 브랜드 가치 높이기",
    category: "콘텐츠",
    author: "정수진",
    date: "2023-07-18",
    status: "published",
    views: 621,
    comments: 4,
    tags: ["콘텐츠 마케팅", "스토리텔링", "브랜드 전략", "디지털 마케팅"],
  },
  {
    id: 6,
    title: "비즈니스 운영 자동화: 효율성과 생산성 향상 방안",
    category: "운영",
    author: "김나정",
    date: "2023-08-01",
    status: "published",
    views: 532,
    comments: 2,
    tags: ["비즈니스 자동화", "AI", "생산성", "운영 효율화"],
  },
  {
    id: 7,
    title: "AI 기반 고객 서비스 혁신 방안",
    category: "AI",
    author: "김경환",
    date: "2023-08-10",
    status: "draft",
    views: 0,
    comments: 0,
    tags: ["AI", "고객 서비스", "챗봇", "자동화"],
  },
  {
    id: 8,
    title: "데이터 기반 의사결정: 비즈니스 인텔리전스 활용 전략",
    category: "데이터",
    author: "이지훈",
    date: "2023-08-15",
    status: "draft",
    views: 0,
    comments: 0,
    tags: ["데이터 분석", "비즈니스 인텔리전스", "의사결정", "데이터 시각화"],
  },
]

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [authorFilter, setAuthorFilter] = useState("all")
  const [sortField, setSortField] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState("table")
  const itemsPerPage = 5

  // 필터링된 포스트 목록
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesAuthor = authorFilter === "all" || post.author === authorFilter

    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor
  })

  // 정렬
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortField === "title") {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sortField === "views") {
      return sortOrder === "asc" ? a.views - b.views : b.views - a.views
    } else if (sortField === "comments") {
      return sortOrder === "asc" ? a.comments - b.comments : b.comments - a.comments
    }
    return 0
  })

  // 페이지네이션
  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + itemsPerPage)

  // 카테고리 목록 (중복 제거)
  const categories = ["all", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

  // 작성자 목록 (중복 제거)
  const authors = ["all", ...Array.from(new Set(blogPosts.map((post) => post.author)))]

  // 포스트 삭제 처리
  const handleDeletePost = () => {
    if (!selectedPost) return

    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
    console.log(`Deleting post: ${selectedPost.id}`)

    // 삭제 후 상태 초기화
    setSelectedPost(null)
    setIsDeleteDialogOpen(false)
  }

  // 정렬 처리
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  // 필터 초기화
  const resetFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setStatusFilter("all")
    setAuthorFilter("all")
    setSortField("date")
    setSortOrder("desc")
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-light">블로그 포스트 관리</h1>
        <p className="text-muted-foreground">블로그 포스트를 관리하고 새 포스트를 작성하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-4">
            <CardTitle className="text-sm font-medium">총 포스트</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl md:text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              발행됨: {blogPosts.filter((p) => p.status === "published").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-4">
            <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl md:text-2xl font-bold">
              {blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              평균: {Math.round(blogPosts.reduce((sum, post) => sum + post.views, 0) / blogPosts.length)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-4">
            <CardTitle className="text-sm font-medium">총 댓글</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl md:text-2xl font-bold">
              {blogPosts.reduce((sum, post) => sum + post.comments, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              평균: {(blogPosts.reduce((sum, post) => sum + post.comments, 0) / blogPosts.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-4">
            <CardTitle className="text-sm font-medium">카테고리</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl md:text-2xl font-bold">{categories.length - 1}</div>
            <p className="text-xs text-muted-foreground">작성자: {authors.length - 1}명</p>
          </CardContent>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="제목, 작성자 또는 태그 검색..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="grid grid-cols-2 md:flex md:flex-row gap-2 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[130px]">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "모든 카테고리" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[130px]">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="published">발행됨</SelectItem>
                  <SelectItem value="draft">임시저장</SelectItem>
                </SelectContent>
              </Select>
              <Select value={authorFilter} onValueChange={setAuthorFilter}>
                <SelectTrigger className="w-full md:w-[130px]">
                  <SelectValue placeholder="작성자" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author} value={author}>
                      {author === "all" ? "모든 작성자" : author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href="/admin/dashboard/posts/new" className="w-full md:w-auto">
                <Button className="w-full bg-point hover:bg-point/90">
                  <Plus className="mr-2 h-4 w-4" />새 포스트
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 필터 요약 및 정렬 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* 필터 요약 */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {(searchTerm || categoryFilter !== "all" || statusFilter !== "all" || authorFilter !== "all") && (
              <>
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">필터:</span>

                {searchTerm && (
                  <Badge variant="outline" className="font-normal">
                    검색: {searchTerm}
                    <button
                      className="ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => setSearchTerm("")}
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

                {statusFilter !== "all" && (
                  <Badge variant="outline" className="font-normal">
                    상태: {statusFilter === "published" ? "발행됨" : "임시저장"}
                    <button
                      className="ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => setStatusFilter("all")}
                    >
                      ×
                    </button>
                  </Badge>
                )}

                {authorFilter !== "all" && (
                  <Badge variant="outline" className="font-normal">
                    작성자: {authorFilter}
                    <button
                      className="ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => setAuthorFilter("all")}
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
              </>
            )}
          </div>

          {/* 보기 모드 및 정렬 */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Tabs value={viewMode} onValueChange={setViewMode} className="w-full md:w-auto">
              <div className="flex items-center justify-between gap-2">
                <TabsList className="h-9 w-[140px] grid grid-cols-2">
                  <TabsTrigger value="table" className="flex items-center gap-1">
                    <LayoutList className="h-4 w-4" />
                    <span className="hidden sm:inline">테이블</span>
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="flex items-center gap-1">
                    <LayoutGrid className="h-4 w-4" />
                    <span className="hidden sm:inline">그리드</span>
                  </TabsTrigger>
                </TabsList>

                <Select
                  value={`${sortField}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [field, order] = value.split("-")
                    setSortField(field)
                    setSortOrder(order)
                  }}
                >
                  <SelectTrigger className="w-[130px] md:w-[160px]">
                    <SelectValue placeholder="정렬 기준" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">최신순</SelectItem>
                    <SelectItem value="date-asc">오래된순</SelectItem>
                    <SelectItem value="title-asc">제목 (오름차순)</SelectItem>
                    <SelectItem value="title-desc">제목 (내림차순)</SelectItem>
                    <SelectItem value="views-desc">조회수 (높은순)</SelectItem>
                    <SelectItem value="views-asc">조회수 (낮은순)</SelectItem>
                    <SelectItem value="comments-desc">댓글 (많은순)</SelectItem>
                    <SelectItem value="comments-asc">댓글 (적은순)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 포스트 목록 */}
              <TabsContent value="table" className="mt-4 w-full">
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">ID</TableHead>
                          <TableHead>
                            <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                              제목
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead className="hidden md:table-cell">카테고리</TableHead>
                          <TableHead className="hidden md:table-cell">작성자</TableHead>
                          <TableHead className="hidden md:table-cell">
                            <div className="flex items-center cursor-pointer" onClick={() => handleSort("date")}>
                              날짜
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center cursor-pointer" onClick={() => handleSort("views")}>
                              조회수
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead>상태</TableHead>
                          <TableHead className="text-right">작업</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedPosts.length > 0 ? (
                          paginatedPosts.map((post) => (
                            <TableRow key={post.id}>
                              <TableCell className="font-medium">{post.id}</TableCell>
                              <TableCell className="max-w-[180px] md:max-w-[300px] truncate">
                                <div className="font-medium">{post.title}</div>
                                <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                                  {post.tags.map((tag, index) => (
                                    <span key={index}>
                                      #{tag}
                                      {index < post.tags.length - 1 ? ", " : ""}
                                    </span>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{post.category}</TableCell>
                              <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                              <TableCell className="hidden md:table-cell">{post.date}</TableCell>
                              <TableCell>{post.views.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={post.status === "published" ? "default" : "secondary"}
                                  className={post.status === "published" ? "bg-green-500" : ""}
                                >
                                  {post.status === "published" ? "발행됨" : "임시저장"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">메뉴 열기</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Link href={`/blog/${post.id}`} className="flex items-center w-full">
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>보기</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Link
                                        href={`/admin/dashboard/posts/${post.id}/edit`}
                                        className="flex items-center w-full"
                                      >
                                        <Edit className="mr-2 h-4 w-4" />
                                        <span>편집</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => {
                                        setSelectedPost(post)
                                        setIsDeleteDialogOpen(true)
                                      }}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>삭제</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                              {searchTerm ||
                              categoryFilter !== "all" ||
                              statusFilter !== "all" ||
                              authorFilter !== "all"
                                ? "검색 결과가 없습니다."
                                : "포스트가 없습니다."}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="grid" className="mt-4">
                {paginatedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paginatedPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:border-point/30 transition-all duration-300">
                        <div className="aspect-video relative bg-muted">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FileText className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge
                              variant={post.status === "published" ? "default" : "secondary"}
                              className={post.status === "published" ? "bg-green-500" : ""}
                            >
                              {post.status === "published" ? "발행됨" : "임시저장"}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="p-3 md:p-4">
                          <CardTitle className="text-base md:text-lg line-clamp-1">{post.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1 text-xs">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                            <span>•</span>
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-3 md:p-4 pt-0">
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}\
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs px-2 py-1 bg-secondary/50 rounded-full">{post.category}</span>
                            </div>
                          </div>
                        </CardContent>
                        <Separator />
                        <div className="p-3 md:p-4 flex justify-between">
                          <Link href={`/blog/${post.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs md:text-sm">
                              <Eye className="h-3 w-3 mr-1 md:h-4 md:w-4 md:mr-2" />
                              보기
                            </Button>
                          </Link>
                          <div className="flex gap-1 md:gap-2">
                            <Link href={`/admin/dashboard/posts/${post.id}/edit`}>
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs md:text-sm">
                                <Edit className="h-3 w-3 mr-1 md:h-4 md:w-4 md:mr-2" />
                                편집
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs md:text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                setSelectedPost(post)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-3 w-3 mr-1 md:h-4 md:w-4 md:mr-2" />
                              삭제
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12 bg-secondary/20 rounded-lg border border-border/20">
                    <FileText className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">포스트가 없습니다</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || categoryFilter !== "all" || statusFilter !== "all" || authorFilter !== "all"
                        ? "검색 조건에 맞는 포스트가 없습니다."
                        : "등록된 포스트가 없습니다."}
                    </p>
                    <Link href="/admin/dashboard/posts/new">
                      <Button className="bg-point hover:bg-point/90">
                        <Plus className="mr-2 h-4 w-4" />새 포스트 작성
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      {filteredPosts.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            총 {filteredPosts.length}개 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPosts.length)}
            개 표시
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

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>포스트 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 포스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-red-500 hover:bg-red-600">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


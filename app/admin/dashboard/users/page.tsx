"use client"

import { useState } from "react"
import { useData } from "@/lib/hooks/use-swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  Shield,
  User,
  Calendar,
  Mail,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Key,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function UserManagementPage() {
  const { data: users, isLoading, mutate } = useData("/api/users")
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [viewMode, setViewMode] = useState("table")
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "author",
    name: "",
    isActive: true,
  })
  const itemsPerPage = 6

  // 필터링된 사용자 목록
  const filteredUsers = users
    ? users.filter((user: any) => {
        const matchesSearch =
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === "all" || user.role === roleFilter

        return matchesSearch && matchesRole
      })
    : []

  // 정렬
  const sortedUsers = [...filteredUsers].sort((a: any, b: any) => {
    if (sortField === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortField === "username") {
      return sortOrder === "asc" ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username)
    } else if (sortField === "createdAt") {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    }
    return 0
  })

  // 페이지네이션
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage)

  // 새 사용자 추가 처리 함수
  const handleAddUser = async () => {
    // 비밀번호 확인
    if (newUser.password !== newUser.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
    console.log("Adding new user:", newUser)

    // 모의 추가 처리 (실제 구현에서는 API 호출로 대체)
    const addedUser = {
      id: users.length + 1,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
      createdAt: new Date().toISOString().split("T")[0],
      isActive: newUser.isActive,
      lastLogin: "-",
    }

    // 사용자 목록 업데이트
    mutate([...users, addedUser], false)

    // 다이얼로그 닫기 및 입력 초기화
    setIsAddUserDialogOpen(false)
    setNewUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "author",
      name: "",
      isActive: true,
    })
  }

  // 사용자 편집 처리 함수
  const handleEditUser = async () => {
    if (!selectedUser) return

    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
    console.log("Updating user:", selectedUser)

    // 모의 업데이트 처리 (실제 구현에서는 API 호출로 대체)
    const updatedUsers = users.map((user: any) => (user.id === selectedUser.id ? selectedUser : user))

    // 사용자 목록 업데이트
    mutate(updatedUsers, false)

    // 다이얼로그 닫기 및 선택 초기화
    setIsEditUserDialogOpen(false)
    setSelectedUser(null)
  }

  // 사용자 삭제 처리 함수
  const handleDeleteUser = async () => {
    if (!selectedUser) return

    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
    console.log("Deleting user:", selectedUser)

    // 모의 삭제 처리 (실제 구현에서는 API 호출로 대체)
    const updatedUsers = users.filter((user: any) => user.id !== selectedUser.id)

    // 사용자 목록 업데이트
    mutate(updatedUsers, false)

    // 다이얼로그 닫기 및 선택 초기화
    setIsDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  // 비밀번호 재설정 처리 함수
  const handleResetPassword = async () => {
    if (!selectedUser) return

    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
    console.log("Resetting password for user:", selectedUser)

    // 다이얼로그 닫기
    setIsResetPasswordDialogOpen(false)

    // 성공 메시지
    alert(`${selectedUser.name}님의 비밀번호가 재설정되었습니다. 임시 비밀번호가 이메일로 전송되었습니다.`)
  }

  // 역할에 따른 배지 색상 및 텍스트
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500">관리자</Badge>
      case "editor":
        return <Badge className="bg-blue-500">에디터</Badge>
      case "author":
        return <Badge className="bg-green-500">작성자</Badge>
      default:
        return <Badge variant="outline">알 수 없음</Badge>
    }
  }

  // 정렬 처리
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  // 필터 초기화
  const resetFilters = () => {
    setSearchTerm("")
    setRoleFilter("all")
    setSortField("name")
    setSortOrder("asc")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-light">사용자 관리</h1>
        <p className="text-muted-foreground">관리자, 에디터, 작성자 등의 사용자를 관리하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              활성 사용자: {users?.filter((u: any) => u.isActive).length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">관리자</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.filter((u: any) => u.role === "admin").length || 0}</div>
            <p className="text-xs text-muted-foreground">
              에디터: {users?.filter((u: any) => u.role === "editor").length || 0}, 작성자:{" "}
              {users?.filter((u: any) => u.role === "author").length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">최근 로그인</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium truncate">관리자</div>
            <p className="text-xs text-muted-foreground">오늘 10:30</p>
          </CardContent>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="사용자 검색..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="역할" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 역할</SelectItem>
                <SelectItem value="admin">관리자</SelectItem>
                <SelectItem value="editor">에디터</SelectItem>
                <SelectItem value="author">작성자</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={setViewMode} className="w-[120px]">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="table" className="px-2">
                    <div className="flex flex-col gap-0.5 items-start">
                      <div className="w-4 h-1 bg-current rounded-sm"></div>
                      <div className="w-4 h-1 bg-current rounded-sm"></div>
                      <div className="w-4 h-1 bg-current rounded-sm"></div>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="px-2">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-point hover:bg-point/90">
                  <Plus className="mr-2 h-4 w-4" />새 사용자 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>새 사용자 추가</DialogTitle>
                  <DialogDescription>새로운 사용자 계정을 생성합니다. 모든 필드를 입력해주세요.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="홍길동"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">사용자 이름</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      placeholder="hong"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="hong@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">역할</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="역할 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">관리자</SelectItem>
                        <SelectItem value="editor">에디터</SelectItem>
                        <SelectItem value="author">작성자</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    />
                    {newUser.password && newUser.confirmPassword && newUser.password !== newUser.confirmPassword && (
                      <p className="text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={newUser.isActive}
                      onCheckedChange={(checked) => setNewUser({ ...newUser, isActive: checked })}
                    />
                    <Label htmlFor="isActive">계정 활성화</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleAddUser}
                    disabled={
                      !newUser.username ||
                      !newUser.email ||
                      !newUser.password ||
                      !newUser.confirmPassword ||
                      newUser.password !== newUser.confirmPassword
                    }
                  >
                    추가
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 필터 요약 */}
        {(searchTerm || roleFilter !== "all") && (
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

            {roleFilter !== "all" && (
              <Badge variant="outline" className="font-normal">
                역할: {roleFilter === "admin" ? "관리자" : roleFilter === "editor" ? "에디터" : "작성자"}
                <button
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setRoleFilter("all")}
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

        {/* 사용자 목록 */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsContent value="table" className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                        이름
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("username")}>
                        사용자 이름
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">이메일</TableHead>
                    <TableHead>역할</TableHead>
                    <TableHead className="hidden md:table-cell">
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("createdAt")}>
                        생성일
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">상태</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        로딩 중...
                      </TableCell>
                    </TableRow>
                  ) : paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?text=${user.name.charAt(0)}`} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.createdAt}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.isActive ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              활성
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                              비활성
                            </Badge>
                          )}
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
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsEditUserDialogOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                편집
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsResetPasswordDialogOpen(true)
                                }}
                              >
                                <Key className="mr-2 h-4 w-4" />
                                비밀번호 재설정
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        {searchTerm || roleFilter !== "all" ? "검색 결과가 없습니다." : "사용자가 없습니다."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="grid" className="mt-0">
            {isLoading ? (
              <div className="text-center py-8">로딩 중...</div>
            ) : paginatedUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedUsers.map((user: any) => (
                  <Card key={user.id} className="overflow-hidden hover:border-point/30 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?text=${user.name.charAt(0)}`} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{user.name}</CardTitle>
                            <CardDescription className="text-xs">@{user.username}</CardDescription>
                          </div>
                        </div>
                        {getRoleBadge(user.role)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>가입일: {user.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>상태: {user.isActive ? "활성" : "비활성"}</span>
                        </div>
                      </div>
                    </CardContent>
                    <Separator />
                    <div className="p-3 flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user)
                          setIsEditUserDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        편집
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setSelectedUser(user)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        삭제
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary/20 rounded-lg border border-border/20">
                <User className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">사용자가 없습니다</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || roleFilter !== "all"
                    ? "검색 조건에 맞는 사용자가 없습니다."
                    : "등록된 사용자가 없습니다."}
                </p>
                <Button className="bg-point hover:bg-point/90" onClick={() => setIsAddUserDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />새 사용자 추가
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* 페이지네이션 */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            총 {filteredUsers.length}개 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)}
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

      {/* 사용자 편집 다이얼로그 */}
      {selectedUser && (
        <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>사용자 편집</DialogTitle>
              <DialogDescription>사용자 정보를 수정합니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">이름</Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-username">사용자 이름</Label>
                <Input
                  id="edit-username"
                  value={selectedUser.username}
                  onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">이메일</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">역할</Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="역할 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">관리자</SelectItem>
                    <SelectItem value="editor">에디터</SelectItem>
                    <SelectItem value="author">작성자</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-isActive"
                  checked={selectedUser.isActive}
                  onCheckedChange={(checked) => setSelectedUser({ ...selectedUser, isActive: checked })}
                />
                <Label htmlFor="edit-isActive">계정 활성화</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleEditUser} disabled={!selectedUser.username || !selectedUser.email}>
                저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 사용자 삭제 확인 다이얼로그 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>사용자 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 비밀번호 재설정 확인 다이얼로그 */}
      <AlertDialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>비밀번호 재설정</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser?.name}님의 비밀번호를 재설정하시겠습니까? 임시 비밀번호가 이메일로 전송됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetPassword}>재설정</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


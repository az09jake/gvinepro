"use client"

import { useState } from "react"
import { useData } from "@/lib/hooks/use-swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal } from "lucide-react"
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

export default function UserManagement() {
  const { data: users, isLoading, mutate } = useData("/api/users")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "author",
    name: "",
  })

  // 필터링된 사용자 목록
  const filteredUsers = users
    ? users.filter((user: any) => {
        return (
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    : []

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-light">사용자 관리</h1>
        <p className="text-muted-foreground">관리자, 에디터, 작성자 등의 사용자를 관리하세요.</p>
      </div>

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

        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-point hover:bg-point/90">
              <Plus className="h-4 w-4 mr-2" />새 사용자 추가
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

      {/* 사용자 목록 테이블 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>사용자 이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>생성일</TableHead>
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
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
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
                          편집
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
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
                  {searchTerm ? "검색 결과가 없습니다." : "사용자가 없습니다."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
    </div>
  )
}


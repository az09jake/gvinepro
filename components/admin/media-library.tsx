"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Trash2, Search, SortAsc } from "lucide-react"
import { useData } from "@/lib/hooks/use-swr"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MediaLibrary() {
  const { data: mediaLibrary, isLoading, mutate } = useData("/api/media")
  const [searchTerm, setSearchTerm] = useState("")
  const [fileType, setFileType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // 드롭존 설정
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".svg"],
    },
    onDrop: (acceptedFiles) => {
      handleUpload(acceptedFiles)
    },
  })

  // 파일 업로드 처리 함수
  const handleUpload = async (files: File[]) => {
    // 실제 구현에서는 여기에 파일 업로드 API 호출 코드가 들어갑니다.
    console.log("Uploading files:", files)

    // 모의 업로드 처리 (실제 구현에서는 API 호출로 대체)
    const newMedia = files.map((file) => ({
      id: uuidv4(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size,
      dimensions: { width: 800, height: 600 }, // 실제로는 이미지 로드 후 계산해야 함
      uploadedAt: new Date().toISOString().split("T")[0],
    }))

    // 미디어 라이브러리 업데이트
    mutate([...newMedia, ...(mediaLibrary || [])], false)
  }

  // 미디어 삭제 처리 함수
  const handleDelete = async () => {
    if (!selectedMedia) return

    // 실제 구현에서는 여기에 파일 삭제 API 호출 코드가 들어갑니다.
    console.log("Deleting media:", selectedMedia)

    // 모의 삭제 처리 (실제 구현에서는 API 호출로 대체)
    const updatedMedia = mediaLibrary.filter((media: any) => media.id !== selectedMedia.id)

    // 미디어 라이브러리 업데이트
    mutate(updatedMedia, false)

    // 다이얼로그 닫기 및 선택 초기화
    setIsDeleteDialogOpen(false)
    setSelectedMedia(null)
  }

  // 필터링 및 정렬된 미디어 목록
  const filteredMedia = mediaLibrary
    ? mediaLibrary.filter((media: any) => {
        const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = fileType === "all" || media.type.startsWith(fileType)
        return matchesSearch && matchesType
      })
    : []

  // 정렬
  const sortedMedia = [...filteredMedia].sort((a: any, b: any) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
        : new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    } else if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "size") {
      return sortOrder === "asc" ? a.size - b.size : b.size - a.size
    }
    return 0
  })

  // 파일 크기 포맷팅 함수
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const fileIndex = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, fileIndex)).toFixed(2)) + " " + sizes[fileIndex]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-light">미디어 라이브러리</h1>
        <p className="text-muted-foreground">이미지 및 미디어 파일을 관리하세요.</p>
      </div>

      <Tabs defaultValue="library">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="library">미디어 라이브러리</TabsTrigger>
          <TabsTrigger value="upload">업로드</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="mt-4 space-y-4">
          {/* 검색 및 필터 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="파일명 검색..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={fileType} onValueChange={setFileType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="파일 유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 유형</SelectItem>
                  <SelectItem value="image">이미지</SelectItem>
                  <SelectItem value="video">비디오</SelectItem>
                  <SelectItem value="audio">오디오</SelectItem>
                  <SelectItem value="application">문서</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SortAsc className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("date")}>
                    날짜순 {sortBy === "date" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    이름순 {sortBy === "name" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("size")}>
                    크기순 {sortBy === "size" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                    {sortOrder === "asc" ? "내림차순" : "오름차순"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* 미디어 그리드 */}
          {isLoading ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : sortedMedia.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sortedMedia.map((media: any) => (
                <Card
                  key={media.id}
                  className={`overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 ${
                    selectedMedia?.id === media.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedMedia(media)}
                >
                  <div className="aspect-square relative bg-muted">
                    {media.type.startsWith("image") ? (
                      <img
                        src={media.url || "/placeholder.svg"}
                        alt={media.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs truncate">{media.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(media.size)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || fileType !== "all" ? "검색 결과가 없습니다." : "미디어 파일이 없습니다."}
            </div>
          )}

          {/* 선택된 미디어 정보 및 작업 */}
          {selectedMedia && (
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="aspect-video relative bg-muted rounded-md overflow-hidden mb-4">
                      {selectedMedia.type.startsWith("image") ? (
                        <img
                          src={selectedMedia.url || "/placeholder.svg"}
                          alt={selectedMedia.name}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <Button variant="destructive" className="w-full" onClick={() => setIsDeleteDialogOpen(true)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">파일명</Label>
                      <p className="text-sm">{selectedMedia.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">유형</Label>
                      <p className="text-sm">{selectedMedia.type}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">크기</Label>
                      <p className="text-sm">{formatFileSize(selectedMedia.size)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">업로드 날짜</Label>
                      <p className="text-sm">{selectedMedia.uploadedAt}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">URL</Label>
                      <div className="flex mt-1">
                        <Input value={selectedMedia.url} readOnly className="text-xs" />
                        <Button
                          variant="outline"
                          className="ml-2"
                          onClick={() => navigator.clipboard.writeText(selectedMedia.url)}
                        >
                          복사
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-12 text-center transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <input {...getInputProps()} />
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">
              {isDragActive ? "파일을 여기에 놓으세요..." : "파일을 드래그하거나 클릭하여 업로드하세요"}
            </p>
            <p className="text-xs text-muted-foreground mb-4">지원 파일 형식: JPG, PNG, GIF, SVG</p>
            <Button type="button" variant="outline">
              파일 선택
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>미디어 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 미디어 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


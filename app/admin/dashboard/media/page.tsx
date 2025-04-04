"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ImageIcon,
  Trash2,
  Search,
  SortAsc,
  Filter,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Download,
  Copy,
  Link,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function MediaLibraryPage() {
  const { data: mediaLibrary, isLoading, mutate } = useData("/api/media")
  const [searchTerm, setSearchTerm] = useState("")
  const [fileType, setFileType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [viewMode, setViewMode] = useState("grid")

  // 드롭존 설정
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".svg"],
      "video/*": [".mp4", ".webm", ".ogg"],
      "audio/*": [".mp3", ".wav", ".ogg"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      handleUpload(acceptedFiles)
    },
  })

  // 파일 업로드 처리 함수
  const handleUpload = async (files: File[]) => {
    // 실제 구현에서는 여기에 파일 업로드 API 호출 코드가 들어갑니다.
    console.log("Uploading files:", files)

    // 업로드 시작
    setIsUploading(true)
    setUploadProgress(0)

    // 모의 업로드 진행 (실제 구현에서는 API 호출로 대체)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // 모의 업로드 완료 (실제 구현에서는 API 응답 후 처리)
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // 새 미디어 항목 생성
      const newMedia = files.map((file) => {
        const fileType = file.type.split("/")[0]
        const fileExtension = file.name.split(".").pop()

        return {
          id: uuidv4(),
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type,
          size: file.size,
          dimensions: fileType === "image" ? { width: 800, height: 600 } : null, // 실제로는 이미지 로드 후 계산해야 함
          uploadedAt: new Date().toISOString().split("T")[0],
          extension: fileExtension,
        }
      })

      // 미디어 라이브러리 업데이트
      mutate([...newMedia, ...(mediaLibrary || [])], false)

      // 업로드 상태 초기화
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    }, 3000)
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

  // 파일 타입에 따른 아이콘 반환
  const getFileIcon = (type: string) => {
    if (type.startsWith("image")) return <FileImage className="h-12 w-12 text-blue-500" />
    if (type.startsWith("video")) return <FileVideo className="h-12 w-12 text-red-500" />
    if (type.startsWith("audio")) return <FileAudio className="h-12 w-12 text-green-500" />
    return <FileText className="h-12 w-12 text-yellow-500" />
  }

  // 파일 URL 복사
  const copyFileUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    alert("URL이 클립보드에 복사되었습니다.")
  }

  // 필터 초기화
  const resetFilters = () => {
    setSearchTerm("")
    setFileType("all")
    setSortBy("date")
    setSortOrder("desc")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
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

              <Tabs value={viewMode} onValueChange={setViewMode} className="w-[120px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="grid" className="px-2">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="px-2">
                    <div className="flex flex-col gap-0.5 items-start">
                      <div className="w-4 h-1 bg-current rounded-sm"></div>
                      <div className="w-4 h-1 bg-current rounded-sm"></div>
                      <div className="w-4 h-1 bg-current rounded-sm"></div>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* 필터 요약 */}
          {(searchTerm || fileType !== "all") && (
            <div className="flex items-center gap-2 text-sm">
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

              {fileType !== "all" && (
                <Badge variant="outline" className="font-normal">
                  유형:{" "}
                  {fileType === "image"
                    ? "이미지"
                    : fileType === "video"
                      ? "비디오"
                      : fileType === "audio"
                        ? "오디오"
                        : "문서"}
                  <button
                    className="ml-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setFileType("all")}
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

          {/* 미디어 그리드 */}
          {isLoading ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : sortedMedia.length > 0 ? (
            <TabsContent value="grid" className="mt-0">
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
                        <div className="flex items-center justify-center h-full">{getFileIcon(media.type)}</div>
                      )}
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs truncate">{media.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(media.size)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || fileType !== "all" ? "검색 결과가 없습니다." : "미디어 파일이 없습니다."}
            </div>
          )}

          <TabsContent value="list" className="mt-0">
            {sortedMedia.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="px-4 py-2 text-left">파일</th>
                      <th className="px-4 py-2 text-left hidden md:table-cell">유형</th>
                      <th className="px-4 py-2 text-left hidden md:table-cell">크기</th>
                      <th className="px-4 py-2 text-left hidden lg:table-cell">업로드 날짜</th>
                      <th className="px-4 py-2 text-right">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMedia.map((media: any) => (
                      <tr
                        key={media.id}
                        className={`border-t hover:bg-secondary/30 cursor-pointer ${
                          selectedMedia?.id === media.id ? "bg-secondary/50" : ""
                        }`}
                        onClick={() => setSelectedMedia(media)}
                      >
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                              {media.type.startsWith("image") ? (
                                <img
                                  src={media.url || "/placeholder.svg"}
                                  alt={media.name}
                                  className="object-cover w-full h-full rounded"
                                />
                              ) : (
                                getFileIcon(media.type)
                              )}
                            </div>
                            <span className="text-sm truncate max-w-[200px]">{media.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 hidden md:table-cell">
                          <Badge variant="outline">{media.type.split("/")[0]}</Badge>
                        </td>
                        <td className="px-4 py-2 hidden md:table-cell">{formatFileSize(media.size)}</td>
                        <td className="px-4 py-2 hidden lg:table-cell">{media.uploadedAt}</td>
                        <td className="px-4 py-2 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  copyFileUrl(media.url)
                                }}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                URL 복사
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(media.url, "_blank")
                                }}
                              >
                                <Link className="mr-2 h-4 w-4" />새 탭에서 열기
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // 다운로드 로직
                                }}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                다운로드
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedMedia(media)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm || fileType !== "all" ? "검색 결과가 없습니다." : "미디어 파일이 없습니다."}
              </div>
            )}
          </TabsContent>

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
                        <div className="flex items-center justify-center h-full">{getFileIcon(selectedMedia.type)}</div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyFileUrl(selectedMedia.url)}>
                        <Copy className="h-4 w-4 mr-2" />
                        URL 복사
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(selectedMedia.url, "_blank")}>
                        <Link className="h-4 w-4 mr-2" />새 탭에서 열기
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        다운로드
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        삭제
                      </Button>
                    </div>
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
                    {selectedMedia.dimensions && (
                      <div>
                        <Label className="text-xs text-muted-foreground">크기</Label>
                        <p className="text-sm">
                          {selectedMedia.dimensions.width} × {selectedMedia.dimensions.height} 픽셀
                        </p>
                      </div>
                    )}
                    <div>
                      <Label className="text-xs text-muted-foreground">URL</Label>
                      <div className="flex mt-1">
                        <Input value={selectedMedia.url} readOnly className="text-xs" />
                        <Button variant="outline" className="ml-2" onClick={() => copyFileUrl(selectedMedia.url)}>
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
            <p className="text-xs text-muted-foreground mb-4">지원 파일 형식: JPG, PNG, GIF, SVG, MP4, MP3, PDF</p>
            <Button type="button" variant="outline">
              파일 선택
            </Button>
          </div>

          {/* 업로드 진행 상태 */}
          {isUploading && (
            <div className="mt-6 p-4 bg-secondary/30 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">업로드 중...</span>
                <span className="text-sm">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <div className="mt-2 text-xs text-muted-foreground">
                {acceptedFiles.length > 0 && <span>{acceptedFiles.length}개 파일 업로드 중</span>}
              </div>
            </div>
          )}

          {/* 업로드 팁 */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">업로드 팁</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-2">이미지 최적화</h4>
                  <p className="text-xs text-muted-foreground">
                    웹사이트 성능을 위해 이미지는 2MB 이하로 최적화하는 것이 좋습니다. JPG 또는 WebP 형식을 권장합니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-2">파일명 작성</h4>
                  <p className="text-xs text-muted-foreground">
                    파일명에 공백 대신 하이픈(-)이나 밑줄(_)을 사용하고, 한글보다는 영문을 사용하는 것이 좋습니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-2">대용량 파일</h4>
                  <p className="text-xs text-muted-foreground">
                    10MB 이상의 대용량 파일은 외부 스토리지 서비스를 이용하고 링크를 공유하는 것이 좋습니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-2">저작권 주의</h4>
                  <p className="text-xs text-muted-foreground">
                    저작권이 있는 이미지나 미디어 파일을 사용할 때는 적절한 라이센스를 확인하세요.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 스토리지 사용량 */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">스토리지 사용량</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">사용 중: 1.2GB / 5GB</span>
                  <span className="text-sm text-muted-foreground">24%</span>
                </div>
                <Progress value={24} className="h-2" />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">이미지</p>
                    <p className="text-sm font-medium">820MB</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">비디오</p>
                    <p className="text-sm font-medium">350MB</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">오디오</p>
                    <p className="text-sm font-medium">30MB</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">문서</p>
                    <p className="text-sm font-medium">20MB</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    스토리지 정리
                  </Button>
                  <Button variant="outline" size="sm">
                    스토리지 업그레이드
                  </Button>
                </div>
              </CardContent>
            </Card>
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


"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ImageIcon, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import WysiwygEditor from "@/components/admin/wysiwyg-editor"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useData } from "@/lib/hooks/use-swr"

export default function NewPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false)
  const [postData, setPostData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    author: "",
    status: "draft", // draft or published
    featuredImage: null as string | null,
  })

  // 미디어 라이브러리 데이터 가져오기
  const { data: mediaLibrary, isLoading: isMediaLoading } = useData("/api/media")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPostData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setPostData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setPostData((prev) => ({ ...prev, status: checked ? "published" : "draft" }))
  }

  const handleContentChange = (content: string) => {
    setPostData((prev) => ({ ...prev, content }))
  }

  const handleSelectImage = (imageUrl: string) => {
    setPostData((prev) => ({ ...prev, featuredImage: imageUrl }))
    setIsMediaDialogOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
      console.log("Submitting post:", postData)

      // 성공적으로 저장되었다고 가정하고 2초 후 포스트 목록 페이지로 이동
      setTimeout(() => {
        router.push("/admin/dashboard/posts")
      }, 2000)
    } catch (error) {
      console.error("Error saving post:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard/posts" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-light">새 포스트 작성</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="publish" checked={postData.status === "published"} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="publish" className="text-sm">
              {postData.status === "published" ? "발행" : "임시저장"}
            </Label>
          </div>
          <Button type="submit" className="bg-point hover:bg-point/90" disabled={isSubmitting} onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 메인 콘텐츠 영역 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                value={postData.title}
                onChange={handleInputChange}
                placeholder="포스트 제목을 입력하세요"
                className="text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">요약</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={postData.excerpt}
                onChange={handleInputChange}
                placeholder="포스트 요약을 입력하세요"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Tabs defaultValue="write">
                <TabsList className="mb-2">
                  <TabsTrigger value="write">작성</TabsTrigger>
                  <TabsTrigger value="preview">미리보기</TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="mt-0">
                  <WysiwygEditor value={postData.content} onChange={handleContentChange} />
                </TabsContent>
                <TabsContent value="preview" className="mt-0">
                  <Card>
                    <CardContent className="p-4 min-h-[400px] prose dark:prose-invert max-w-none">
                      {postData.content ? (
                        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
                      ) : (
                        <p className="text-muted-foreground">미리보기할 내용이 없습니다.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* 사이드바 영역 */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select value={postData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="마케팅">마케팅</SelectItem>
                      <SelectItem value="디자인">디자인</SelectItem>
                      <SelectItem value="개발">개발</SelectItem>
                      <SelectItem value="콘텐츠">콘텐츠</SelectItem>
                      <SelectItem value="운영">운영</SelectItem>
                      <SelectItem value="데이터">데이터</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">태그</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={postData.tags}
                    onChange={handleInputChange}
                    placeholder="쉼표로 구분하여 입력"
                  />
                  <p className="text-xs text-muted-foreground">쉼표로 구분하여 여러 태그를 입력할 수 있습니다.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">작성자</Label>
                  <Select value={postData.author} onValueChange={(value) => handleSelectChange("author", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="작성자 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="김경환">김경환</SelectItem>
                      <SelectItem value="최슬기">최슬기</SelectItem>
                      <SelectItem value="박수철">박수철</SelectItem>
                      <SelectItem value="정수진">정수진</SelectItem>
                      <SelectItem value="김영주">김영주</SelectItem>
                      <SelectItem value="김나정">김나정</SelectItem>
                      <SelectItem value="이지훈">이지훈</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="featuredImage">대표 이미지</Label>
                  <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                      {postData.featuredImage ? (
                        <div className="space-y-2">
                          <div className="aspect-video rounded-md overflow-hidden bg-muted">
                            <img
                              src={postData.featuredImage || "/placeholder.svg"}
                              alt="대표 이미지"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setPostData((prev) => ({ ...prev, featuredImage: null }))}
                          >
                            이미지 변경
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">이미지를 선택하세요</p>
                          <DialogTrigger asChild>
                            <Button type="button" variant="outline" size="sm">
                              미디어 라이브러리
                            </Button>
                          </DialogTrigger>
                        </div>
                      )}
                    </div>
                    <DialogContent className="sm:max-w-[725px]">
                      <div className="grid grid-cols-3 gap-4 py-4">
                        {isMediaLoading ? (
                          <div className="col-span-3 text-center py-8">로딩 중...</div>
                        ) : (
                          mediaLibrary?.map((media: any) => (
                            <div
                              key={media.id}
                              className="border rounded-md p-2 cursor-pointer hover:border-primary"
                              onClick={() => handleSelectImage(media.url)}
                            >
                              <div className="aspect-square relative overflow-hidden rounded-md bg-muted mb-2">
                                <img
                                  src={media.url || "/placeholder.svg"}
                                  alt={media.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <p className="text-xs truncate">{media.name}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}


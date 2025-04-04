"use client"

import { useRef, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, Link2 } from "lucide-react"
import { useData } from "@/lib/hooks/use-swr"

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  height?: number
}

export default function WysiwygEditor({ value, onChange, height = 500 }: WysiwygEditorProps) {
  const editorRef = useRef<any>(null)
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [linkTitle, setLinkTitle] = useState("")
  const [linkTarget, setLinkTarget] = useState("_self")

  // 미디어 라이브러리 데이터 가져오기
  const { data: mediaLibrary, isLoading } = useData("/api/media")

  // 이미지 삽입 함수
  const handleInsertImage = (imageUrl: string) => {
    if (editorRef.current) {
      editorRef.current.execCommand("mceInsertContent", false, `<img src="${imageUrl}" alt="이미지" />`)
      setIsMediaDialogOpen(false)
    }
  }

  // 링크 삽입 함수
  const handleInsertLink = () => {
    if (editorRef.current) {
      const html = `<a href="${linkUrl}" title="${linkTitle}" target="${linkTarget}">${linkText || linkUrl}</a>`
      editorRef.current.execCommand("mceInsertContent", false, html)
      setIsLinkDialogOpen(false)

      // 입력 필드 초기화
      setLinkUrl("")
      setLinkText("")
      setLinkTitle("")
      setLinkTarget("_self")
    }
  }

  return (
    <div className="wysiwyg-editor">
      <Editor
        apiKey="no-api-key" // 실제 구현 시 TinyMCE API 키를 사용해야 합니다
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        value={value}
        onEditorChange={onChange}
        init={{
          height,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Pretendard,Arial,sans-serif; font-size:16px }",
          skin: "oxide-dark",
          content_css: "dark",
        }}
      />

      <div className="flex items-center gap-2 mt-2">
        {/* 이미지 추가 버튼 및 다이얼로그 */}
        <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 mr-2" />
              이미지 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>미디어 라이브러리</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="library">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="library">미디어 라이브러리</TabsTrigger>
                <TabsTrigger value="upload">업로드</TabsTrigger>
              </TabsList>
              <TabsContent value="library" className="mt-4">
                {isLoading ? (
                  <div className="text-center py-8">로딩 중...</div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {mediaLibrary?.map((media: any) => (
                      <div
                        key={media.id}
                        className="border rounded-md p-2 cursor-pointer hover:border-primary"
                        onClick={() => handleInsertImage(media.url)}
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
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="upload" className="mt-4">
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">이미지를 드래그하거나 클릭하여 업로드</p>
                  <Input id="media-upload" type="file" accept="image/*" className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("media-upload")?.click()}
                  >
                    파일 선택
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* 링크 추가 버튼 및 다이얼로그 */}
        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <Link2 className="h-4 w-4 mr-2" />
              링크 추가
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>링크 추가</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="text">텍스트</Label>
                <Input
                  id="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="링크 텍스트"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">타이틀</Label>
                <Input
                  id="title"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  placeholder="링크 타이틀 (선택사항)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">타겟</Label>
                <select
                  id="target"
                  value={linkTarget}
                  onChange={(e) => setLinkTarget(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="_self">현재 창</option>
                  <option value="_blank">새 창</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={handleInsertLink} disabled={!linkUrl}>
                삽입
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Calendar, Mail, User, MessageSquare, Clock, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface InquiryDetailModalProps {
  inquiry: any
  isOpen: boolean
  onClose: () => void
  onStatusChange: (id: number, status: string) => void
  onReply: (id: number, reply: string) => void
}

export default function InquiryDetailModal({
  inquiry,
  isOpen,
  onClose,
  onStatusChange,
  onReply,
}: InquiryDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [replyText, setReplyText] = useState("")

  if (!inquiry) return null

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

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(inquiry.id, replyText)
      setReplyText("")
      // 응답 완료로 상태 변경
      onStatusChange(inquiry.id, "answered")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>문의 내용 상세 정보</DialogTitle>
          <DialogDescription>ID: {inquiry.id}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">기본 정보</TabsTrigger>
            <TabsTrigger value="reply">응답</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{inquiry.subject}</h3>
              {getStatusBadge(inquiry.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{inquiry.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{inquiry.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">접수일: {inquiry.date}</span>
              </div>
            </div>

            <div className="bg-secondary/30 p-4 rounded-md">
              <div className="flex items-start space-x-2 mb-2">
                <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <h4 className="text-sm font-medium">문의 내용</h4>
              </div>
              <p className="text-sm whitespace-pre-line">{inquiry.message}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">처리 상태 변경</h4>
              <div className="flex space-x-2">
                <Button
                  variant={inquiry.status === "answered" ? "default" : "outline"}
                  size="sm"
                  className={inquiry.status === "answered" ? "bg-blue-500 hover:bg-blue-600" : ""}
                  onClick={() => onStatusChange(inquiry.id, "answered")}
                >
                  응답 완료
                </Button>
                <Button
                  variant={inquiry.status === "reviewing" ? "default" : "outline"}
                  size="sm"
                  className={inquiry.status === "reviewing" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                  onClick={() => onStatusChange(inquiry.id, "reviewing")}
                >
                  검토 중
                </Button>
                <Button
                  variant={inquiry.status === "unanswered" ? "default" : "outline"}
                  size="sm"
                  className={inquiry.status === "unanswered" ? "bg-red-500 hover:bg-red-600" : ""}
                  onClick={() => onStatusChange(inquiry.id, "unanswered")}
                >
                  미응답
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reply" className="space-y-4 mt-4">
            <div className="bg-secondary/30 p-4 rounded-md">
              <div className="flex items-start space-x-2 mb-2">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <h4 className="text-sm font-medium">응답 내역</h4>
              </div>
              {inquiry.replies && inquiry.replies.length > 0 ? (
                <div className="space-y-4">
                  {inquiry.replies.map((reply: any, index: number) => (
                    <div key={index} className="bg-secondary/50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">관리자</span>
                        <span className="text-xs text-muted-foreground">{reply.date}</span>
                      </div>
                      <p className="text-sm">{reply.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">아직 응답 내역이 없습니다.</p>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">응답 작성</h4>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="고객에게 보낼 응답을 작성하세요..."
                className="min-h-[150px] bg-secondary/30"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-point hover:bg-point/90"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  응답 보내기
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}


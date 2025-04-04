"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Calendar, Mail, Phone, Building, User, FileText, Clock } from "lucide-react"

interface SubscriptionDetailModalProps {
  subscription: any
  isOpen: boolean
  onClose: () => void
  onStatusChange: (id: number, status: string) => void
}

export default function SubscriptionDetailModal({
  subscription,
  isOpen,
  onClose,
  onStatusChange,
}: SubscriptionDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details")

  if (!subscription) return null

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>구독 신청 상세 정보</DialogTitle>
          <DialogDescription>ID: {subscription.id}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">기본 정보</TabsTrigger>
            <TabsTrigger value="message">메시지</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{subscription.name}</h3>
              {getStatusBadge(subscription.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{subscription.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{subscription.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{subscription.businessType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{getServiceTypeText(subscription.serviceType)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">신청일: {subscription.date}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">처리 상태 변경</h4>
              <div className="flex space-x-2">
                <Button
                  variant={subscription.status === "completed" ? "default" : "outline"}
                  size="sm"
                  className={subscription.status === "completed" ? "bg-green-500 hover:bg-green-600" : ""}
                  onClick={() => onStatusChange(subscription.id, "completed")}
                >
                  처리 완료
                </Button>
                <Button
                  variant={subscription.status === "pending" ? "default" : "outline"}
                  size="sm"
                  className={subscription.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                  onClick={() => onStatusChange(subscription.id, "pending")}
                >
                  검토 중
                </Button>
                <Button
                  variant={subscription.status === "rejected" ? "default" : "outline"}
                  size="sm"
                  className={subscription.status === "rejected" ? "bg-red-500 hover:bg-red-600" : ""}
                  onClick={() => onStatusChange(subscription.id, "rejected")}
                >
                  거절됨
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="message" className="space-y-4 mt-4">
            <div className="bg-secondary/30 p-4 rounded-md">
              <div className="flex items-start space-x-2 mb-2">
                <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <h4 className="text-sm font-medium">고객 메시지</h4>
              </div>
              <p className="text-sm whitespace-pre-line">{subscription.message || "메시지가 없습니다."}</p>
            </div>

            <div className="bg-secondary/30 p-4 rounded-md">
              <div className="flex items-start space-x-2 mb-2">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <h4 className="text-sm font-medium">처리 내역</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">2023-08-15 14:30</span> - 구독 신청 접수
                </div>
                {subscription.status !== "pending" && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">2023-08-16 09:15</span> -
                    {subscription.status === "completed" ? " 처리 완료됨" : " 거절됨"}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">메모 추가</h4>
              <textarea
                className="w-full min-h-[100px] p-2 text-sm bg-secondary/30 border border-border rounded-md"
                placeholder="내부 메모를 입력하세요..."
              ></textarea>
              <Button size="sm" className="bg-point hover:bg-point/90">
                메모 저장
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import { DashboardWidget } from "@/components/admin/dashboard-widget"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, ExternalLink } from "lucide-react"
import Link from "next/link"

// 샘플 데이터
const posts = [
  {
    id: "1",
    title: "GVine PRO 신규 기능 업데이트 안내",
    excerpt: "GVine PRO의 새로운 기능과 개선 사항을 소개합니다.",
    author: {
      name: "관리자",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "공지사항",
    publishedAt: "2023-04-01T09:00:00Z",
    status: "published",
  },
  {
    id: "2",
    title: "2023년 디지털 마케팅 트렌드",
    excerpt: "올해의 주요 디지털 마케팅 트렌드와 전략을 알아봅니다.",
    author: {
      name: "마케팅팀",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "마케팅",
    publishedAt: "2023-03-28T14:30:00Z",
    status: "published",
  },
  {
    id: "3",
    title: "효과적인 콘텐츠 제작 가이드",
    excerpt: "사용자의 관심을 끄는 콘텐츠를 제작하는 방법을 알아봅니다.",
    author: {
      name: "콘텐츠팀",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "콘텐츠",
    publishedAt: "2023-03-25T11:15:00Z",
    status: "draft",
  },
  {
    id: "4",
    title: "SEO 최적화 전략",
    excerpt: "검색 엔진 최적화를 위한 효과적인 전략과 팁을 소개합니다.",
    author: {
      name: "SEO 전문가",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    category: "SEO",
    publishedAt: "2023-03-20T10:00:00Z",
    status: "published",
  },
]

interface RecentPostsWidgetProps {
  id: string
  onRemove?: (id: string) => void
  onResize?: (id: string, size: "sm" | "md" | "lg" | "xl") => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function RecentPostsWidget({ id, onRemove, onResize, size = "md" }: RecentPostsWidgetProps) {
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <DashboardWidget
      id={id}
      title="최근 게시물"
      description="최근에 작성된 게시물을 확인합니다."
      onRemove={onRemove}
      onResize={onResize}
      size={size}
      footer={
        <Button variant="outline" className="w-full" asChild>
          <Link href="/admin/dashboard/posts">
            모든 게시물 보기
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col space-y-2 pb-4 border-b last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <Link href={`/admin/dashboard/posts/${post.id}`} className="font-medium hover:underline">
                {post.title}
              </Link>
              <Badge variant={post.status === "published" ? "default" : "outline"}>
                {post.status === "published" ? "게시됨" : "초안"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
                <Badge variant="secondary" className="px-1.5 py-0 text-xs">
                  {post.category}
                </Badge>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  )
}


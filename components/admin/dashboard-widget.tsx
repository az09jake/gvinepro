"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Grip, MoreHorizontal, Maximize2, Minimize2, X, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardWidgetProps {
  id: string
  title: string
  description?: string
  size?: "sm" | "md" | "lg" | "xl"
  onRemove?: (id: string) => void
  onResize?: (id: string, size: "sm" | "md" | "lg" | "xl") => void
  onRefresh?: (id: string) => void
  className?: string
  children: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
}

export function DashboardWidget({
  id,
  title,
  description,
  size = "md",
  onRemove,
  onResize,
  onRefresh,
  className,
  children,
  footer,
  isLoading = false,
}: DashboardWidgetProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    if (onRefresh) {
      setIsRefreshing(true)
      onRefresh(id)
      // 실제 구현에서는 onRefresh가 Promise를 반환하고 완료 시 setIsRefreshing(false)를 호출해야 합니다.
      setTimeout(() => setIsRefreshing(false), 1000)
    }
  }

  const handleResize = (newSize: "sm" | "md" | "lg" | "xl") => {
    if (onResize) {
      onResize(id, newSize)
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove(id)
    }
  }

  return (
    <Card className={cn("transition-all duration-200", className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grip className="h-4 w-4 text-muted-foreground cursor-move" />
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isRefreshing && <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">위젯 메뉴 열기</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span>새로고침</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleResize("sm")}>
                  <Minimize2 className="mr-2 h-4 w-4" />
                  <span>작게</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleResize("md")}>
                  <Minimize2 className="mr-2 h-4 w-4" />
                  <span>중간</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleResize("lg")}>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  <span>크게</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleResize("xl")}>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  <span>전체</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRemove} className="text-red-500 focus:text-red-500">
                  <X className="mr-2 h-4 w-4" />
                  <span>제거</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn("p-4 pt-2", isLoading && "opacity-60")}>{children}</CardContent>
      {footer && <CardFooter className="p-4 pt-0">{footer}</CardFooter>}
    </Card>
  )
}


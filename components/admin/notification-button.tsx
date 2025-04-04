"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NotificationCenter } from "@/components/admin/notification-center"

export function NotificationButton() {
  const [unreadCount, setUnreadCount] = useState(3)
  const [open, setOpen] = useState(false)

  // 알림 읽음 처리 시 카운트 업데이트
  const handleNotificationRead = () => {
    setUnreadCount(0)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] bg-point text-white text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <NotificationCenter onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}


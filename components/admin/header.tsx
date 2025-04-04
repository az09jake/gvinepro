"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { NotificationButton } from "@/components/admin/notification-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, Search, User, Settings, LogOut, HelpCircle } from "lucide-react"

interface AdminHeaderProps {
  onMobileMenuToggle: () => void
}

export function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-background/80 backdrop-blur-md px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onMobileMenuToggle}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="hidden md:block">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">GVine PRO</span>
          <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">관리자</span>
        </Link>
      </div>

      <div className="flex-1 md:grow-0 md:w-[200px] lg:w-[300px]">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="검색..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <ThemeToggle />

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <NotificationButton />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-point/10">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="관리자" />
                <AvatarFallback>관리자</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>프로필</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>설정</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}


"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Mail,
  ImageIcon,
  Shield,
  Activity,
  Database,
  LineChart,
  X,
} from "lucide-react"
import { AdminHeader } from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { name: "대시보드", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "게시물 관리", href: "/admin/dashboard/posts", icon: <FileText className="h-5 w-5" /> },
    { name: "미디어 관리", href: "/admin/dashboard/media", icon: <ImageIcon className="h-5 w-5" /> },
    { name: "구독 관리", href: "/admin/dashboard/subscriptions", icon: <Mail className="h-5 w-5" /> },
    { name: "문의 관리", href: "/admin/dashboard/inquiries", icon: <Mail className="h-5 w-5" /> },
    { name: "사용자 관리", href: "/admin/dashboard/users", icon: <Users className="h-5 w-5" /> },
    { name: "분석", href: "/admin/dashboard/analytics", icon: <LineChart className="h-5 w-5" /> },
    { name: "시스템 로그", href: "/admin/dashboard/logs", icon: <Activity className="h-5 w-5" /> },
    { name: "백업 및 복원", href: "/admin/dashboard/backup", icon: <Database className="h-5 w-5" /> },
    { name: "성능 모니터링", href: "/admin/dashboard/performance", icon: <Activity className="h-5 w-5" /> },
    { name: "보안 설정", href: "/admin/dashboard/security", icon: <Shield className="h-5 w-5" /> },
    { name: "설정", href: "/admin/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // 화면 크기가 변경될 때 모바일 메뉴 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 경로가 변경될 때 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-background">
      {/* 데스크톱 사이드바 */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-background/80 backdrop-blur-md border-r border-border/40">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold text-gray-800">GVine PRO</span>
              <span className="ml-2 text-sm font-medium text-gray-500">관리자</span>
            </Link>
          </div>
          <ScrollArea className="flex-grow">
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-point/10 text-point"
                          : "text-muted-foreground hover:bg-background hover:text-foreground"
                      }`}
                    >
                      <div
                        className={`mr-3 ${isActive ? "text-point" : "text-muted-foreground group-hover:text-foreground"}`}
                      >
                        {item.icon}
                      </div>
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* 모바일 사이드바 */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-semibold text-gray-800">GVine PRO</span>
                <span className="ml-2 text-sm font-medium text-gray-500">관리자</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="flex-grow">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-point/10 text-point"
                          : "text-muted-foreground hover:bg-background hover:text-foreground"
                      }`}
                    >
                      <div
                        className={`mr-3 ${isActive ? "text-point" : "text-muted-foreground group-hover:text-foreground"}`}
                      >
                        {item.icon}
                      </div>
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader onMobileMenuToggle={toggleMobileMenu} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
      </div>
    </div>
  )
}


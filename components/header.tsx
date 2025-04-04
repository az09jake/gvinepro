"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedLogo from "./animated-logo"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <AnimatedLogo />

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              GVine PRO란?
            </Link>
            <Link
              href="/solution/guide"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              One Stop 솔루션
            </Link>
            <Link
              href="/subscription"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              구독 안내
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              PRO들의 블로그
            </Link>
            <Link href="/support/faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              고객센터
            </Link>
          </nav>

          {/* Subscribe button */}
          <div className="hidden lg:block">
            <Link href="/subscription/apply">
              <button className="btn btn-primary bg-point text-white hover:bg-point/90">구독하기</button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden text-foreground" onClick={toggleMenu} aria-label="메뉴 토글">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={toggleMenu}
              >
                GVine PRO란?
              </Link>
              <Link
                href="/solution/guide"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={toggleMenu}
              >
                One Stop 솔루션
              </Link>
              <Link
                href="/subscription"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={toggleMenu}
              >
                구독 안내
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={toggleMenu}
              >
                PRO들의 블로그
              </Link>
              <Link
                href="/support/faq"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={toggleMenu}
              >
                고객센터
              </Link>
              <div className="pt-2">
                <Link href="/subscription/apply">
                  <button className="w-full btn btn-primary bg-point text-white hover:bg-point/90">구독하기</button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header


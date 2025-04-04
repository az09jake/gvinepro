"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import RippleButton from "./ripple-button"

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-2xl font-normal">
                GVine<span className="text-white">PRO</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              각 분야 실무 전문가들과 AI가 함께하는 원스톱 토탈 에이전시입니다. 기획부터 판매까지 모든 과정을 한번에
              해결해드립니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-normal mb-6">바로가기</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  GVine PRO란?
                </Link>
              </li>
              <li>
                <Link
                  href="/solution/guide"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  One Stop 솔루션
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  구독 안내
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  PRO들의 블로그
                </Link>
              </li>
              <li>
                <Link href="/support/faq" className="text-muted-foreground hover:text-white transition-colors text-sm">
                  고객센터
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-normal mb-6">연락처</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                <a
                  href="mailto:grapevineceo@naver.com"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  grapevineceo@naver.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                <a
                  href="tel:+82-070-4616-7360"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  +82 070-4616-7360
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                <span className="text-muted-foreground text-sm">강원도 고성군 토성면 청간길 11-6</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-normal mb-6">뉴스레터 구독</h3>
            <p className="text-muted-foreground text-sm mb-4">최신 소식과 유용한 정보를 받아보세요.</p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="이메일 주소"
                className="bg-muted text-foreground px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-white"
              />
              <RippleButton className="btn btn-primary text-sm py-2">구독하기</RippleButton>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GVine PRO. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-muted-foreground hover:text-white transition-colors text-sm">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-white transition-colors text-sm">
              이용약관
            </Link>
            <Link href="/sitemap" className="text-muted-foreground hover:text-white transition-colors text-sm">
              사이트맵
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


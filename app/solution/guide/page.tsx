"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { ArrowRight, Check, Star } from "lucide-react"
import Link from "next/link"
import RippleButton from "@/components/ripple-button"
import { useRef } from "react"
import { useInView } from "framer-motion"

export default function SolutionGuidePage() {
  const heroRef = useRef(null)
  const planningRef = useRef(null)
  const designRef = useRef(null)
  const developmentRef = useRef(null)
  const marketingRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: false, amount: 0.5 })
  const planningInView = useInView(planningRef, { once: false, amount: 0.5 })
  const designInView = useInView(designRef, { once: false, amount: 0.5 })
  const developmentInView = useInView(developmentRef, { once: false, amount: 0.5 })
  const marketingInView = useInView(marketingRef, { once: false, amount: 0.5 })
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.5 })

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />

      {/* 히어로 섹션 */}
      <section ref={heroRef} className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-point/10 to-background" />
        <div className="absolute inset-0 z-0 noise-bg opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1 bg-point/10 rounded-full mb-4">
                <Star className="h-3 w-3 text-point mr-2" />
                <span className="text-xs text-point font-medium">원스톱 솔루션</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                기획부터 판매까지, 모든 것을 한번에! One Stop 솔루션
              </h1>

              <p className="text-base text-muted-foreground mb-8 max-w-2xl">
                월간 구독만으로, 24년 이상의 실무 경력을 가진 분야별 전문가들과 고도화된 AI가 기획부터 마케팅, 운영까지
                비즈니스의 전 과정을 책임집니다.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/subscription">
                  <RippleButton className="btn bg-point text-white hover:bg-point/90 group py-2.5 px-5 text-sm">
                    구독 신청하기
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </RippleButton>
                </Link>
                <Link href="/support/contact">
                  <RippleButton className="btn btn-outline py-2.5 px-5 text-sm">문의하기</RippleButton>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-[4/3] shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="One Stop 솔루션 이미지"
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-4 -right-4 bg-secondary/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-border/20">
                  <div className="flex items-center space-x-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-point fill-point" />
                    ))}
                  </div>
                  <p className="text-xs text-foreground/80">"최고의 비즈니스 솔루션!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">비즈니스 솔루션</span>
            <h2 className="text-2xl md:text-3xl font-light mb-4">최고의 비즈니스 솔루션</h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              복잡한 업무는 덜고, 최고의 효율과 성과만 경험하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 솔루션 카드 1 */}
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/20 hover:border-point/30 transition-all duration-300">
              <div className="w-12 h-12 bg-point/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-point"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">기획</h3>
              <p className="text-sm text-muted-foreground">
                클라이언트의 본질적인 요구를 정확히 파악한 뒤, 목표에 최적화된 전략을 설계합니다.
              </p>
            </div>

            {/* 솔루션 카드 2 */}
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/20 hover:border-point/30 transition-all duration-300">
              <div className="w-12 h-12 bg-point/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-point"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">디자인</h3>
              <p className="text-sm text-muted-foreground">
                브랜드의 고유한 아이덴티티를 반영한 창의적인 디자인을 기획하고 제작합니다.
              </p>
            </div>

            {/* 솔루션 카드 3 */}
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/20 hover:border-point/30 transition-all duration-300">
              <div className="w-12 h-12 bg-point/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-point"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">개발</h3>
              <p className="text-sm text-muted-foreground">
                다양한 플랫폼에 최적화된 AI 및 자동화 기술을 적용하여 효율적인 시스템을 구축합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 기획 서비스 섹션 */}
      <section ref={planningRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">기획</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
                클라이언트의 요구를 정확히 파악합니다
              </h2>
              <p className="text-base text-muted-foreground mb-6">
                클라이언트의 본질적인 요구를 정확히 파악한 뒤, 목표에 최적화된 전략을 설계합니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">시장 및 경쟁사 분석</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">브랜드 포지셔닝 전략 수립</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">서비스 구조 및 플로우 기획</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">실행 단계별 전략 매뉴얼 공유</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-[4/3] shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="기획 서비스 이미지"
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-secondary/80 backdrop-blur-sm rounded-lg p-4 shadow-md border border-border/20">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-point/20 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-point" />
                    </div>
                    <p className="text-xs font-medium">전략적 기획</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-point/20 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-point" />
                    </div>
                    <p className="text-xs font-medium">데이터 기반 분석</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 디자인 서비스 섹션 */}
      <section ref={designRef} className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-[4/3] shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="디자인 서비스 이미지"
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-secondary/80 backdrop-blur-sm rounded-lg p-4 shadow-md border border-border/20">
                  <h3 className="text-sm font-medium mb-1">브랜드 아이덴티티</h3>
                  <p className="text-xs text-muted-foreground">차별화된 디자인</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">디자인</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4 leading-tight">브랜드 아이덴티티를 반영한 디자인</h2>
              <p className="text-base text-muted-foreground mb-6">
                브랜드의 고유한 아이덴티티를 반영한 창의적인 디자인을 기획하고, 고객의 비전을 실현하기 위해 필요한
                요소들을 종합적으로 고려하여 최상의 결과물을 도출할 수 있도록 설계합니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">브랜드 아이덴티티 분석</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">컨셉 및 무드보드 제안</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">CI/BI 디자인 기획 및 적용</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">온/오프라인 디자인 요소 통합 설계</p>
                </div>
              </div>

              <Link
                href="/solution/portfolio"
                className="inline-flex items-center text-point text-sm font-medium hover:text-point/90 transition-colors group"
              >
                포트폴리오 보기
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 개발 서비스 섹션 */}
      <section ref={developmentRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">개발</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4 leading-tight">최신 기술로 최적화된 시스템 구축</h2>
              <p className="text-base text-muted-foreground mb-6">
                다양한 플랫폼에 최적화된 AI 및 자동화 기술을 적용하여 효율적인 시스템을 구축하고 최상의 사용자 경험을
                제공합니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">웹/앱 개발 및 유지보수</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">AI 기반 자동화 시스템 구축</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">데이터 분석 및 시각화</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">클라우드 인프라 구축 및 관리</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-[4/3] shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="개발 서비스 이미지"
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-secondary/80 backdrop-blur-sm rounded-lg p-4 shadow-md border border-border/20">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-point/20 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-point" />
                    </div>
                    <p className="text-xs font-medium">최신 기술 적용</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-point/20 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-point" />
                    </div>
                    <p className="text-xs font-medium">AI 자동화</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 마케팅 서비스 섹션 */}
      <section ref={marketingRef} className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-[4/3] shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="마케팅 서비스 이미지"
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -left-4 bg-secondary/80 backdrop-blur-sm rounded-lg p-4 shadow-md border border-border/20">
                  <h3 className="text-sm font-medium mb-1">데이터 기반</h3>
                  <p className="text-xs text-muted-foreground">효과적인 마케팅</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">마케팅</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4 leading-tight">데이터 기반 마케팅 전략</h2>
              <p className="text-base text-muted-foreground mb-6">
                브랜드 전략을 수립하고, 광고 및 데이터 분석을 통해 고객 유입과 마케팅 성과를 극대화합니다. 콘텐츠
                제작부터 광고 집행, 성과 분석까지 원스톱으로 제공합니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">SNS 마케팅 전략 수립</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">콘텐츠 기획 및 제작</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">광고 집행 및 성과 분석</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">SEO 최적화 및 검색 노출 개선</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section ref={ctaRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-center">
              원스톱 비즈니스 솔루션, 지금 시작하세요!
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
              전문가와 AI가 함께하는 올인원 솔루션으로 당신의 비즈니스 운영을 더 간편하고 효율적으로 바꿔드립니다.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/subscription">
                <RippleButton className="btn bg-point text-white hover:bg-point/90 py-2.5 px-5 text-sm">
                  구독신청
                </RippleButton>
              </Link>
              <Link href="/support/contact">
                <RippleButton className="btn btn-outline py-2.5 px-5 text-sm">문의하기</RippleButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


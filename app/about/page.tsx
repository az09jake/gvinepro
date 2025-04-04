"use client"

import { useRef, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { ArrowRight, Check, Star } from "lucide-react"
import Link from "next/link"
import RippleButton from "@/components/ripple-button"
import { useInView, useScroll, useTransform } from "framer-motion"

export default function AboutPage() {
  const [activeExpert, setActiveExpert] = useState(0)
  const heroRef = useRef(null)
  const solutionRef = useRef(null)
  const aboutRef = useRef(null)
  const expertsRef = useRef(null)
  const hiringRef = useRef(null)
  const partnersRef = useRef(null)
  const testimonialsRef = useRef(null)

  const heroInView = useInView(heroRef, { once: false, amount: 0.5 })
  const solutionInView = useInView(solutionRef, { once: false, amount: 0.5 })
  const aboutInView = useInView(aboutRef, { once: false, amount: 0.5 })
  const expertsInView = useInView(expertsRef, { once: false, amount: 0.5 })
  const hiringInView = useInView(hiringRef, { once: false, amount: 0.5 })
  const partnersInView = useInView(partnersRef, { once: false, amount: 0.5 })
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.5 })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  const experts = [
    {
      name: "김경환",
      role: "기획",
      description: "비즈니스 목표에 맞춰 전략을 수립하고, 시장 조사 및 데이터 분석을 통해 최적의 방향을 제시합니다.",
    },
    {
      name: "최슬기",
      role: "디자인",
      description:
        "브랜드 아이덴티티, UI/UX, 마케팅 콘텐츠 등을 디자인하여 시각적 완성도를 높이고 사용자 경험을 최적화합니다.",
    },
    {
      name: "박수철",
      role: "개발",
      description:
        "다양한 플랫폼에 최적화된 AI 및 자동화 기술을 적용하여 효율적인 시스템을 구축하고 최상의 사용자 경험을 제공합니다.",
    },
    {
      name: "정수진",
      role: "콘텐츠 제작",
      description: "영상, 이미지, 카피를 기획 제작하여, 플랫폼별 최적화된 콘텐츠로 고객 관심과 참여도를 높입니다.",
    },
    {
      name: "김영주",
      role: "마케팅",
      description: "브랜드 전략을 수립하고, 광고 및 데이터 분석을 통해 고객 유입과 마케팅 성과를 극대화합니다.",
    },
    {
      name: "김민정",
      role: "세일즈",
      description: "효과적인 판매 채널을 분석하고 전략을 수립하여 맞춤형 제안을 제공함으로써 매출을 극대화합니다.",
    },
    {
      name: "김나정",
      role: "운영관리",
      description:
        "제고 물류, 고객 서비스 등 비즈니스 운영을 총괄하며, CS프로세스를 최적화하고 운영 효율성을 극대화합니다.",
    },
    {
      name: "AI",
      role: "종합",
      description: "맞춤형 AI 솔루션을 통해 한층 업무를 자동화하고, 업무 효율성과 비즈니스 퍼포먼스를 한층 높입니다.",
    },
  ]

  const nextExpert = () => {
    setActiveExpert((prev) => (prev + 1) % experts.length)
  }

  const prevExpert = () => {
    setActiveExpert((prev) => (prev - 1 + experts.length) % experts.length)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />

      {/* 히어로 섹션 - 더 간결하고 기업형 */}
      <section ref={heroRef} className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-point/10 to-background" />
        <div className="absolute inset-0 z-0 noise-bg opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1 bg-point/10 rounded-full mb-4">
                <Star className="h-3 w-3 text-point mr-2" />
                <span className="text-xs text-point font-medium">24년 실무 경험</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                24년 실무력으로 무장한 전문가들의 노하우와 AI가 만났다!
              </h1>

              <p className="text-base text-muted-foreground mb-8 max-w-2xl">
                각 분야 실무에 미친 전문가들이 AI 기술과 결합해 비즈니스 운영의 새로운 표준을 제시합니다. 복잡한 운영을
                단순화하고, 비용은 줄이며, 효율은 극대화합니다.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/solution">
                  <RippleButton className="btn bg-point text-white hover:bg-point/90 group py-2.5 px-5 text-sm">
                    서비스 알아보기
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
                    alt="GVine PRO 전문가 이미지"
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
                  <p className="text-xs text-foreground/80">"최고의 전문가 팀!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 회사 소개 섹션 - 더 구조화된 레이아웃 */}
      <section ref={aboutRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-square shadow-md">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="GVine PRO 팀 이미지"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-4 -left-4 bg-secondary/80 backdrop-blur-sm rounded-lg p-4 shadow-md border border-border/20">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-point/20 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-point" />
                    </div>
                    <p className="text-xs font-medium">24년 실무 경험</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-point/20 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-point" />
                    </div>
                    <p className="text-xs font-medium">AI 기술 융합</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">
                GVine PRO는 누구인가요?
              </span>
              <h2 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
                각 분야 실무 전문가들로 똘똘 뭉친 GVine PRO
              </h2>
              <p className="text-base text-muted-foreground mb-6">
                GVine PRO는 24년간 기획, 디자인, 개발, 마케팅, 세일즈 등 각 분야에서 최고의 실무 경험을 쌓아온
                전문가들로 구성된 팀입니다. 여기에 최첨단 AI 기술을 더해, 비즈니스의 모든 과정을 하나로 통합한 원스톱
                솔루션을 제공합니다. 복잡한 운영을 단순화하고, 비용은 줄이며, 효율은 극대화합니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">전문가 중심 프로젝트 관리</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">AI 기술 활용 업무 자동화</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">원스톱 비즈니스 솔루션</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">비용 효율적 서비스 제공</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 솔루션 소개 섹션 - 더 체계적인 카드 레이아웃 */}
      <section ref={solutionRef} className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">비즈니스 솔루션</span>
            <h2 className="text-2xl md:text-3xl font-light mb-4">당신의 비즈니스를 위한 최선의 솔루션을 제공합니다</h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              각 분야 실무에 미친 전문가들이 AI 기술과 결합해 비즈니스 운영의 새로운 표준을 제시합니다.
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
              <h3 className="text-lg font-medium mb-2">전문성</h3>
              <p className="text-sm text-muted-foreground">
                24년 이상의 실무 경험을 가진 각 분야 전문가들이 최고의 솔루션을 제공합니다.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">효율성</h3>
              <p className="text-sm text-muted-foreground">
                AI 기술과 전문가의 협업으로 최소 비용으로 최대 효과를 창출합니다.
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">신뢰성</h3>
              <p className="text-sm text-muted-foreground">
                검증된 실무 경험과 최신 기술로 안정적이고 신뢰할 수 있는 결과를 보장합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 전문가 팀 소개 섹션 - 더 체계적인 그리드 */}
      <section ref={expertsRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">전문가 팀</span>
            <h2 className="text-2xl md:text-3xl font-light mb-4">전문가와 AI의 완벽한 협업</h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              클라이언트의 요구를 정확히 파악하고 원활한 소통이 가능한 각 분야의 전문가가 배정되어, 최상의 결과물과 높은
              만족도를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts.slice(0, 4).map((expert, index) => (
              <div
                key={index}
                className="bg-secondary/50 p-5 rounded-lg border border-border/20 hover:border-point/30 transition-all duration-300"
              >
                <div className="bg-muted rounded-lg overflow-hidden aspect-square mb-4">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=${expert.name}`}
                    alt={`${expert.name} 이미지`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="inline-flex items-center px-2 py-1 bg-point/10 rounded-full mb-2">
                  <span className="text-xs text-point">{expert.role}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{expert.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{expert.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts.slice(4).map((expert, index) => (
              <div
                key={index}
                className="bg-secondary/50 p-5 rounded-lg border border-border/20 hover:border-point/30 transition-all duration-300"
              >
                <div className="bg-muted rounded-lg overflow-hidden aspect-square mb-4">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=${expert.name}`}
                    alt={`${expert.name} 이미지`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="inline-flex items-center px-2 py-1 bg-point/10 rounded-full mb-2">
                  <span className="text-xs text-point">{expert.role}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{expert.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{expert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 인력 채용 고민 해결 섹션 - 더 간결한 레이아웃 */}
      <section ref={hiringRef} className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">
                인력 채용 솔루션
              </span>
              <h2 className="text-2xl md:text-3xl font-light mb-4 leading-tight">이제 인력 채용 고민에서 벗어나세요</h2>
              <p className="text-base text-muted-foreground mb-6">
                각 분야 실무 전문가와 AI를 한 번에 활용해, 별도 채용 없이도 프로젝트를 효율적으로 운영할 수 있습니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">1명 급여로 모든 전문 분야 커버</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">클라이언트 요구를 정확히 반영</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">AI와 전문가가 실시간으로 최적화</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">기획부터 실행까지 원스톱</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/solution/service">
                  <RippleButton className="btn btn-outline py-2 px-5 text-sm">더 알아보기</RippleButton>
                </Link>
                <Link href="/subscription">
                  <RippleButton className="btn bg-point text-white hover:bg-point/90 group py-2 px-5 text-sm">
                    구독하기
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </RippleButton>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-[4/3] shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="GVine PRO 서비스 이미지"
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -top-4 -right-4 bg-secondary/80 backdrop-blur-sm rounded-lg p-4 shadow-md border border-border/20">
                  <h3 className="text-sm font-medium mb-1">비용 절감</h3>
                  <p className="text-xs text-muted-foreground">1명의 인건비로 전문가 팀 활용</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 파트너 로고 섹션 - 더 정돈된 레이아웃 */}
      <section ref={partnersRef} className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-light">GVine PRO를 선택한 파트너</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {/* 파트너 로고들 */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-secondary/50 p-4 rounded-lg border border-border/10 flex items-center justify-center h-20"
              >
                <Image
                  src="/placeholder.svg?height=40&width=100"
                  alt={`파트너 로고 ${i + 1}`}
                  width={100}
                  height={40}
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 고객 추천사 섹션 - 더 간결한 디자인 */}
      <section ref={testimonialsRef} className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">고객 추천사</span>
            <h2 className="text-2xl md:text-3xl font-light mb-4">고객이 말하는 GVine PRO</h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              GVine PRO와 함께한 고객들의 생생한 후기를 확인해보세요.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/20">
              {/* 로고 */}
              <div className="flex justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=40&width=100"
                  alt="Webflow 로고"
                  width={100}
                  height={40}
                  className="h-6 w-auto"
                />
              </div>

              {/* 추천사 */}
              <div className="text-center mb-6">
                <p className="text-lg md:text-xl font-light text-foreground leading-relaxed">
                  "기획, 콘텐츠, 마케팅까지 일일이 따로 맡기던 과거가 아까울 정도입니다. GVine PRO는 속도, 퀄리티, 비용
                  면에서 완벽한 파트너였어요."
                </p>
              </div>

              {/* 프로필 */}
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-muted rounded-full overflow-hidden mr-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="송은상 이미지"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium">송은상</h3>
                  <p className="text-xs text-muted-foreground">CEO, WPhil&</p>
                </div>
              </div>

              {/* 슬라이더 인디케이터 */}
              <div className="flex justify-center gap-2 mt-6">
                <div className="w-1.5 h-1.5 rounded-full bg-point"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 - 더 간결하고 전문적인 디자인 */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-center">
              원스톱 비즈니스 솔루션, 지금 시작하세요!
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
              전문가와 AI가 함께하는 올인원 솔루션으로 당신의 비즈니스 운영을 더 간편하고 효율적으로 바꿔드립니다.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/subscription/apply">
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


"use client"

import { useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { ArrowRight, Check, Package, Star } from "lucide-react"
import Link from "next/link"
import RippleButton from "@/components/ripple-button"
import { useInView } from "framer-motion"

export default function SubscriptionPage() {
  const heroRef = useRef(null)
  const limitedRef = useRef(null)
  const optionsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: false, amount: 0.5 })
  const limitedInView = useInView(limitedRef, { once: false, amount: 0.5 })
  const optionsInView = useInView(optionsRef, { once: false, amount: 0.5 })
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.5 })

  return (
    <main className="min-h-screen">
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
                <span className="text-xs text-point font-medium">구독 서비스</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                당신의 비즈니스에 필요한 단 하나의 팀, GVine PRO
              </h1>
              <p className="text-base text-muted-foreground mb-8 max-w-2xl">
                전문가와 AI가 함께하는 올인원 솔루션으로 당신의 비즈니스 운영을 더 간편하고 효율적으로 바꿔드립니다.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/subscription/apply">
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
                    alt="GVine PRO 팀 이미지"
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
                  <p className="text-xs text-foreground/80">"최고의 구독 서비스!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 한정 기업 섹션 */}
      <section ref={limitedRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-square shadow-md">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="한정 모집 이미지"
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
                    <p className="text-xs font-medium">매월 10기업 한정</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-point/20 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-point" />
                    </div>
                    <p className="text-xs font-medium">해지 위약금 0원</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">한정 모집</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4 leading-tight">매월 10기업 한정, 해지 위약금 0원</h2>
              <p className="text-base text-muted-foreground mb-6">
                모든 클라이언트에게 믿도 높은 맞춤형 서비스를 제공하기 위해 매월 최대 10곳의 기업과만 파트너십을
                체결합니다. 해지 위약금 없이 누릴 수 있는 한정된 기회, 지금 바로 선점해보세요.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">맞춤형 서비스 제공</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">전담 전문가 배정</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">유연한 계약 조건</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-point/10 rounded-full p-1.5">
                    <Check className="h-3 w-3 text-point" />
                  </div>
                  <p className="ml-3 text-sm text-muted-foreground">우선 지원 혜택</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 구독 옵션 섹션 */}
      <section ref={optionsRef} className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">구독 옵션</span>
            <h2 className="text-2xl md:text-3xl font-light mb-4">1인 비용으로 실무 전문가 팀을 구독해보세요</h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              단기, 맞춤형, 분야별, 월간 구독까지 자유롭게 선택하세요. 필요한 전문가 팀을 필요할 때 구독할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 구독 옵션 카드 1 */}
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/20 hover:border-point/30 transition-all duration-300">
              <div className="w-12 h-12 bg-point/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-point" />
              </div>
              <h3 className="text-lg font-medium mb-2">단기 구독</h3>
              <p className="text-sm text-muted-foreground mb-4">
                단기간 집중 지원이 필요한 프로젝트에 적합한 짧은 기간의 유연한 구독 서비스
              </p>
              <div className="mt-auto">
                <Link href="/subscription/apply">
                  <RippleButton className="w-full bg-secondary/50 hover:bg-secondary text-foreground py-2 px-4 text-sm">
                    자세히 보기
                  </RippleButton>
                </Link>
              </div>
            </div>

            {/* 구독 옵션 카드 2 */}
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/20 hover:border-point/30 transition-all duration-300">
              <div className="w-12 h-12 bg-point/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-point" />
              </div>
              <h3 className="text-lg font-medium mb-2">맞춤형 구독</h3>
              <p className="text-sm text-muted-foreground mb-4">
                기업의 목표와 상황에 맞춰 구성된 전용 전문가 팀과 서비스 플랜 제공
              </p>
              <div className="mt-auto">
                <Link href="/subscription/apply">
                  <RippleButton className="w-full bg-secondary/50 hover:bg-secondary text-foreground py-2 px-4 text-sm">
                    자세히 보기
                  </RippleButton>
                </Link>
              </div>
            </div>

            {/* 구독 옵션 카드 3 */}
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/20 hover:border-point/30 transition-all duration-300">
              <div className="w-12 h-12 bg-point/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-point" />
              </div>
              <h3 className="text-lg font-medium mb-2">분야별 구독</h3>
              <p className="text-sm text-muted-foreground mb-4">
                기획, 디자인, 개발, 마케팅 등 필요한 분야만 선택하여 구독 가능
              </p>
              <div className="mt-auto">
                <Link href="/subscription/apply">
                  <RippleButton className="w-full bg-secondary/50 hover:bg-secondary text-foreground py-2 px-4 text-sm">
                    자세히 보기
                  </RippleButton>
                </Link>
              </div>
            </div>

            {/* 구독 옵션 카드 4 - 월간 구독 (하이라이트) */}
            <div className="bg-point/10 p-6 rounded-lg border border-point/30 hover:border-point/50 transition-all duration-300 relative">
              <div className="absolute -top-3 right-4 bg-point text-white text-xs px-3 py-1 rounded-full">인기</div>
              <div className="w-12 h-12 bg-point/20 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-point" />
              </div>
              <h3 className="text-lg font-medium mb-2">월간 구독</h3>
              <p className="text-sm text-muted-foreground mb-4">
                기획부터 운영까지 전 과정이 포함된 월 단위 올인원 통합 구독 서비스
              </p>
              <div className="mt-auto">
                <Link href="/subscription/apply">
                  <RippleButton className="w-full bg-point hover:bg-point/90 text-white py-2 px-4 text-sm">
                    지금 신청하기
                  </RippleButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 가격 섹션 */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">가격 안내</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
                합리적인 가격으로 최고의 전문가 팀을 구독하세요
              </h2>
              <p className="text-base text-muted-foreground mb-6">
                GVine PRO의 월간 구독은 1인 인건비로 전체 전문가 팀을 활용할 수 있는 혁신적인 서비스입니다. 기획,
                디자인, 개발, 마케팅, 운영까지 모든 분야를 커버하는 올인원 솔루션을 경험해보세요.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <Check className="h-5 w-5 text-point" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">모든 분야 전문가 포함</h3>
                    <p className="text-sm text-muted-foreground">
                      기획, 디자인, 개발, 마케팅, 콘텐츠 제작, 세일즈, 운영관리까지 모든 분야의 전문가가 포함됩니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <Check className="h-5 w-5 text-point" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">AI 자동화 시스템</h3>
                    <p className="text-sm text-muted-foreground">
                      최첨단 AI 기술을 활용한 자동화 시스템으로 업무 효율성을 극대화합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <Check className="h-5 w-5 text-point" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">무제한 수정 및 지원</h3>
                    <p className="text-sm text-muted-foreground">
                      구독 기간 동안 무제한 수정 및 기술 지원을 제공합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-secondary/50 p-6 rounded-lg border border-border/20 w-full relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-point/10 rounded-full"></div>
                <div className="relative">
                  <h3 className="text-xl font-medium mb-2">월간 구독</h3>
                  <div className="text-4xl font-light mb-2">299만원</div>
                  <p className="text-sm text-muted-foreground mb-6">월 단위 계약, 언제든지 해지 가능</p>

                  <div className="border-t border-b border-border py-6 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-point mr-2" />
                          <span className="text-sm text-muted-foreground">기획</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-point mr-2" />
                          <span className="text-sm text-muted-foreground">개발</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-point mr-2" />
                          <span className="text-sm text-muted-foreground">마케팅</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-point mr-2" />
                          <span className="text-sm text-muted-foreground">운영관리</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-point mr-2" />
                          <span className="text-sm text-muted-foreground">디자인</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-point mr-2" />
                          <span className="text-sm text-muted-foreground">콘텐츠 제작</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-point mr-2" />
                          <span className="text-sm text-muted-foreground">세일즈</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-point mr-2" />
                          <span className="text-sm text-muted-foreground">AI 자동화</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href="/subscription/apply">
                    <RippleButton className="w-full bg-point hover:bg-point/90 text-white py-2.5 px-5 text-sm group">
                      신청하기
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </RippleButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section ref={ctaRef} className="py-16">
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
                <RippleButton className="btn bg-point text-white hover:bg-point/90 py-2.5 px-5 text-sm group">
                  구독신청
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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


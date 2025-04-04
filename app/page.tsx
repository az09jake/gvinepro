"use client"

import Header from "@/components/header"
import { ArrowRight, ChevronRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RippleButton from "@/components/ripple-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ filter: "brightness(0.3)" }}
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay with gradient for smooth transition */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.95) 100%)",
            }}
          ></div>
          {/* Noise texture */}
          <div className="absolute inset-0 z-20 noise-bg"></div>
        </div>

        <div className="container mx-auto px-6 relative z-30">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-secondary rounded-full mb-8">
              <p className="text-sm text-muted-foreground">원스톱 토탈 에이전시</p>
            </div>

            <h1 className="mb-8 text-kr-hero">
              <span className="font-light">전문가의 노하우와</span>
              <br />
              <span className="font-medium">AI 협업</span>
              <span className="font-light">으로 실현하는</span>
              <br />
              <span className="font-light">최고 효율 비즈니스 솔루션</span>
            </h1>

            <p className="text-kr-subtitle mb-10 max-w-2xl">
              다양한 AI agent를 활용해서 고객사의 프로젝트를 성공시켜주는 원스톱 토탈 에이전시
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/solution/guide">
                <RippleButton className="btn bg-point text-white hover:bg-point/90 flex items-center">
                  서비스 알아보기
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
              <Link href="/support/faq">
                <RippleButton className="btn btn-outline">문의하기</RippleButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating testimonials */}
        <div className="hidden md:block relative z-30">
          <div
            className="floating-testimonial top-1/4 right-[15%] card-highlight p-4 max-w-xs"
            style={{ animationDelay: "0s" }}
          >
            <p className="text-sm text-muted-foreground italic">"Working with them was a game changer!"</p>
            <p className="text-xs text-right mt-2">- pranav.tb</p>
          </div>
        </div>
      </section>

      {/* Cost Efficiency Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left title section */}
            <div>
              <h2 className="mb-4 text-kr-hero">
                <span className="font-light">1명의 비용,</span>
                <br />
                <span className="font-light">무한한 가능성!</span>
              </h2>
              <h3 className="text-xl md:text-2xl font-light text-muted-foreground">
                이제, 당신의 사업 운영 방식을
                <br />
                바꿔보세요.
              </h3>
            </div>

            {/* Right description section */}
            <div className="space-y-6">
              <p className="text-lg">
                기획부터 디자인, 개발, 마케팅, 판매까지 - 모든 과정을 한 명의 인건비로 해결할 수 있다면?
              </p>

              <p className="text-lg">
                우리는 각 분야의 전문가들이 AI를 활용하여 최저 비용, 최단 기간, 최고 효율로 비즈니스 성장을 돕는 올인원
                외주 솔루션을 제공합니다.
              </p>

              <p className="text-lg">
                지금, 한 번의 선택으로 비효율적인 인력 운영과 복잡한 외주 관리에서 벗어나 사업의 모든 과정을
                최적화하세요.
              </p>

              <div className="pt-4">
                <Link href="/solution/guide">
                  <RippleButton className="btn bg-point text-white hover:bg-point/90 flex items-center group">
                    서비스 자세히 보기
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </RippleButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Concerns Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="mb-4 text-kr-hero">
              <span className="font-light">최소 비용으로 최고의 결과,</span>
              <br />
              <span className="font-light">아직 해결하지 못한 숙제인가요?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Customer concern 1 */}
            <div className="card-highlight p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-muted rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="한국 CEO 이미지"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6 italic">
                "필요한 전문가가 많지만, 모든 분야의 전문가를 채용할 만큼 자금 여유가 없어요."
              </p>

              <p className="font-normal text-foreground">디지털혁신 주식회사 대표자</p>
            </div>

            {/* Customer concern 2 */}
            <div className="card-highlight p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-muted rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="한국 스타트업 대표 이미지"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6 italic">
                "일손은 부족한데 채용은 어려워요. 그래서 AI를 써봤는데... 생각만큼 잘 안 되네요."
              </p>

              <p className="font-normal text-foreground">테크웨이브 코리아 대표자</p>
            </div>

            {/* Customer concern 3 */}
            <div className="card-highlight p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-muted rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="한국 비즈니스 리더 이미지"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6 italic">
                "필요할 때마다 외주를 맡기는 것도 쉽지 않고, 비용 대비 만족도가 낮아요."
              </p>

              <p className="font-normal text-foreground">미래솔루션 파트너스 대표자</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Adoption Challenges Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left title section */}
            <div>
              <h2 className="mb-4 text-kr-hero">
                <span className="font-light">AI, 도입만으로</span>
                <br />
                <span className="font-light">성과를 기대하기</span>
                <br />
                <span className="font-light">어렵습니다.</span>
              </h2>
            </div>

            {/* Right description section */}
            <div className="space-y-6">
              <p className="text-lg">
                AI 기술은 빠르게 발전하고 있으며, 수많은 AI 도구가 쏟아지고 있습니다. 하지만 단순히 AI를 도입한다고 해서
                성공적인 인력 대체 효과를 기대할 수는 없습니다.
              </p>

              <p className="text-lg text-foreground font-normal">핵심은 AI를 '어떻게' 활용하느냐에 달려 있습니다.</p>

              <p className="text-lg">
                기획 없이 AI를 사용하면 원하는 성과를 내기 어렵고, 무작정 AI를 도입하면 오히려 시간과 비용을 낭비할 수
                있습니다.
              </p>

              <p className="text-lg">
                진짜 성과를 내려면?
                <br />
                AI의 잠재력을 극대화할 수 있는 실무 전문가가 반드시 필요합니다.
              </p>

              <div className="pt-4">
                <Link href="/about">
                  <RippleButton className="btn bg-point text-white hover:bg-point/90 flex items-center group">
                    GVine PRO 전문가 알아보기
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </RippleButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Subscription CTA Section */}
      <section className="py-32 bg-secondary noise-bg relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 text-kr-hero">
              <span className="font-light">전문가 + AI = 압도적 퍼포먼스를</span>
              <br />
              <span className="font-light">월간 구독해보세요.</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              1명의 인건비로, 기획부터 판매까지 모든 과정의 전문가 팀과 AI의 강력한 협업을 경험하세요. 업무 능력과
              생산성을 극대화하여 비용대비 압도적인 성과를 만들어냅니다.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link href="/subscription/apply">
                <RippleButton className="btn bg-point text-white hover:bg-point/90 flex items-center group">
                  월간 구독 시작하기
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
              <Link href="/subscription">
                <RippleButton className="btn btn-outline">요금제 알아보기</RippleButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team Introduction Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="mb-6 font-light text-kr-hero">각 분야 전문인력</h2>
            <p className="text-lg max-w-3xl mx-auto">
              클라이언트의 요구를 정확히 파악하고 원활한 소통이 가능한 각 분야의 전문가가 배정되어, 최상의 결과물과 높은
              만족도를 제공합니다.
            </p>
          </div>

          <div className="slider-container">
            <div className="slider-track">
              {/* Expert 1 */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4 relative">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="기획 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">기획</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Planning</p>
                  <p className="text-muted-foreground text-sm">
                    비즈니스 목표에 맞춰 전략을 수립하고, 시장 조사 및 데이터 분석을 통해 최적의 방향을 제시합니다.
                  </p>
                </div>
              </div>

              {/* Expert 2 */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="디자인 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">디자인</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Design</p>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    브랜드 아이덴티티, UI/UX, 마케팅 콘텐츠 등을 디자인하여 시각적 완성도를 높이고 사용자 경험을
                    최적화합니다.
                  </p>
                </div>
              </div>

              {/* Expert 3 */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="개발 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">개발</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Development</p>
                  <p className="text-muted-foreground text-sm">
                    다양한 플랫폼에 최적화된 AI 및 자동화 기술을 적용하여 효율적인 시스템을 구축하고, 최상의 사용자
                    경험을 제공합니다.
                  </p>
                </div>
              </div>

              {/* Expert 4 */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="콘텐츠 제작 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">콘텐츠 제작</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Content Creation</p>
                  <p className="text-muted-foreground text-sm">
                    영상, 이미지, 카피를 기획 제작하여, 플랫폼별 최적화된 콘텐츠로 고객 관심과 참여도를 높입니다.
                  </p>
                </div>
              </div>

              {/* Expert 5 */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="마케팅 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">마케팅</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Marketing</p>
                  <p className="text-muted-foreground text-sm">
                    데이터 기반의 전략적 마케팅으로 고객 행동 데이터를 분석해 인사이트를 도출하고, 효과적인 브랜드
                    접점을 설계합니다.
                  </p>
                </div>
              </div>

              {/* Expert 6 */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="상품등록 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">상품등록</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Product Registration</p>
                  <p className="text-muted-foreground text-sm">
                    다양한 플랫폼에 최적화된 상품 등록 및 관리로 판매 효율성을 높이고 고객 접근성을 향상시킵니다.
                  </p>
                </div>
              </div>

              {/* Expert 7 */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="글로벌 판매 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">글로벌 판매</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Global Sales</p>
                  <p className="text-muted-foreground text-sm">
                    국제 시장 진출을 위한 전략 수립 및 현지화 서비스로 글로벌 비즈니스 확장을 지원합니다.
                  </p>
                </div>
              </div>

              {/* Duplicate items for infinite scroll effect */}
              {/* Expert 1 (duplicate) */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4 relative">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="기획 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">기획</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Planning</p>
                  <p className="text-muted-foreground text-sm">
                    비즈니스 목표에 맞춰 전략을 수립하고, 시장 조사 및 데이터 분석을 통해 최적의 방향을 제시합니다.
                  </p>
                </div>
              </div>

              {/* Expert 2 (duplicate) */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="디자인 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">디자인</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Design</p>
                  <p className="text-muted-foreground text-sm">
                    브랜드 아이덴티티, UI/UX, 마케팅 콘텐츠 등을 디자인하여 시각적 완성도를 높이고 사용자 경험을
                    최적화합니다.
                  </p>
                </div>
              </div>

              {/* Expert 3 (duplicate) */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="개발 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">개발</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Development</p>
                  <p className="text-muted-foreground text-sm">
                    다양한 플랫폼에 최적화된 AI 및 자동화 기술을 적용하여 효율적인 시스템을 구축하고, 최상의 사용자
                    경험을 제공합니다.
                  </p>
                </div>
              </div>

              {/* Expert 4 (duplicate) */}
              <div className="slider-item">
                <div className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden transition-all duration-300 group-hover:ring-1 ring-white/30">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="콘텐츠 제작 전문가 이미지"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal">콘텐츠 제작</h3>
                  <p className="text-white/80 font-normal mb-3 text-sm">Content Creation</p>
                  <p className="text-muted-foreground text-sm">
                    영상, 이미지, 카피를 기획 제작하여, 플랫폼별 최적화된 콘텐츠로 고객 관심과 참여도를 높입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-background border-t border-border/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <div className="mb-6 md:mb-0">
              <h2 className="mb-2 font-light text-4xl">
                실행력의 기록,
                <br />
                GVinePRO 작업 사례
              </h2>
            </div>
            <div className="max-w-lg">
              <p className="text-lg mb-4">
                아이디어에 그치지 않고, 실제 성과로 이어진 프로젝트들. 실무에 강한 전문가들과 AI가 함께 만든 결과를 직접
                확인해보세요.
              </p>
              <Link href="/portfolio" className="inline-flex items-center text-white font-normal group text-sm">
                더보기
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Portfolio Item 1 */}
            <div className="project-card">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="포트폴리오 이미지"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Portfolio Item 2 */}
            <div className="project-card">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="포트폴리오 이미지"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Portfolio Item 3 */}
            <div className="project-card">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="포트폴리오 이미지"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Portfolio Item 4 */}
            <div className="project-card">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="포트폴리오 이미지"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-secondary relative noise-bg">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 font-light text-kr-hero">
              원스톱 비즈니스 솔루션,
              <br />
              지금 시작하세요!
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              전문가와 AI가 함께하는 올인원 솔루션으로
              <br />
              당신의 비즈니스 운영을 더 간편하고 효율적으로 바꿔드립니다.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link href="/subscription/apply">
                <RippleButton className="btn bg-point text-white hover:bg-point/90">구독신청</RippleButton>
              </Link>
              <Link href="/support/contact">
                <RippleButton className="btn btn-outline">문의하기</RippleButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <Link
                    href="/subscription"
                    className="text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    구독 안내
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-white transition-colors text-sm">
                    PRO들의 블로그
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support/faq"
                    className="text-muted-foreground hover:text-white transition-colors text-sm"
                  >
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
    </main>
  )
}


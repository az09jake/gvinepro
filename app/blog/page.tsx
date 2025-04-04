"use client"

import { useState, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { ArrowRight, Calendar, Search, Star, User } from "lucide-react"
import Link from "next/link"
import RippleButton from "@/components/ripple-button"
import { useInView } from "framer-motion"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("전체")

  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const postsRef = useRef(null)
  const categoriesRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: false, amount: 0.5 })
  const featuredInView = useInView(featuredRef, { once: false, amount: 0.5 })
  const postsInView = useInView(postsRef, { once: false, amount: 0.5 })
  const categoriesInView = useInView(categoriesRef, { once: false, amount: 0.5 })
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.5 })

  const categories = ["전체", "AI", "마케팅", "디자인", "개발", "콘텐츠", "운영"]

  const blogPosts = [
    {
      id: 1,
      title: "AI와 전문가의 협업, 비즈니스 효율성을 극대화하는 방법",
      excerpt:
        "AI 기술과 전문가의 노하우가 결합했을 때 얻을 수 있는 시너지 효과와 비즈니스 성과 향상 방안에 대해 알아봅니다.",
      category: "AI",
      author: "김경환",
      date: "2023-05-15",
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
    },
    {
      id: 2,
      title: "디지털 마케팅의 새로운 패러다임, AI 기반 타겟팅",
      excerpt: "AI를 활용한 정밀 타겟팅으로 마케팅 효율을 높이고 ROI를 극대화하는 최신 전략을 소개합니다.",
      category: "마케팅",
      author: "김영주",
      date: "2023-06-02",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 3,
      title: "UX/UI 디자인 트렌드 2023: 사용자 중심 디자인의 진화",
      excerpt: "2023년 주목해야 할 UX/UI 디자인 트렌드와 사용자 경험을 향상시키는 디자인 원칙에 대해 알아봅니다.",
      category: "디자인",
      author: "최슬기",
      date: "2023-06-20",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 4,
      title: "웹 개발의 미래: JAMstack과 서버리스 아키텍처",
      excerpt: "최신 웹 개발 트렌드인 JAMstack과 서버리스 아키텍처의 장점과 실제 구현 사례를 분석합니다.",
      category: "개발",
      author: "박수철",
      date: "2023-07-05",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 5,
      title: "콘텐츠 마케팅: 스토리텔링으로 브랜드 가치 높이기",
      excerpt: "효과적인 스토리텔링 기법을 활용한 콘텐츠 마케팅 전략과 성공 사례를 소개합니다.",
      category: "콘텐츠",
      author: "정수진",
      date: "2023-07-18",
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
    },
    {
      id: 6,
      title: "비즈니스 운영 자동화: 효율성과 생산성 향상 방안",
      excerpt: "AI와 자동화 도구를 활용해 비즈니스 운영을 최적화하고 생산성을 높이는 방법을 알아봅니다.",
      category: "운영",
      author: "김나정",
      date: "2023-08-01",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
  ]

  const filteredPosts = blogPosts.filter(
    (post) =>
      (activeCategory === "전체" || post.category === activeCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const featuredPosts = blogPosts.filter((post) => post.featured)

  return (
    <main className="min-h-screen">
      <Header />

      {/* 블로그 히어로 섹션 */}
      <section ref={heroRef} className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-point/10 to-background" />
        <div className="absolute inset-0 z-0 noise-bg opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1 bg-point/10 rounded-full mb-4">
                <Star className="h-3 w-3 text-point mr-2" />
                <span className="text-xs text-point font-medium">PRO들의 블로그</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                전문가들의 인사이트와 노하우를 공유합니다
              </h1>

              <p className="text-base text-muted-foreground mb-8 max-w-2xl">
                각 분야 전문가들이 실무에서 얻은 경험과 최신 트렌드, AI 활용 노하우를 공유하는 공간입니다. 비즈니스
                성장에 도움이 되는 다양한 인사이트를 만나보세요.
              </p>

              {/* 검색 바 */}
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="관심 있는 주제를 검색해보세요"
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-point"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-muted rounded-lg overflow-hidden w-full aspect-[4/3] shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="GVine PRO 블로그 이미지"
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
                  <p className="text-xs text-foreground/80">"전문가의 인사이트!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section ref={categoriesRef} className="py-8 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category
                    ? "bg-point text-white"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 블로그 포스트 */}
      {featuredPosts.length > 0 && (
        <section ref={featuredRef} className="py-16">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">주요 포스트</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4">주목할 만한 인사이트</h2>
              <p className="text-base text-muted-foreground max-w-2xl">
                GVine PRO 전문가들이 엄선한 주요 인사이트와 노하우를 확인해보세요.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-secondary/30 rounded-lg border border-border/20 overflow-hidden hover:border-point/30 transition-all duration-300 flex flex-col md:flex-row"
                >
                  <div className="md:w-2/5 relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-medium mb-3">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                        <span className="mx-2">•</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-point text-xs font-medium hover:text-point/90 transition-colors flex items-center"
                      >
                        자세히 보기
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 블로그 포스트 목록 */}
      <section ref={postsRef} className={`py-16 ${featuredPosts.length > 0 ? "bg-secondary/30" : ""}`}>
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">최신 포스트</span>
            <h2 className="text-2xl md:text-3xl font-light mb-4">최신 인사이트와 노하우</h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              GVine PRO 전문가들이 공유하는 최신 인사이트와 노하우를 확인해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-secondary/50 rounded-lg border border-border/20 overflow-hidden hover:border-point/30 transition-all duration-300 h-full flex flex-col"
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-point text-xs font-medium hover:text-point/90 transition-colors"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-secondary/30 rounded-lg border border-border/20 p-8">
              <p className="text-muted-foreground mb-4">검색 결과가 없습니다.</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("전체")
                }}
                className="text-point hover:text-point/90 transition-colors text-sm"
              >
                모든 포스트 보기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section ref={ctaRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-center">전문가의 노하우가 필요하신가요?</h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
              GVine PRO의 전문가들이 여러분의 비즈니스 성장을 도와드립니다. 지금 바로 문의하세요.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/subscription">
                <RippleButton className="btn bg-point text-white hover:bg-point/90 group py-2.5 px-5 text-sm">
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


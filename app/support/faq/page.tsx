"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Mail, MapPin, Phone, Star, CheckCircle, ArrowRight, Search, HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import RippleButton from "@/components/ripple-button"

export default function FAQPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    agreement: false,
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const heroRef = useRef(null)
  const faqRef = useRef(null)
  const contactRef = useRef(null)
  const formRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const faqInView = useInView(faqRef, { once: true })
  const contactInView = useInView(contactRef, { once: true })
  const formInView = useInView(formRef, { once: true })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreement: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 폼 제출 로직 추가
    console.log("Form submitted:", formData)
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.")
    // 폼 초기화
    setFormData({
      name: "",
      email: "",
      message: "",
      agreement: false,
    })
  }

  const faqCategories = [
    { id: "all", name: "전체" },
    { id: "service", name: "서비스" },
    { id: "pricing", name: "가격" },
    { id: "technical", name: "기술" },
    { id: "support", name: "지원" },
  ]

  const faqs = [
    {
      id: "item-1",
      category: "service",
      question: "서비스는 어떻게 이루어지나요?",
      answer:
        "저희 서비스는 기획부터 판매까지 모든 과정을 원스톱으로 제공합니다. 고객님의 요구에 맞춰 맞춤형 솔루션을 제공합니다. 전문 팀이 협력하여 최상의 결과를 보장합니다.",
    },
    {
      id: "item-2",
      category: "pricing",
      question: "비용은 얼마나 되나요?",
      answer:
        "비용은 프로젝트의 규모와 복잡성에 따라 달라집니다. 초기 상담을 통해 예산을 논의할 수 있습니다. 고객님께 최적의 가치를 제공드리겠습니다.",
    },
    {
      id: "item-3",
      category: "service",
      question: "작업 기간은 어떻게 되나요?",
      answer:
        "작업 기간은 프로젝트의 종류에 따라 다릅니다. 일반적으로 초기 상담 후 예상 일정을 안내해 드립니다. 고객님의 일정에 맞춰 최대한 빠르게 진행하도록 노력합니다.",
    },
    {
      id: "item-4",
      category: "service",
      question: "어떤 분야를 다루나요?",
      answer:
        "저희는 기획, 디자인, 영상 제작, 개발 등 다양한 분야를 다룹니다. 고객님의 필요에 따라 맞춤형 서비스를 제공합니다. 모든 분야의 전문가들이 함께합니다.",
    },
    {
      id: "item-5",
      category: "support",
      question: "상담은 어떻게 하나요?",
      answer:
        "상담은 전화 또는 이메일로 가능합니다. 저희 웹사이트의 상담 요청 양식을 통해 간편하게 신청하실 수 있습니다. 빠른 시일 내에 연락드리겠습니다.",
    },
    {
      id: "item-6",
      category: "technical",
      question: "기술 지원은 어떻게 받을 수 있나요?",
      answer:
        "기술 지원은 이메일, 전화 또는 웹사이트의 문의 양식을 통해 요청하실 수 있습니다. 전문 기술팀이 신속하게 대응하여 문제를 해결해 드립니다.",
    },
    {
      id: "item-7",
      category: "pricing",
      question: "결제 방법은 어떻게 되나요?",
      answer:
        "신용카드, 계좌이체, 페이팔 등 다양한 결제 방법을 지원합니다. 프로젝트 규모에 따라 분할 결제도 가능합니다. 자세한 내용은 상담 시 안내해 드립니다.",
    },
    {
      id: "item-8",
      category: "technical",
      question: "시스템 요구사항은 무엇인가요?",
      answer:
        "저희 서비스는 대부분의 최신 웹 브라우저에서 작동합니다. 특정 기능은 Chrome, Firefox, Safari 최신 버전에서 최적화되어 있습니다. 모바일 기기에서도 완벽하게 작동합니다.",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen">
      <Header />

      {/* 히어로 섹션 */}
      <section ref={heroRef} className="relative pt-32 pb-20 bg-gradient-to-b from-secondary/40 to-background">
        <div className="absolute inset-0 z-0 noise-bg opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-point/10 text-point mb-4">
                <Star className="h-3.5 w-3.5 mr-2" />
                <span className="text-xs font-medium">고객 지원</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                자주 묻는 질문 <span className="text-point">FAQ</span>
              </h1>
              <p className="text-base text-muted-foreground mb-8 max-w-lg">
                고객님들이 자주 묻는 질문과 그에 대한 답변을 확인해보세요. 더 궁금한 점이 있으시면 언제든지
                문의해주세요.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#faq-section">
                  <RippleButton className="btn btn-primary py-2.5 px-5 text-sm">질문 확인하기</RippleButton>
                </Link>
                <Link href="#contact-section">
                  <Button variant="outline" className="py-2.5 px-5 text-sm">
                    문의하기
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden border border-border/20 shadow-lg aspect-[4/3]">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="고객 지원 팀"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* 플로팅 카드 */}
              <div className="absolute -bottom-6 -right-6 bg-background rounded-lg p-4 shadow-lg border border-border/20 max-w-[240px]">
                <div className="flex items-start gap-3">
                  <div className="bg-point/10 p-2 rounded-full">
                    <HelpCircle className="h-5 w-5 text-point" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">빠른 응답</h4>
                    <p className="text-xs text-muted-foreground">
                      평균 응답 시간 <span className="font-medium text-foreground">2시간 이내</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ 검색 섹션 */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="질문 검색하기..."
                className="pl-10 py-6 bg-secondary/20 border-border/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ 카테고리 및 아코디언 섹션 */}
      <section id="faq-section" ref={faqRef} className="py-16 bg-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-point text-white"
                      : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border border-border/20 rounded-lg px-6 py-2 bg-background shadow-sm"
                  >
                    <AccordionTrigger className="text-base font-medium text-left hover:text-point">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12 bg-background rounded-lg border border-border/20">
                <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  다른 검색어를 입력하거나 다른 카테고리를 선택해 보세요.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                >
                  모든 FAQ 보기
                </Button>
              </div>
            )}

            <div className="mt-12 text-center">
              <h3 className="text-xl font-medium mb-4">추가 질문이 있나요?</h3>
              <p className="text-sm text-muted-foreground mb-6">더 궁금한 점이 있으시면 언제든지 문의해주세요.</p>
              <Link href="#contact-section">
                <RippleButton className="btn btn-primary py-2.5 px-5 text-sm">
                  문의하기 <ArrowRight className="ml-2 h-4 w-4" />
                </RippleButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact us 섹션 */}
      <section id="contact-section" ref={contactRef} className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12 text-center">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">연락처</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4">Contact us</h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                궁금한 점이 있으시면 언제든지 연락주세요. 빠른 시일 내에 답변 드리겠습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              {/* 왼쪽: 연락처 정보 */}
              <div className="lg:col-span-5 space-y-8">
                {/* 이메일 */}
                <div className="flex items-start p-6 bg-secondary/20 rounded-lg border border-border/20 transition-all hover:shadow-md">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-point/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-point" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Email</h3>
                    <a
                      href="mailto:grapevineceo@naver.com"
                      className="text-sm text-muted-foreground hover:text-point hover:underline"
                    >
                      grapevineceo@naver.com
                    </a>
                  </div>
                </div>

                {/* 전화번호 */}
                <div className="flex items-start p-6 bg-secondary/20 rounded-lg border border-border/20 transition-all hover:shadow-md">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-point/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-point" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Phone</h3>
                    <a
                      href="tel:+82-070-4616-7360"
                      className="text-sm text-muted-foreground hover:text-point hover:underline"
                    >
                      +82 070-4616-7360
                    </a>
                  </div>
                </div>

                {/* 주소 */}
                <div className="flex items-start p-6 bg-secondary/20 rounded-lg border border-border/20 transition-all hover:shadow-md">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-point/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-point" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Office</h3>
                    <p className="text-sm text-muted-foreground">강원도 고성군 토성면 청간길 11-6</p>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 지도 */}
              <div className="lg:col-span-7">
                <div className="bg-secondary/20 rounded-lg overflow-hidden h-80 lg:h-full relative border border-border/20 shadow-md">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                  {/* 실제 지도 API를 사용할 경우 여기에 구현 */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 문의하기 폼 섹션 */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-12 text-center">
              <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">문의하기</span>
              <h2 className="text-2xl md:text-3xl font-light mb-4">문의사항을 남겨주세요</h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                접수된 내용을 검토한 뒤, 담당자가 빠른 시일 내에 연락드리겠습니다.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-background p-8 rounded-lg border border-border/20 shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    이름
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 bg-secondary/20 border-border/20"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 bg-secondary/20 border-border/20"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium">
                  메시지
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="메시지를 입력해주세요."
                  className="mt-1 h-32 bg-secondary/20 border-border/20"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="agreement" checked={formData.agreement} onCheckedChange={handleCheckboxChange} required />
                <Label htmlFor="agreement" className="text-xs">
                  개인정보 수집에 동의합니다
                </Label>
              </div>

              <div className="text-center pt-4">
                <RippleButton type="submit" className="btn btn-primary py-2.5 px-8 text-sm">
                  제출하기
                </RippleButton>
              </div>
            </form>

            {/* 자주 묻는 질문 배지 */}
            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-sm">
                <CheckCircle className="h-4 w-4 text-point" />
                <span>
                  대부분의 문의는 <span className="font-medium">2시간 이내</span>에 답변됩니다
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm text-point block mb-2 uppercase tracking-wider font-medium">시작하기</span>
            <h2 className="text-3xl md:text-4xl font-light mb-6">더 궁금한 점이 있으신가요?</h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              저희 전문가 팀이 귀하의 모든 질문에 답변해 드립니다. 지금 바로 상담을 신청하세요.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/support/contact">
                <RippleButton className="btn btn-primary py-3 px-6">상담 신청하기</RippleButton>
              </Link>
              <Link href="/subscription">
                <Button variant="outline" className="py-3 px-6">
                  서비스 둘러보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


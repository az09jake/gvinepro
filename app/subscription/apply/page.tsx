"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  CheckCircle,
  ArrowRight,
  Building,
  User,
  Mail,
  Phone,
  MessageSquare,
  CreditCard,
  Calendar,
} from "lucide-react"

export default function SubscriptionApplyPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessType: "",
    serviceType: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    billingAddress: "",
    message: "",
    agreement: false,
    termsAgreement: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, businessType: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 폼 제출 로직 추가
    console.log("Form submitted:", formData)
    alert("구독 신청이 완료되었습니다. 감사합니다!")
    // 폼 초기화
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessType: "",
      serviceType: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      billingAddress: "",
      message: "",
      agreement: false,
      termsAgreement: false,
    })
  }

  // Animation refs
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const benefitsRef = useRef(null)
  const ctaRef = useRef(null)

  // InView states
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const formInView = useInView(formRef, { once: true, amount: 0.3 })
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 })

  return (
    <main className="min-h-screen">
      <Header />

      {/* 히어로 섹션 */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative pt-32 pb-16 bg-gradient-to-br from-secondary/30 via-secondary/20 to-background"
      >
        <div className="absolute inset-0 z-0 noise-bg opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 text-xs font-medium mb-4">
                <Star className="w-3 h-3 mr-1 text-point" />
                <span>간편한 구독 신청</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                GVine PRO <span className="text-point">구독 신청</span>
              </h1>

              <p className="text-base text-muted-foreground mb-8 max-w-2xl">
                GVine PRO 서비스를 바로 이용하실 수 있습니다. 아래 양식을 작성하여 구독을 시작하세요.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  className="rounded-full bg-point hover:bg-point/90 text-white"
                  onClick={() => (window.location.href = "/subscription")}
                >
                  구독 플랜 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => (window.location.href = "/support/faq")}
                >
                  자주 묻는 질문
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="구독 서비스 이미지"
                  className="w-full h-auto rounded-lg"
                />

                {/* 플로팅 카드 */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                  <div className="flex items-start gap-2">
                    <div className="bg-green-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">즉시 이용 가능</p>
                      <p className="text-xs text-muted-foreground">결제 후 바로 서비스 이용</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 구독 신청 폼 섹션 */}
      <motion.section
        ref={formRef}
        initial={{ opacity: 0, y: 20 }}
        animate={formInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-light mb-4">구독 정보 입력</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                아래 양식을 작성하여 GVine PRO 서비스 구독을 시작하세요. 결제 정보를 입력하시면 즉시 서비스 이용이
                가능합니다.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-secondary/30 p-8 rounded-xl shadow-lg border border-border/20"
            >
              {/* 개인 정보 섹션 */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b border-border/20">개인 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium flex items-center text-foreground">
                      <User className="h-4 w-4 mr-2 text-point/70" />
                      이름
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium flex items-center text-foreground">
                      <User className="h-4 w-4 mr-2 text-point/70" />성
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center text-foreground">
                      <Mail className="h-4 w-4 mr-2 text-point/70" />
                      이메일
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium flex items-center text-foreground">
                      <Phone className="h-4 w-4 mr-2 text-point/70" />
                      전화번호
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 비즈니스 정보 섹션 */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b border-border/20">비즈니스 정보</h3>
                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-sm font-medium flex items-center text-foreground">
                    <Building className="h-4 w-4 mr-2 text-point/70" />
                    비즈니스 유형
                  </Label>
                  <Select value={formData.businessType} onValueChange={handleSelectChange} required>
                    <SelectTrigger
                      id="businessType"
                      className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                    >
                      <SelectValue placeholder="선택하기" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">스타트업</SelectItem>
                      <SelectItem value="small">소규모 비즈니스</SelectItem>
                      <SelectItem value="medium">중견기업</SelectItem>
                      <SelectItem value="large">대기업</SelectItem>
                      <SelectItem value="individual">개인사업자</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 mt-6">
                  <Label className="text-sm font-medium flex items-center text-foreground">
                    <MessageSquare className="h-4 w-4 mr-2 text-point/70" />
                    구독 플랜 선택
                  </Label>
                  <RadioGroup
                    value={formData.serviceType}
                    onValueChange={handleRadioChange}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2"
                    required
                  >
                    <div className="flex items-start space-x-2 bg-secondary/20 p-3 rounded-lg border border-border/20 hover:bg-secondary/40 transition-colors">
                      <RadioGroupItem value="monthly" id="monthly" className="mt-1" />
                      <div>
                        <Label htmlFor="monthly" className="text-sm font-medium cursor-pointer">
                          월간 구독 - ₩99,000/월
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">매월 자동 갱신, 언제든지 해지 가능</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 bg-secondary/20 p-3 rounded-lg border border-border/20 hover:bg-secondary/40 transition-colors">
                      <RadioGroupItem value="annual" id="annual" className="mt-1" />
                      <div>
                        <Label htmlFor="annual" className="text-sm font-medium cursor-pointer">
                          연간 구독 - ₩948,000/년
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">20% 할인 혜택, 연 1회 결제</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 bg-secondary/20 p-3 rounded-lg border border-border/20 hover:bg-secondary/40 transition-colors">
                      <RadioGroupItem value="team" id="team" className="mt-1" />
                      <div>
                        <Label htmlFor="team" className="text-sm font-medium cursor-pointer">
                          팀 구독 - ₩249,000/월
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">최대 5명까지, 추가 인원당 ₩40,000</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 bg-secondary/20 p-3 rounded-lg border border-border/20 hover:bg-secondary/40 transition-colors">
                      <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
                      <div>
                        <Label htmlFor="enterprise" className="text-sm font-medium cursor-pointer">
                          기업 맞춤형
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">귀사에 맞는 커스텀 플랜 제공</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* 결제 정보 섹션 */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b border-border/20">결제 정보</h3>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-sm font-medium flex items-center text-foreground">
                    <CreditCard className="h-4 w-4 mr-2 text-point/70" />
                    카드 번호
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                    className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry" className="text-sm font-medium flex items-center text-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-point/70" />
                      만료일
                    </Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardCvc" className="text-sm font-medium flex items-center text-foreground">
                      <CreditCard className="h-4 w-4 mr-2 text-point/70" />
                      CVC
                    </Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      placeholder="123"
                      className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="billingAddress" className="text-sm font-medium flex items-center text-foreground">
                    <Building className="h-4 w-4 mr-2 text-point/70" />
                    청구지 주소
                  </Label>
                  <Input
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    className="rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                    required
                  />
                </div>
              </div>

              {/* 추가 요청사항 */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium flex items-center text-foreground">
                  <MessageSquare className="h-4 w-4 mr-2 text-point/70" />
                  추가 요청사항 (선택)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="추가 요청사항이 있으시면 입력해주세요."
                  className="h-24 rounded-lg bg-secondary/20 border-border/20 focus-visible:ring-point/30 text-foreground"
                />
              </div>

              {/* 동의 사항 */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2 bg-secondary/20 p-4 rounded-lg border border-border/20">
                  <Checkbox
                    id="agreement"
                    checked={formData.agreement}
                    onCheckedChange={(checked) => handleCheckboxChange("agreement", checked === true)}
                    className="mt-1 data-[state=checked]:bg-point data-[state=checked]:border-point"
                    required
                  />
                  <div>
                    <Label htmlFor="agreement" className="text-sm font-medium cursor-pointer">
                      개인정보 수집 및 이용 동의
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      제공해주신 정보는 서비스 제공 및 결제 처리 목적으로만 사용되며, 관련 법률에 의거하여 안전하게
                      보관됩니다. 자세한 내용은{" "}
                      <a href="#" className="text-point underline">
                        개인정보처리방침
                      </a>
                      을 참고하세요.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 bg-secondary/20 p-4 rounded-lg border border-border/20">
                  <Checkbox
                    id="termsAgreement"
                    checked={formData.termsAgreement}
                    onCheckedChange={(checked) => handleCheckboxChange("termsAgreement", checked === true)}
                    className="mt-1 data-[state=checked]:bg-point data-[state=checked]:border-point"
                    required
                  />
                  <div>
                    <Label htmlFor="termsAgreement" className="text-sm font-medium cursor-pointer">
                      이용약관 동의
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      GVine PRO 서비스 이용약관에 동의합니다. 구독은 선택한 플랜에 따라 자동으로 갱신되며, 언제든지 계정
                      설정에서 해지할 수 있습니다. 자세한 내용은{" "}
                      <a href="#" className="text-point underline">
                        이용약관
                      </a>
                      을 참고하세요.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-center">
                <Button
                  type="submit"
                  className="bg-point hover:bg-point/90 text-white px-8 py-6 text-sm rounded-full min-w-[200px]"
                >
                  구독 결제하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>

      {/* 구독 혜택 섹션 */}
      <motion.section
        ref={benefitsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-20 bg-secondary/30"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light mb-4">구독 시 받는 혜택</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">GVine PRO 구독을 통해 다양한 혜택을 누려보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "전담 매니저 배정",
                description: "전문 지식을 갖춘 전담 매니저가 귀사의 비즈니스를 지원합니다.",
                icon: <User className="h-6 w-6 text-point" />,
              },
              {
                title: "우선 지원",
                description: "기술 지원 및 문의 사항에 대해 우선적으로 응대해드립니다.",
                icon: <CheckCircle className="h-6 w-6 text-point" />,
              },
              {
                title: "맞춤형 솔루션",
                description: "귀사의 비즈니스 요구사항에 맞는 맞춤형 솔루션을 제공합니다.",
                icon: <Building className="h-6 w-6 text-point" />,
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border/10"
              >
                <div className="bg-secondary/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA 섹션 */}
      <motion.section
        ref={ctaRef}
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-20 bg-gradient-to-br from-secondary/40 via-secondary/20 to-background"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6">
              지금 바로 GVine PRO와 함께 <span className="text-point">비즈니스를 성장</span>시켜보세요
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              구독 신청 후 즉시 서비스 이용이 가능합니다. 궁금한 점이 있으시면 언제든지 문의해주세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="rounded-full bg-point hover:bg-point/90 text-white px-8 py-6">
                구독 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6"
                onClick={() => (window.location.href = "/support/contact")}
              >
                문의하기
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}


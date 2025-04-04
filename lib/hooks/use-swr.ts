import useSWR from "swr"

// 데이터 페칭 함수
const fetcher = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.")
  }

  return response.json()
}

// 모의 API 응답을 위한 함수
export const mockFetcher = async (url: string) => {
  // 실제 구현에서는 이 부분이 실제 API 호출로 대체됩니다.
  console.log(`Fetching data from: ${url}`)

  // 지연 시간 추가 (실제 API 호출 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 500))

  // URL에 따라 다른 모의 데이터 반환
  if (url.includes("/api/posts")) {
    return mockPosts
  } else if (url.includes("/api/subscriptions")) {
    return mockSubscriptions
  } else if (url.includes("/api/inquiries")) {
    return mockInquiries
  } else if (url.includes("/api/analytics")) {
    return mockAnalytics
  } else if (url.includes("/api/settings")) {
    return mockSettings
  } else if (url.includes("/api/users")) {
    return mockUsers
  } else if (url.includes("/api/media")) {
    return mockMedia
  }

  return { error: "Unknown API endpoint" }
}

// 모의 데이터
const mockPosts = [
  {
    id: 1,
    title: "AI와 전문가의 협업, 비즈니스 효율성을 극대화하는 방법",
    excerpt:
      "AI 기술과 전문가의 노하우가 결합했을 때 얻을 수 있는 시너지 효과와 비즈니스 성과 향상 방안에 대해 알아봅니다.",
    content: `<p>최근 인공지능(AI) 기술의 발전으로 많은 기업들이 AI를 도입하고 있습니다. 그러나 AI만으로는 완벽한 비즈니스 솔루션을 제공하기 어렵습니다. 진정한 효율성 극대화는 AI와 전문가의 협업에서 비롯됩니다.</p>
    
    <h2>AI와 전문가 협업의 장점</h2>
    
    <p>AI는 방대한 데이터를 빠르게 분석하고 패턴을 찾아내는 데 탁월합니다. 반면, 인간 전문가는 창의적 사고, 감성 지능, 윤리적 판단 등 AI가 아직 완벽하게 구현하지 못하는 영역에서 강점을 보입니다.</p>`,
    category: "AI",
    tags: "AI, 비즈니스 효율성, 전문가 협업, 디지털 전환",
    author: "김경환",
    date: "2023-05-15",
    status: "published",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    views: 1245,
  },
  {
    id: 2,
    title: "디지털 마케팅의 새로운 패러다임, AI 기반 타겟팅",
    excerpt: "AI를 활용한 정밀 타겟팅으로 마케팅 효율을 높이고 ROI를 극대화하는 최신 전략을 소개합니다.",
    content: `<p>디지털 마케팅 환경은 빠르게 변화하고 있으며, AI 기술의 발전으로 타겟팅 방식에도 혁신적인 변화가 일어나고 있습니다. 이 글에서는 AI 기반 타겟팅의 최신 트렌드와 효과적인 활용 방법에 대해 알아보겠습니다.</p>`,
    category: "마케팅",
    tags: "디지털 마케팅, AI 타겟팅, 마케팅 자동화, 데이터 분석",
    author: "김영주",
    date: "2023-06-02",
    status: "published",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    views: 982,
  },
  // 추가 포스트 데이터...
]

const mockSubscriptions = [
  {
    id: 1,
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    businessType: "스타트업",
    serviceType: "monthly",
    date: "2023-08-15",
    status: "completed",
    message: "원스톱 솔루션에 관심이 있어 문의드립니다.",
  },
  // 추가 구독 데이터...
]

const mockInquiries = [
  {
    id: 1,
    subject: "서비스 이용 문의",
    name: "박지민",
    email: "park@example.com",
    message: "서비스 이용 방법에 대해 자세히 알고 싶습니다.",
    date: "2023-08-16",
    status: "unanswered",
  },
  // 추가 문의 데이터...
]

const mockAnalytics = {
  summary: {
    visitors: 12543,
    pageViews: 45721,
    subscriptions: 32,
    inquiries: 78,
  },
  traffic: {
    daily: [
      { date: "2023-08-01", visitors: 320, pageViews: 1250 },
      { date: "2023-08-02", visitors: 340, pageViews: 1300 },
      // 추가 트래픽 데이터...
    ],
    sources: [
      { source: "직접 접속", visitors: 3500, percentage: 28 },
      { source: "검색 엔진", visitors: 5200, percentage: 41 },
      { source: "소셜 미디어", visitors: 2100, percentage: 17 },
      { source: "외부 링크", visitors: 1743, percentage: 14 },
    ],
    pages: [
      { page: "홈페이지", views: 12500, percentage: 27 },
      { page: "블로그", views: 9800, percentage: 21 },
      { page: "서비스 소개", views: 7600, percentage: 17 },
      { page: "구독 안내", views: 6200, percentage: 14 },
      { page: "고객센터", views: 5100, percentage: 11 },
      { page: "기타", views: 4521, percentage: 10 },
    ],
  },
  subscriptions: {
    monthly: [
      { month: "1월", count: 12 },
      { month: "2월", count: 15 },
      // 추가 구독 데이터...
    ],
    serviceTypes: [
      { type: "월간 구독", count: 45, percentage: 56 },
      { type: "월정성 구독", count: 20, percentage: 25 },
      { type: "일부 서비스", count: 12, percentage: 15 },
      { type: "기타", count: 3, percentage: 4 },
    ],
    businessTypes: [
      { type: "스타트업", count: 28, percentage: 35 },
      { type: "소규모 비즈니스", count: 32, percentage: 40 },
      { type: "중견기업", count: 15, percentage: 19 },
      { type: "대기업", count: 5, percentage: 6 },
    ],
  },
  posts: {
    popular: [
      { id: 1, title: "AI와 전문가의 협업, 비즈니스 효율성을 극대화하는 방법", views: 1245 },
      { id: 2, title: "디지털 마케팅의 새로운 패러다임, AI 기반 타겟팅", views: 982 },
      // 추가 인기 포스트 데이터...
    ],
    categories: [
      { category: "AI", count: 8, views: 4500 },
      { category: "마케팅", count: 6, views: 3200 },
      { category: "디자인", count: 5, views: 2800 },
      { category: "개발", count: 7, views: 3100 },
      { category: "콘텐츠", count: 4, views: 2200 },
      { category: "운영", count: 3, views: 1900 },
    ],
  },
}

const mockSettings = {
  general: {
    siteName: "GVine PRO",
    siteDescription: "다양한 AI agent를 활용해서 고객사의 프로젝트를 성공시켜주는 원스톱 토탈 에이전시",
    contactEmail: "grapevineceo@naver.com",
    contactPhone: "+82 070-4616-7360",
    contactAddress: "강원도 고성군 토성면 청간길 11-6",
  },
  blog: {
    postsPerPage: 10,
    allowComments: true,
    moderateComments: true,
    defaultCategory: "AI",
  },
}

const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@gvinepro.com",
    role: "admin",
    name: "관리자",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    username: "editor",
    email: "editor@gvinepro.com",
    role: "editor",
    name: "에디터",
    createdAt: "2023-02-15",
  },
  {
    id: 3,
    username: "author",
    email: "author@gvinepro.com",
    role: "author",
    name: "작성자",
    createdAt: "2023-03-20",
  },
]

const mockMedia = [
  {
    id: 1,
    name: "hero-image.jpg",
    url: "/placeholder.svg?height=600&width=1200&text=hero-image.jpg",
    type: "image/jpeg",
    size: 1024000,
    dimensions: { width: 1200, height: 600 },
    uploadedAt: "2023-08-01",
  },
  {
    id: 2,
    name: "profile-photo.jpg",
    url: "/placeholder.svg?height=400&width=400&text=profile-photo.jpg",
    type: "image/jpeg",
    size: 512000,
    dimensions: { width: 400, height: 400 },
    uploadedAt: "2023-08-05",
  },
  {
    id: 3,
    name: "product-banner.png",
    url: "/placeholder.svg?height=500&width=1000&text=product-banner.png",
    type: "image/png",
    size: 768000,
    dimensions: { width: 1000, height: 500 },
    uploadedAt: "2023-08-10",
  },
  {
    id: 4,
    name: "team-photo.jpg",
    url: "/placeholder.svg?height=800&width=1200&text=team-photo.jpg",
    type: "image/jpeg",
    size: 1536000,
    dimensions: { width: 1200, height: 800 },
    uploadedAt: "2023-08-15",
  },
  {
    id: 5,
    name: "logo.svg",
    url: "/placeholder.svg?height=200&width=200&text=logo.svg",
    type: "image/svg+xml",
    size: 24000,
    dimensions: { width: 200, height: 200 },
    uploadedAt: "2023-08-20",
  },
  {
    id: 6,
    name: "background-pattern.png",
    url: "/placeholder.svg?height=600&width=600&text=background-pattern.png",
    type: "image/png",
    size: 384000,
    dimensions: { width: 600, height: 600 },
    uploadedAt: "2023-08-25",
  },
]

// SWR 훅 함수
export function useData(url: string) {
  const { data, error, isLoading, mutate } = useSWR(url, mockFetcher)

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}


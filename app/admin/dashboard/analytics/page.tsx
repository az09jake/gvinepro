"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useData } from "@/lib/hooks/use-swr"
import LineChart from "@/components/admin/charts/line-chart"
import BarChart from "@/components/admin/charts/bar-chart"
import PieChart from "@/components/admin/charts/pie-chart"
import AreaChart from "@/components/admin/charts/area-chart"

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("month")
  const { data: analyticsData, isLoading } = useData("/api/analytics")

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light">통계 분석</h1>
          <p className="text-muted-foreground">데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    )
  }

  // 트래픽 데이터 변환
  const trafficData = analyticsData?.traffic?.daily || []

  // 트래픽 소스 데이터 변환
  const trafficSourceData =
    analyticsData?.traffic?.sources.map((source: any) => ({
      name: source.source,
      value: source.visitors,
      color: getRandomColor(source.source),
    })) || []

  // 페이지별 방문자 데이터 변환
  const pageViewsData = analyticsData?.traffic?.pages || []

  // 구독 신청 추이 데이터 변환
  const subscriptionData = analyticsData?.subscriptions?.monthly || []

  // 서비스 유형별 구독 데이터 변환
  const serviceTypeData =
    analyticsData?.subscriptions?.serviceTypes.map((type: any) => ({
      name: type.type,
      value: type.count,
      color: getRandomColor(type.type),
    })) || []

  // 비즈니스 유형별 구독 데이터 변환
  const businessTypeData =
    analyticsData?.subscriptions?.businessTypes.map((type: any) => ({
      name: type.type,
      value: type.count,
      color: getRandomColor(type.type),
    })) || []

  // 카테고리별 포스트 데이터 변환
  const categoryData = analyticsData?.posts?.categories || []

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-light">통계 분석</h1>
        <p className="text-muted-foreground">웹사이트 트래픽, 구독 신청, 문의 내용 등의 통계를 분석하세요.</p>
      </div>

      {/* 기간 선택 */}
      <div className="flex justify-end">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">최근 7일</SelectItem>
            <SelectItem value="month">최근 30일</SelectItem>
            <SelectItem value="quarter">최근 3개월</SelectItem>
            <SelectItem value="year">최근 1년</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 요약 통계 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">총 방문자 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.summary?.visitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +18%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">페이지 뷰</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.summary?.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +24%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">구독 신청</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.summary?.subscriptions}</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +8%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">문의 내용</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.summary?.inquiries}</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +15%</p>
          </CardContent>
        </Card>
      </div>

      {/* 차트 */}
      <Tabs defaultValue="traffic">
        <TabsList>
          <TabsTrigger value="traffic">트래픽</TabsTrigger>
          <TabsTrigger value="subscriptions">구독 신청</TabsTrigger>
          <TabsTrigger value="inquiries">문의 내용</TabsTrigger>
          <TabsTrigger value="posts">블로그 포스트</TabsTrigger>
        </TabsList>
        <TabsContent value="traffic" className="space-y-6">
          <LineChart
            title="방문자 통계"
            description="기간별 웹사이트 방문자 수 추이"
            data={trafficData}
            xAxisKey="date"
            lines={[
              { key: "visitors", name: "방문자 수", color: "#7124d7" },
              { key: "pageViews", name: "페이지 뷰", color: "#9a65ff" },
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChart title="트래픽 소스" description="방문자 유입 경로 분석" data={trafficSourceData} />
            <BarChart
              title="페이지별 방문자"
              description="가장 많이 방문한 페이지 순위"
              data={pageViewsData}
              xAxisKey="page"
              bars={[{ key: "views", name: "조회수", color: "#7124d7" }]}
            />
          </div>
        </TabsContent>
        <TabsContent value="subscriptions" className="space-y-6">
          <AreaChart
            title="구독 신청 추이"
            description="기간별 구독 신청 수 추이"
            data={subscriptionData}
            xAxisKey="month"
            areas={[{ key: "count", name: "구독 신청 수", color: "#7124d7" }]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChart title="서비스 유형별 구독" description="서비스 유형별 구독 신청 비율" data={serviceTypeData} />
            <PieChart
              title="비즈니스 유형별 구독"
              description="비즈니스 유형별 구독 신청 비율"
              data={businessTypeData}
              innerRadius={40}
              outerRadius={80}
            />
          </div>
        </TabsContent>
        <TabsContent value="inquiries" className="space-y-6">
          <LineChart
            title="문의 내용 추이"
            description="기간별 문의 내용 수 추이"
            data={[
              { date: "1월", count: 12 },
              { date: "2월", count: 15 },
              { date: "3월", count: 18 },
              { date: "4월", count: 22 },
              { date: "5월", count: 28 },
              { date: "6월", count: 32 },
              { date: "7월", count: 38 },
              { date: "8월", count: 42 },
            ]}
            xAxisKey="date"
            lines={[{ key: "count", name: "문의 수", color: "#7124d7" }]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChart
              title="문의 유형별 분포"
              description="문의 유형별 비율"
              data={[
                { name: "서비스 이용", value: 35, color: "#7124d7" },
                { name: "구독 취소", value: 20, color: "#9a65ff" },
                { name: "견적 문의", value: 15, color: "#ff6b6b" },
                { name: "기술 지원", value: 10, color: "#4ecdc4" },
                { name: "협업 제안", value: 12, color: "#ffbe0b" },
                { name: "기타", value: 8, color: "#8d99ae" },
              ]}
            />
            <PieChart
              title="응답 상태별 분포"
              description="응답 상태별 문의 내용 비율"
              data={[
                { name: "응답 완료", value: 45, color: "#4ecdc4" },
                { name: "검토 중", value: 30, color: "#ffbe0b" },
                { name: "미응답", value: 25, color: "#ff6b6b" },
              ]}
              innerRadius={40}
              outerRadius={80}
            />
          </div>
        </TabsContent>
        <TabsContent value="posts" className="space-y-6">
          <LineChart
            title="블로그 포스트 조회수"
            description="기간별 블로그 포스트 조회수 추이"
            data={[
              { date: "1월", views: 1200 },
              { date: "2월", views: 1500 },
              { date: "3월", views: 1800 },
              { date: "4월", views: 2200 },
              { date: "5월", views: 2800 },
              { date: "6월", views: 3200 },
              { date: "7월", views: 3800 },
              { date: "8월", views: 4200 },
            ]}
            xAxisKey="date"
            lines={[{ key: "views", name: "조회수", color: "#7124d7" }]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChart
              title="인기 포스트"
              description="가장 많이 조회된 포스트 순위"
              data={analyticsData?.posts?.popular || []}
              xAxisKey="title"
              bars={[{ key: "views", name: "조회수", color: "#7124d7" }]}
            />
            <BarChart
              title="카테고리별 포스트"
              description="카테고리별 포스트 수 및 조회수"
              data={categoryData}
              xAxisKey="category"
              bars={[
                { key: "count", name: "포스트 수", color: "#7124d7" },
                { key: "views", name: "조회수", color: "#9a65ff" },
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 랜덤 색상 생성 함수 (실제로는 일관된 색상 팔레트를 사용하는 것이 좋습니다)
function getRandomColor(seed: string) {
  // 시드 문자열을 숫자로 변환
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  // 미리 정의된 색상 배열
  const colors = [
    "#7124d7", // 포인트 컬러
    "#9a65ff",
    "#ff6b6b",
    "#4ecdc4",
    "#ffbe0b",
    "#8d99ae",
    "#f72585",
    "#4361ee",
    "#4cc9f0",
    "#560bad",
    "#f15bb5",
    "#00bbf9",
  ]

  // 시드를 사용하여 색상 배열에서 선택
  const index = Math.abs(hash) % colors.length
  return colors[index]
}


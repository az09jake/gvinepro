"use client"

import { DashboardWidget } from "@/components/admin/dashboard-widget"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// 샘플 데이터
const data = [
  { name: "홈", views: 4000 },
  { name: "블로그", views: 3000 },
  { name: "제품", views: 2000 },
  { name: "가격", views: 2780 },
  { name: "문의", views: 1890 },
  { name: "소개", views: 2390 },
]

interface PageViewsWidgetProps {
  id: string
  onRemove?: (id: string) => void
  onResize?: (id: string, size: "sm" | "md" | "lg" | "xl") => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function PageViewsWidget({ id, onRemove, onResize, size = "md" }: PageViewsWidgetProps) {
  return (
    <DashboardWidget
      id={id}
      title="페이지 조회수"
      description="가장 많이 조회된 페이지를 확인합니다."
      onRemove={onRemove}
      onResize={onResize}
      size={size}
    >
      <div className="space-y-4">
        <div className={`h-${size === "sm" ? "40" : size === "md" ? "60" : size === "lg" ? "80" : "96"}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div>총 조회수: {data.reduce((sum, item) => sum + item.views, 0).toLocaleString()}회</div>
          <div>
            평균: {Math.round(data.reduce((sum, item) => sum + item.views, 0) / data.length).toLocaleString()}회
          </div>
        </div>
      </div>
    </DashboardWidget>
  )
}


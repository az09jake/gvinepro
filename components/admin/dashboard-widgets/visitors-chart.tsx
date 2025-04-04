"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardWidget } from "@/components/admin/dashboard-widget"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// 샘플 데이터
const dailyData = [
  { name: "1일", value: 400 },
  { name: "2일", value: 300 },
  { name: "3일", value: 500 },
  { name: "4일", value: 280 },
  { name: "5일", value: 590 },
  { name: "6일", value: 320 },
  { name: "7일", value: 480 },
]

const weeklyData = [
  { name: "1주", value: 2400 },
  { name: "2주", value: 1398 },
  { name: "3주", value: 3200 },
  { name: "4주", value: 2780 },
]

const monthlyData = [
  { name: "1월", value: 4000 },
  { name: "2월", value: 3000 },
  { name: "3월", value: 5000 },
  { name: "4월", value: 2780 },
  { name: "5월", value: 1890 },
  { name: "6월", value: 2390 },
  { name: "7월", value: 3490 },
  { name: "8월", value: 2000 },
  { name: "9월", value: 2500 },
  { name: "10월", value: 3200 },
  { name: "11월", value: 2800 },
  { name: "12월", value: 3800 },
]

interface VisitorsChartProps {
  id: string
  onRemove?: (id: string) => void
  onResize?: (id: string, size: "sm" | "md" | "lg" | "xl") => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function VisitorsChart({ id, onRemove, onResize, size = "md" }: VisitorsChartProps) {
  const [period, setPeriod] = useState("daily")

  const data = period === "daily" ? dailyData : period === "weekly" ? weeklyData : monthlyData

  return (
    <DashboardWidget
      id={id}
      title="방문자 통계"
      description="일별, 주별, 월별 방문자 통계를 확인합니다."
      onRemove={onRemove}
      onResize={onResize}
      size={size}
    >
      <div className="space-y-4">
        <Tabs defaultValue="daily" value={period} onValueChange={setPeriod}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="daily">일별</TabsTrigger>
            <TabsTrigger value="weekly">주별</TabsTrigger>
            <TabsTrigger value="monthly">월별</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className={`h-${size === "sm" ? "40" : size === "md" ? "60" : size === "lg" ? "80" : "96"}`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div>총 방문자: {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}명</div>
          <div>
            평균: {Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length).toLocaleString()}명
          </div>
        </div>
      </div>
    </DashboardWidget>
  )
}


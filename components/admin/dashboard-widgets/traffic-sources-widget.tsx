"use client"

import { DashboardWidget } from "@/components/admin/dashboard-widget"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// 샘플 데이터
const data = [
  { name: "직접 접속", value: 400 },
  { name: "검색 엔진", value: 300 },
  { name: "소셜 미디어", value: 300 },
  { name: "외부 링크", value: 200 },
  { name: "이메일", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface TrafficSourcesWidgetProps {
  id: string
  onRemove?: (id: string) => void
  onResize?: (id: string, size: "sm" | "md" | "lg" | "xl") => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function TrafficSourcesWidget({ id, onRemove, onResize, size = "md" }: TrafficSourcesWidgetProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <DashboardWidget
      id={id}
      title="트래픽 소스"
      description="방문자 유입 경로를 확인합니다."
      onRemove={onRemove}
      onResize={onResize}
      size={size}
    >
      <div className="space-y-4">
        <div className={`h-${size === "sm" ? "40" : size === "md" ? "60" : size === "lg" ? "80" : "96"}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span>{item.name}</span>
              </div>
              <span>{((item.value / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardWidget>
  )
}


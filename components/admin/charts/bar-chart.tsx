"use client"

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DataPoint {
  [key: string]: string | number
}

interface BarChartProps {
  title: string
  description?: string
  data: DataPoint[]
  xAxisKey: string
  bars: {
    key: string
    name: string
    color: string
  }[]
  height?: number
  layout?: "vertical" | "horizontal"
}

export default function BarChart({
  title,
  description,
  data,
  xAxisKey,
  bars,
  height = 350,
  layout = "horizontal",
}: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={layout}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis
                dataKey={layout === "horizontal" ? xAxisKey : undefined}
                type={layout === "horizontal" ? "category" : "number"}
                stroke="rgba(255, 255, 255, 0.5)"
                tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
              />
              <YAxis
                dataKey={layout === "vertical" ? xAxisKey : undefined}
                type={layout === "vertical" ? "category" : "number"}
                stroke="rgba(255, 255, 255, 0.5)"
                tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Legend />
              {bars.map((bar) => (
                <Bar key={bar.key} dataKey={bar.key} name={bar.name} fill={bar.color} />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}


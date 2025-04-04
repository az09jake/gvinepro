"use client"

import {
  AreaChart as RechartsAreaChart,
  Area,
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

interface AreaChartProps {
  title: string
  description?: string
  data: DataPoint[]
  xAxisKey: string
  areas: {
    key: string
    name: string
    color: string
    fillOpacity?: number
  }[]
  height?: number
  stacked?: boolean
}

export default function AreaChart({
  title,
  description,
  data,
  xAxisKey,
  areas,
  height = 350,
  stacked = false,
}: AreaChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey={xAxisKey} stroke="rgba(255, 255, 255, 0.5)" tick={{ fill: "rgba(255, 255, 255, 0.5)" }} />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" tick={{ fill: "rgba(255, 255, 255, 0.5)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Legend />
              {areas.map((area) => (
                <Area
                  key={area.key}
                  type="monotone"
                  dataKey={area.key}
                  name={area.name}
                  stroke={area.color}
                  fill={area.color}
                  fillOpacity={area.fillOpacity || 0.3}
                  stackId={stacked ? "1" : undefined}
                />
              ))}
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}


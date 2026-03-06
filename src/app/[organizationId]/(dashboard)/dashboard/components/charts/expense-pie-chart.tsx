"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"

export interface PieChartDataPoint {
  label: string
  value: number
  color: string // hex color
}

interface ExpensePieChartProps {
  title?: string
  description?: string
  data: PieChartDataPoint[]
  valueFormatter?: (value: number) => string
  innerRadius?: number // 0 = full pie, >0 = donut
}

const defaultFormatter = (value: number) => `Rp ${value.toLocaleString("id-ID")}`

export function ExpensePieChart({
  title = "Expense Breakdown",
  description,
  data,
  valueFormatter = defaultFormatter,
  innerRadius = 60
}: ExpensePieChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-bold md:text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => valueFormatter(value)}
              contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
            />
            <Legend
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => value}
              iconType="circle"
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

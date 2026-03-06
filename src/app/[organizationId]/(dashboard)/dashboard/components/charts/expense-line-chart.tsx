"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"

export interface LineChartDataPoint {
  label: string // e.g. "Jan", "Feb", "01 Mar"
  [key: string]: string | number // flexible keys: { expenses: 120000, budget: 180000 }
}

export interface LineChartSeries {
  key: string // harus match key di data
  label: string // label di legend
  color: string // hex color
}

interface ExpenseLineChartProps {
  title?: string
  description?: string
  data: LineChartDataPoint[]
  series: LineChartSeries[]
  valueFormatter?: (value: number) => string
}

const defaultFormatter = (value: number) => `Rp ${value.toLocaleString("id-ID")}`

export function ExpenseLineChart({
  title = "Expense Trend",
  description,
  data,
  series,
  valueFormatter = defaultFormatter
}: ExpenseLineChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-bold md:text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} className="text-muted-foreground" />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => `Rp ${(v / 1000).toFixed(0)}k`}
              className="text-muted-foreground"
            />
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) => [
                valueFormatter(Number(value)),
                series.find((s) => s.key === name)?.label ?? name
              ]}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "13px"
              }}
            />
            <Legend
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => series.find((s) => s.key === value)?.label ?? value}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

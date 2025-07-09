"use client"

import { useMemo } from "react"

interface BarChartData {
  name: string
  value: number
}

interface BarChartProps {
  data: BarChartData[]
  height?: number
  color?: string
}

export function BarChart({ data, height = 300, color = "#7DD3FC" }: BarChartProps) {
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data])
  const chartWidth = 400
  const chartHeight = height - 80 // Leave space for labels
  const barWidth = (chartWidth / data.length) * 0.6
  const barSpacing = chartWidth / data.length

  return (
    <div className="w-full">
      <svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <g key={index}>
            <line
              x1={40}
              y1={40 + chartHeight * ratio}
              x2={chartWidth - 20}
              y2={40 + chartHeight * ratio}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />
            <text x={35} y={45 + chartHeight * ratio} textAnchor="end" fontSize="12" fill="#6B7280">
              {Math.round(maxValue * (1 - ratio))}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight
          const x = 40 + index * barSpacing + (barSpacing - barWidth) / 2
          const y = 40 + chartHeight - barHeight

          return (
            <g key={item.name}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                stroke="#0EA5E9"
                strokeWidth={1}
                rx={4}
                className="hover:opacity-80 transition-opacity"
              />
              <text x={x + barWidth / 2} y={40 + chartHeight + 20} textAnchor="middle" fontSize="12" fill="#6B7280">
                {item.name}
              </text>
              {/* Value on hover */}
              <title>{`${item.name}: ${item.value}`}</title>
            </g>
          )
        })}

        {/* Axes */}
        <line x1={40} y1={40} x2={40} y2={40 + chartHeight} stroke="#6B7280" strokeWidth={1} />
        <line
          x1={40}
          y1={40 + chartHeight}
          x2={chartWidth - 20}
          y2={40 + chartHeight}
          stroke="#6B7280"
          strokeWidth={1}
        />
      </svg>
    </div>
  )
}

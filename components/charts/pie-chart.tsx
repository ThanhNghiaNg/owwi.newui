"use client"

import { currency } from "@/utils/formats/number"
import { useMemo } from "react"

interface PieChartData {
  name: string
  value: number
  color: string
}

interface PieChartProps {
  data: PieChartData[]
  size?: number
}

export function PieChart({ data, size = 300 }: PieChartProps) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data])
  const radius = size / 2 - 10
  const centerX = size / 2
  const centerY = size / 2

  const slices = useMemo(() => {
    let currentAngle = -90 // Start from top
    return data.map((item) => {
      const percentage = item.value / total
      const angle = percentage * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle

      const startAngleRad = (startAngle * Math.PI) / 180
      const endAngleRad = (endAngle * Math.PI) / 180

      const x1 = centerX + radius * Math.cos(startAngleRad)
      const y1 = centerY + radius * Math.sin(startAngleRad)
      const x2 = centerX + radius * Math.cos(endAngleRad)
      const y2 = centerY + radius * Math.sin(endAngleRad)

      const largeArcFlag = angle > 180 ? 1 : 0

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ")

      // Label position
      const labelAngle = (startAngle + endAngle) / 2
      const labelAngleRad = (labelAngle * Math.PI) / 180
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(labelAngleRad)
      const labelY = centerY + labelRadius * Math.sin(labelAngleRad)

      currentAngle = endAngle

      return {
        ...item,
        pathData,
        percentage: Math.round(percentage * 100),
        labelX,
        labelY,
      }
    })
  }, [data, total, radius, centerX, centerY])

  return (
    <div className="w-full flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {slices.map((slice, index) => (
          <g key={slice.name}>
            <path
              d={slice.pathData}
              fill={slice.color}
              stroke="white"
              strokeWidth={2}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <title>{`${slice.name}: ${currency(slice.value)} (${slice.percentage}%)`}</title>
            </path>
            {slice.percentage > 5 && (
              <text
                x={slice.labelX}
                y={slice.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="bold"
                fill="white"
              >
                {slice.percentage}%
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

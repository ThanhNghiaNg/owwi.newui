"use client"

import { cn } from "@/lib/utils"
import { currency } from "@/utils/formats/number"
import React, { useCallback, useMemo } from "react"

interface PieChartData {
  name: string
  value: number
  color: string
}

interface PieChartProps {
  data: PieChartData[]
  size?: number
}

export const PieChart = React.memo(({ data, size = 300 }: PieChartProps) => {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const [hiddenSlices, setHiddenSlices] = React.useState<string[]>([])
  const total = useMemo(() => {
    const displayData = data.filter(item => !hiddenSlices.includes(item.name))
    return displayData.reduce((sum, item) => sum + item.value, 0)
  },
    [data, hiddenSlices])
  const radius = size / 2 - 10
  const centerX = size / 2
  const centerY = size / 2
  const toggleVisibleSlice = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const sliceName = event.currentTarget.dataset.sliceName;
    if (sliceName) {
      setHiddenSlices((prev) =>
        prev.includes(sliceName) ? prev.filter((name) => name !== sliceName) : [...prev, sliceName]
      );
    }
  }, [])
  const slices = useMemo(() => {
    let currentAngle = -90 // Start from top
    const displayData = data.filter(item => !hiddenSlices.includes(item.name))
    return displayData.map((item) => {
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
  }, [data, hiddenSlices, total, radius, centerX, centerY])
  const onShowToolTip = useCallback((event: React.MouseEvent<SVGGElement, MouseEvent>) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Get cursor position relative to SVG
      const newX = event.clientX - svgRect.left;
      const newY = event.clientY - svgRect.top;
      // Get tooltip data
      const dataTooltip = event.currentTarget.dataset.tooltip;
      const tooltip = document.getElementById("tooltip-pie-chart");

      if (tooltip && dataTooltip) {
        // Create tooltip content
        tooltip.textContent = dataTooltip;
        tooltip.style.opacity = "1";

        // Get the tooltip's dimensions after rendering content
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;

        // Determine tooltip position
        let tooltipX = newX + 4; // Default: right of cursor
        let tooltipY = newY + 4; // Default: below cursor

        // Adjust X position (left or right of cursor)
        const spaceRight = viewportWidth - (event.clientX + tooltipWidth + 4);
        if (spaceRight < 0) {
          // Not enough space on the right, place tooltip to the left
          tooltipX = newX - tooltipWidth - 4;
        }

        // Ensure tooltip stays within SVG bounds if needed
        tooltipX = Math.max(0, Math.min(tooltipX, svgRect.width - tooltipWidth));
        tooltipY = Math.max(0, Math.min(tooltipY, svgRect.height - tooltipHeight));

        // Update tooltip position
        (tooltip).style.left = `${tooltipX}px`;
        (tooltip).style.top = `${tooltipY}px`;
        tooltip.style.opacity = "1";
      }
    }
  }, []);

  const onHideToolTip = useCallback(() => {
    const tooltip = document.getElementById("tooltip-pie-chart")
    if (tooltip) {
      tooltip.style.opacity = "0"
      tooltip.textContent = ""
    }
  }, [])

  return (
    <div className="w-full flex flex-col items-center relative">
      <div id="tooltip-pie-chart" className="absolute opacity-0 w-max bg-gray-800 text-white p-2 rounded shadow-lg"></div>
      <svg width={size} height={size} className="overflow-visible" ref={svgRef}>
        {slices.map((slice, index) => (
          <g key={slice.name}
            data-tooltip={`${slice.name}: ${currency(slice.value)} (${slice.percentage}%)`}
            onMouseEnter={onShowToolTip}
            onMouseLeave={onHideToolTip}
            onClick={onShowToolTip}
            onBlur={onHideToolTip}
          >
            <path
              d={slice.pathData}
              fill={slice.color}
              stroke="white"
              strokeWidth={2}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
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
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {data.map((item) => (
          <div key={item.name} className={
            cn("flex items-center gap-2 cursor-pointer",
              hiddenSlices.includes(item.name) && "line-through")
          }
            onClick={toggleVisibleSlice}
            data-slice-name={item.name}>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
          </div>
        ))}
        <div className="w-full text-center">
          Total: {currency(total)}
        </div>
      </div>
    </div>
  )
})

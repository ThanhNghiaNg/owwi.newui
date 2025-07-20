"use client"

import { SMALL_SCREEN_WIDTH } from "@/utils/constants/variables"
import { currency, decimal } from "@/utils/formats/number"
import { useCallback, useMemo, useRef } from "react"

interface BarChartData {
  label: string
  data: number[]
  backgroundColor?: string
}

interface BarChartProps {
  datasets: BarChartData[]
  height?: number
  color?: string
  labels: string[]
}

const SMOOTHING_FACTOR = 100000

export function DoubleBarChart({ datasets, labels, height = 300, color = "#7DD3FC" }: BarChartProps) {
  const flattenData = useMemo(() => datasets?.flatMap(page => page?.data) || [], [datasets])
  const maxValue = useMemo(() => Math.max(...flattenData), [flattenData])
  const svgRef = useRef<SVGSVGElement>(null)
  const maxValueRounded = Math.ceil(maxValue / SMOOTHING_FACTOR) * SMOOTHING_FACTOR
  const chartWidth = Math.min(window.screen.width - 100, 475)
  const chartHeight = height - 80 // Leave space for labels
  const barWidth = (chartWidth / flattenData.length) * 0.6
  const barSpacing = chartWidth / flattenData.length * 2
  const isSmallScreen = window.screen.width < SMALL_SCREEN_WIDTH


  const onShowToolTip = useCallback((event: React.MouseEvent<SVGGElement, MouseEvent>) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Get cursor position relative to SVG
      const newX = event.clientX - svgRect.left;
      const newY = event.clientY - svgRect.top;

      // Get tooltip data
      const dataTooltip = event.currentTarget.dataset.tooltip;
      const tooltip = document.getElementById("tooltip");

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
    const tooltip = document.getElementById("tooltip")
    if (tooltip) {
      tooltip.style.opacity = "0"
      tooltip.textContent = ""
    }
  }, [])

  return (
    <div className="w-full">
      <svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`} className="overflow-visible" ref={svgRef}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const value = decimal((Math.round(maxValueRounded * (1 - ratio))) / (isSmallScreen ? 1000 : 1))
          const suffix = isSmallScreen ? 'K' : ""
          return (
            <g key={index}>
              <line
                x1={40}
                y1={40 + chartHeight * ratio}
                x2={chartWidth + 40}
                y2={40 + chartHeight * ratio}
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />
              <text x={35} y={45 + chartHeight * ratio} textAnchor="end" fontSize="12" fill="#6B7280">
                {value + suffix}
              </text>
            </g>
          )
        })}

        {/* Bars */}
        {datasets.map((dataset, datasetIndex) => {
          return dataset.data.map((value, index) => {
            const barHeight = (value / maxValueRounded) * chartHeight
            const x = 40 + index * barSpacing + (barSpacing - barWidth) / 2 + barWidth * datasetIndex
            const y = 40 + chartHeight - barHeight
            const strokeColor = dataset.backgroundColor || color
            const fillColor = strokeColor + "AA"

            return (
              <g key={`${datasetIndex}-${index}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={1}
                  rx={4}
                  className="hover:opacity-80 transition-opacity"
                  onMouseEnter={onShowToolTip}
                  onMouseLeave={onHideToolTip}
                  onClick={onShowToolTip}
                  onBlur={onHideToolTip}
                  data-tooltip={`${dataset.label}: ${currency(value)}`}
                />
                {datasetIndex === 0 && (
                  <text x={x + barWidth} y={40 + chartHeight + 20} textAnchor="middle" fontSize="12" fill="#6B7280">
                    {labels[index]}
                  </text>)
                }

                {/* Value on hover */}
                {/* <title>{`${dataset.label}: ${currency(value)}`}</title> */}
              </g>
            )
          })
        })}
        {/* Axes */}
        <line x1={40} y1={40} x2={40} y2={40 + chartHeight} stroke="#6B7280" strokeWidth={1} />
        <line
          x1={40}
          y1={40 + chartHeight}
          x2={chartWidth + 40}
          y2={40 + chartHeight}
          stroke="#6B7280"
          strokeWidth={1}
        />
      </svg>
    </div>
  )
}

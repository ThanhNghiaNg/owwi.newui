import type React from "react"
import { memo } from "react"

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export const Badge = memo(({ children, className = "" }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  )
})

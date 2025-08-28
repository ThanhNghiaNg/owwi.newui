"use client"

import { mutation } from "@/api/mutate";
import { ACCESS_TOKEN, SESSION_ID } from "@/utils/constants/keys";
import { CircleUser, House } from "lucide-react";
import { useState } from "react"

interface HeaderProps {
  title: string
  breadcrumbs?: { name: string; href?: string }[]
}

export function Header({ title, breadcrumbs = [] }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { mutateAsync: logout } = mutation.user.logout(
    () => {
      setIsUserMenuOpen(false)
      window.location.href = "/login"
      localStorage.removeItem(SESSION_ID)
      localStorage.removeItem(ACCESS_TOKEN)
    },
    () => {
      setIsUserMenuOpen(false)
      window.location.href = "/login"
      console.error("Logout failed")
    })

  return (
    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 ml-0 lg:ml-0">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 min-w-0">
        <span className="text-lg"><House /></span>
        <span className="hidden sm:inline">Home</span>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2 min-w-0">
            <span className="hidden sm:inline">{">"}</span>
            <span
              className={`truncate ${index === breadcrumbs.length - 1 ? "text-sky-600 dark:text-sky-400 font-medium" : ""}`}
            >
              {crumb.name}
            </span>
          </div>
        ))}
      </div>

      {/* User Menu */}
      {/* <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
            <span className="text-sm"><CircleUser /></span>
          </div>
          <span className="text-xs sm:text-sm truncate hidden sm:inline text-gray-900 dark:text-white">
            Hi, {`{username}`}
          </span>
          <span className="text-gray-400">▼</span>
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  )
}

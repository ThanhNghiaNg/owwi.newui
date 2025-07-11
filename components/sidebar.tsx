"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"

const navigation = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Transactions", href: "/transactions", icon: "💸" },
  { name: "Partners", href: "/partners", icon: "👥" },
  { name: "Category", href: "/categories", icon: "🏷️" },
  { name: "Settings", href: "/login", icon: "⚙️" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 
        transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        flex h-screen flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
      `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900">
            <span className="text-lg sm:text-xl">🦉</span>
          </div>
          <span className="text-lg sm:text-xl font-bold text-sky-600 dark:text-sky-400">OwwiMONEY</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4">
          <ul className="space-y-1 sm:space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-sky-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className="px-3 sm:px-4 py-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-start gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <span className="text-lg">{theme === "light" ? "🌙" : "☀️"}</span>
            <span className="truncate">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>

        {/* Logout */}
        <div className="px-3 sm:px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <button className="w-full flex items-center justify-start gap-3 px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
            <span className="text-lg">🚪</span>
            <span className="truncate">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}


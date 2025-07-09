import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./animation.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/contexts/theme-context"
import { Toaster } from "react-hot-toast"
import ClientWrapper from "@/components/client/client-wrapper"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Owwi Money - Personal Finance Manager",
  description: "Manage your income, expenses, loans and financial goals",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <ThemeProvider>
          <ClientWrapper>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
              <Sidebar />
              <main className="flex-1 overflow-auto lg:ml-0 w-full min-w-0">{children}</main>
            </div>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

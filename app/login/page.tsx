"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/contexts/theme-context"
import { mutation } from "@/api/mutate"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/utils/constants/routes"
import { SESSION_ID } from "@/utils/constants/keys"
import {  KeyRound, Mail, Moon, Sun } from "lucide-react"

function LoginPage() {
    const router = useRouter()
    const { isAuth } = useAuth()
    // const params = useSearchParams()
    const { theme, toggleTheme } = useTheme()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })

    const { mutateAsync: login, isPending } = mutation.user.login()

    useEffect(() => {
        if (isAuth) {
            // Redirect to dashboard if already authenticated
            router.push(ROUTES.HOME)
        }
    }, [isAuth])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const formData = Object.fromEntries(form.entries()) as Record<string, string>
            const res = await login({
                username: formData.email,
                password: formData.password,
            })
            if (res.sessionToken) {
                localStorage.setItem(SESSION_ID, res.sessionToken)
                router.push(ROUTES.HOME)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="fixed top-4 right-4 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
            >
                <span className="text-xl">{theme === "light" ? <Moon/> : <Sun/>}</span>
            </button>

            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-12 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            {/* <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <span className="text-2xl">🦉</span>
                            </div> */}
                            <h1 className="text-2xl font-bold text-white">OwwiMoney</h1>
                        </div>
                        <p className="text-sky-100 text-sm">Welcome back! Please sign in to your account</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"><Mail/></span>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-12 h-12 border-2 focus:border-sky-500 transition-colors"
                                        autoComplete="email"
                                        aria-label="Email Address"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"><KeyRound /></span>
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-12 h-12 border-2 focus:border-sky-500 transition-colors"
                                        autoComplete="current-password"
                                        aria-label="Password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            {/* <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                        className="w-4 h-4 text-sky-600 border-2 border-gray-300 rounded focus:ring-sky-500 focus:ring-2"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div> */}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full h-12 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>Sign In</span>
                                    </div>
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        {/* <div className="my-8 flex items-center">
                            <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
                            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">Or continue with</span>
                            <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
                        </div> */}

                        {/* Social Login */}
                        {/* <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 h-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-gray-300 dark:hover:border-gray-500 transition-colors group">
                                <span className="text-xl">🔍</span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                    Google
                                </span>
                            </button>
                            <button className="flex items-center justify-center gap-2 h-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-gray-300 dark:hover:border-gray-500 transition-colors group">
                                <span className="text-xl">📘</span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                    Facebook
                                </span>
                            </button>
                        </div> */}

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <button className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium transition-colors">
                                    Sign up here
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} OwwiMoney. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

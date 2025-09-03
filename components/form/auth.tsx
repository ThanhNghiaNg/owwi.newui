import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { KeyRound, Mail } from 'lucide-react'
import { ROUTES } from '@/utils/constants/routes'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type AuthFormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isPending: boolean
}
const AuthForm = ({ handleSubmit, isPending }: AuthFormProps) => {
    const pathname = usePathname()
    const isLogin = pathname === ROUTES.LOGIN
    return (
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
                    <p className="text-sky-100 text-sm">{isLogin ? 'Welcome back! Please sign in to your account' : 'Create an account to get started'}</p>
                </div>

                {/* Form */}
                <div className="px-8 py-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"><Mail /></span>
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
                                    <span>{isLogin ? "Signing in..." : "Signing up..."}</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>{isLogin ? "Sign In" : "Sign Up"}</span>
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
                                <span className="text-xl"><Search size={18} /></span>
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
                        {isLogin ? (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link href="/register" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium transition-colors">
                                    Sign up here
                                </Link>
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link href="/login" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium transition-colors">
                                    Sign in here
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} OwwiMoney. All rights reserved.</p>
            </div>
        </div>
    )
}

export default AuthForm
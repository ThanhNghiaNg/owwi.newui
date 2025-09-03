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
import AuthForm from "@/components/form/auth"
import toast from "react-hot-toast"
import { SUCCESS_MESSAGE } from "@/utils/constants/message"

function RegisterPage() {
    const router = useRouter()
    const { isAuth } = useAuth()
    // const params = useSearchParams()
    const { theme, toggleTheme } = useTheme()

    const { mutateAsync: register, isPending, error } = mutation.user.register()

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
            await register({
                username: formData.email,
                password: formData.password,
            })

            if (error) {
                console.error(error)
                return
            }
            toast.success(SUCCESS_MESSAGE.REGISTER)
            router.push(ROUTES.LOGIN)
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

            <AuthForm handleSubmit={handleSubmit} isPending={isPending} />
        </div>
    )
}

export default RegisterPage

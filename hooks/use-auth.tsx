'use client'
import { query } from '@/api/query'
import { ACCESS_TOKEN } from '@/utils/constants/keys'
import { useQuery } from '@tanstack/react-query'
import { usePathname,  } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const pathname = usePathname()
  const { data: res } = useQuery(query.user.whoami())

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    setIsAuth(res?.isLoggedIn ?? !!accessToken)
  }, [res, pathname])

  return { isAuth }
}

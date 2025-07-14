import { query } from '@/api/query'
import { SESSION_ID } from '@/utils/constants/keys'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const { data: res } = useQuery(query.user.whoami())

  useEffect(() => {
    const sessionToken = localStorage.getItem(SESSION_ID)
    setIsAuth(res?.isLoggedIn ?? !!sessionToken)
  }, [res])

  return { isAuth }
}

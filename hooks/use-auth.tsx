import { query } from '@/api/query'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const {data: res} = useQuery(query.user.whoami())

  useEffect(()=>{
    setIsAuth(!!res?.data?.isLoggedIn)
  },[res])

  return { isAuth }
}

'use client'

import { useState, useEffect } from 'react'
import { navUrl, fetchUrl } from '@/static'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface APIOption {
  headers: {
    'ngrok-skip-browser-warning': string
    'Content-Type': string
    Accept: string
    access?: string
  }
  credentials: RequestCredentials
  method?: string
}

export default function useFetch<T>(url: string, options: APIOption) {
  const [logIn, setLogIn] = useState(false)
  const [responseData, setResponseData] = useState<T | null>(null)
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const refreshToken = async () => {
    try {
      const response = await fetch(`${fetchUrl.reissue}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }
      const accessToken = response.headers.get('access')
      if (accessToken) localStorage.setItem('access', accessToken)
      return accessToken
    } catch (error) {
      toast.error('토큰 재발급 실패. 로그인 해주세요.')
      console.error('Failed to refresh token', error)
      throw error
    }
  }

  const fetchApi = async (retry = true) => {
    setLoading(true)
    try {
      let res = await fetch(url, options)
      if (res.status === 401 && retry) {
        try {
          const newToken = await refreshToken()
          options.headers.access = `${newToken}`
          res = await fetch(url, options)
        } catch (error) {
          setLogIn(false)
          setError(error)
          setLoading(false)
          router.push(navUrl.home)
          return
        }
      }

      const accessToken = res.headers.get('access')
      if (accessToken) {
        localStorage.setItem('access', accessToken)
      }

      const json = await res.json()
      if (json.status === 200 || json.status === 201) {
        setLogIn(true)
        setResponseData(json)
        setLoading(false)
        return
      }
      setLoading(false)
      if (json.status === 401 || json.status === 403) {
        toast.error('로그인 하십시오.')
        setLogIn(false)
        setResponseData(json)
        router.push(navUrl.home)
      }

      if (json.status === 404) {
        toast.error('존재하지 않은 주소입니다.')
        setResponseData(json)
        router.push(navUrl.posts)
      }

      return
    } catch (err) {
      setLogIn(false)
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [url])

  return { responseData, error, loading, logIn }
}

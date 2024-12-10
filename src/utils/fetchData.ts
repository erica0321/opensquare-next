import { headersNoToken, getHeadersWithToken } from '../static'
import { fetchUrl } from '@/static'
import { toast } from 'react-toastify'

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
      return null
    }
    const accessToken = response.headers.get('access')
    if (accessToken) {
      localStorage.setItem('access', accessToken)
      return accessToken
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    return null
  }
}

interface ApiRequestParams {
  url: string
  method: string
  body?: unknown
}

export const apiRequest = async ({
  url,
  method,
  body: requestBody,
}: ApiRequestParams) => {
  const makeRequest = async (retry = true) => {
    try {
      const headers = new Headers(getHeadersWithToken())
      const options: RequestInit = {
        method,
        headers,
        body: requestBody ? JSON.stringify(requestBody) : undefined,
        credentials: 'include',
      }

      const response = await fetch(url, options)
      const responseData = await response.json()

      const accessToken = response.headers.get('access')
      if (accessToken) {
        localStorage.setItem('access', accessToken)
      }

      if (response.status === 401 && retry) {
        const newToken = await refreshToken()
        if (newToken) {
          headers.set('Authorization', `Bearer ${newToken}`)
          return await makeRequest(false)
        }
        toast.error('로그인 시간 만료. 재로그인하십시오')
      }

      return responseData
    } catch (error) {
      console.log(error)
      return null
    }
  }
  return await makeRequest()
}

export const apiRequestNoAuth = async ({
  url,
  method,
  body: requestBody,
}: ApiRequestParams) => {
  try {
    const options: RequestInit = {
      method,
      headers: headersNoToken,
      body: requestBody ? JSON.stringify(requestBody) : undefined,
      credentials: 'include',
    }

    const response = await fetch(url, options)
    const accessToken = response.headers.get('access')
    if (accessToken) {
      localStorage.setItem('access', accessToken)
    }
    const responseData = await response.json()

    const newToken = response.headers.get('Authorization')
    if (newToken) {
      const tokenParts = newToken.split(' ')
      if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        localStorage.setItem('token', tokenParts[1])
      }
    }

    return responseData
  } catch (error) {
    console.error(error)
    return null
  }
}

import { headersNoToken, getHeadersWithToken } from '../static'
import { fetchUrl } from '@/static'

const refreshToken = async (): Promise<string | null> => {
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
    console.error('Failed to refresh token', error)
    throw error
  }
}

interface ApiRequestParams {
  url: string
  method: string
  body?: unknown
}

export const apiRequest = async <T = any>({
  url,
  method,
  body: requestBody,
}: ApiRequestParams): Promise<T> => {
  const makeRequest = async (retry = true): Promise<T> => {
    try {
      const headers = getHeadersWithToken() as Record<string, string>
      const options: RequestInit = {
        method,
        headers,
        body: requestBody ? JSON.stringify(requestBody) : undefined,
        credentials: 'include',
      }

      const response = await fetch(url, options)
      const responseData = (await response.json()) as T

      const accessToken = response.headers.get('access')
      if (accessToken) {
        localStorage.setItem('access', accessToken)
      }

      if (response.status === 401 && retry) {
        try {
          const newToken = await refreshToken()
          if (!newToken) {
            throw new Error('No new token received')
          }
          headers['Authorization'] = `Bearer ${newToken}`
          return await makeRequest(false)
        } catch (refreshError) {
          throw new Error('Failed to refresh token and retry request')
        }
      }

      return responseData
    } catch (error) {
      console.error(`Error with request to ${url}:`, error)
      throw error
    }
  }

  return await makeRequest()
}

export const apiRequestNoAuth = async <T = any>({
  url,
  method,
  body: requestBody,
}: ApiRequestParams): Promise<T> => {
  try {
    const options: RequestInit = {
      method,
      headers: headersNoToken as Record<string, string>,
      body: requestBody ? JSON.stringify(requestBody) : undefined,
      credentials: 'include',
    }

    const response = await fetch(url, options)
    const accessToken = response.headers.get('access')
    if (accessToken) {
      localStorage.setItem('access', accessToken)
    }
    const responseData = (await response.json()) as T

    const newToken = response.headers.get('Authorization')
    if (newToken) {
      const tokenParts = newToken.split(' ')
      if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        localStorage.setItem('token', tokenParts[1])
      }
    }

    return responseData
  } catch (error) {
    console.error(`Error with request to ${url}:`, error)
    throw error
  }
}

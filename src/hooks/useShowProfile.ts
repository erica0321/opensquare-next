import { useState, useEffect } from 'react'

export function useShowProfile(pathname: string) {
  const [showProfile, setShowProfile] = useState(false)
  const [showBackButton, setShowBackButton] = useState(false)

  useEffect(
    function showProfile() {
      if (pathname !== '/' && pathname !== '/signUp') {
        setShowProfile(true)
      } else {
        setShowProfile(false)
      }

      if (pathname === '/signUp' || pathname.includes('/posts/')) {
        setShowBackButton(true)
      } else {
        setShowBackButton(false)
      }
    },
    [pathname]
  )

  return { showProfile, showBackButton }
}

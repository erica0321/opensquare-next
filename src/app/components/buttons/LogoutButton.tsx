import styles from './LogoutButton.module.css'
import { navUrl, fetchUrl } from '@/static'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getHeadersWithToken } from '@/static'
import { toast } from 'react-toastify'

export default function LogoutButton() {
  const router = useRouter()
  const [logoutStatus, setLogoutStatus] = useState('')

  const handleClickLogOut = async () => {
    try {
      setLogoutStatus('loading')
      const response = await fetch(fetchUrl.logOut, {
        headers: getHeadersWithToken(),
        credentials: 'include',
        method: 'POST',
      })
      if (response.status !== 200) {
        setLogoutStatus('fail')
        toast.error('로그아웃 실패. 다시 시도하세요.')
        return
      }

      localStorage.removeItem('access')
      setLogoutStatus('success')
      toast.success('로그아웃 됐습니다.')
      router.push(navUrl.home)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <button
      onClick={handleClickLogOut}
      className={`${styles.logOut} ${styles.setting}`}
      disabled={logoutStatus === 'loading'}
    >
      로그아웃
    </button>
  )
}

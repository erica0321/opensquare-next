'use client'

import styles from './Page.module.css'
import { getHeadersWithToken, fetchUrl } from '@/static'
import UpdateProfileCompoent from './components/UpdateProfileComponent'
import useFetch from '@/hooks/useFetch'

interface ResponseData {
  data: {
    profileImage: string
    nickname: string
    email: string
  }
}

export default function UpdateProfile() {
  const { responseData } = useFetch<ResponseData>(`${fetchUrl.user}`, {
    headers: getHeadersWithToken(),
    credentials: 'include',
  })

  return (
    <section className={styles.updateMain}>
      <p className={styles.pageTitle}>설정</p>
      <UpdateProfileCompoent responseData={responseData?.data} />
    </section>
  )
}

'use client'

import styles from './Page.module.css'
import { getHeadersWithToken, fetchUrl } from '@/static'
import UpdateProfileCompoent from './components/UpdateProfileComponent'
import useFetch from '@/hooks/useFetch'
import withLogin from '@/hocs/withLogin'

interface ResponseData {
  data: {
    profileImage: string
    nickname: string
    email: string
  }
  logIn: boolean
}

const AuthUpdateProfile = withLogin(UpdateProfileCompoent)

export default function UpdateProfile() {
  const { responseData, logIn } = useFetch<ResponseData>(`${fetchUrl.user}`, {
    headers: getHeadersWithToken(),
    credentials: 'include',
  })

  return (
    <section className={styles.updateMain}>
      <p className={styles.pageTitle}>설정</p>
      <AuthUpdateProfile logIn={logIn} responseData={responseData} />
    </section>
  )
}

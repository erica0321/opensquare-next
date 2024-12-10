'use client'

import styles from './page.module.css'
import UpdatePasswordContainer from './component/UpdatePasswordComponent'
import useFetch from '@/hooks/useFetch'
import withLogin from '@/hocs/withLogin'
import { getHeadersWithToken, fetchUrl } from '@/static'

interface ResponseData {
  logIn: boolean
}

const AuthUpdatePassword = withLogin(UpdatePasswordContainer)

export default function UpdatePassword() {
  const { logIn } = useFetch<ResponseData>(`${fetchUrl.user}`, {
    headers: getHeadersWithToken(),
    credentials: 'include',
  })

  return (
    <section className={styles.passwordMain}>
      <p className={styles.pageTitle}>비밀번호 수정</p>
      <AuthUpdatePassword logIn={logIn} />
    </section>
  )
}

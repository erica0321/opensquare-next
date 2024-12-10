'use client'

import styles from './page.module.css'
import AddPostComponent from './components/AddPostComponent'
import { getHeadersWithToken, fetchUrl } from '@/static'
import useFetch from '@/hooks/useFetch'
import withLogin from '@/hocs/withLogin'

interface ResponseData {
  logIn: boolean
}

export default function Page() {
  const { logIn } = useFetch<ResponseData>(`${fetchUrl.user}`, {
    headers: getHeadersWithToken(),
    credentials: 'include',
  })

  const AuthAddPostComponent = withLogin(AddPostComponent)

  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <div className={styles.addPost}>
          <p className={styles.pageTitle}>게시글 작성</p>
          <AuthAddPostComponent logIn={logIn} />
        </div>
      </div>
    </section>
  )
}

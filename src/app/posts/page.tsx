'use client'

import styles from './page.module.css'
import withLogin from '@/hocs/withLogin'
import { fetchUrl, getHeadersWithToken } from '@/static'
import useFetch from '@/hooks/useFetch'
import Layout from './Layout'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import AllPosts from './components/AllPosts'

interface User {
  data: {
    profileImage: string
    nickname: string
  }
  logIn: boolean
}

const AuthLayout = withLogin(Layout)

export default function Page() {
  const { responseData, logIn } = useFetch<User>(`${fetchUrl.user}`, {
    headers: getHeadersWithToken(),
    credentials: 'include',
  })
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const q = searchParams.get('q')

  const [postType, setPostType] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    setPostType(type || '')
    setSearch(q || '')
  }, [type, q])

  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <AuthLayout logIn={logIn} responseData={responseData}>
          <section className={styles.postsMain}>
            <AllPosts type={postType} search={search} />
          </section>
        </AuthLayout>
      </div>
    </section>
  )
}

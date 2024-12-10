'use client'

import styles from './page.module.css'
import useFetch from '@/hooks/useFetch'
import { getHeadersWithToken, fetchUrl } from '@/static'
import UpdatePostComponent from './components/UpdatePostComponent'
import withLogin from '@/hocs/withLogin'

interface PageProps {
  params: {
    id: number
  }
}

interface ResponseData {
  data: {
    title: string
    content: string
    post_image?: string
    type: string
  }
  logIn: boolean
}

const AuthUpdatePostComponent = withLogin(UpdatePostComponent)

export default function Page({ params }: PageProps) {
  const postId = params.id

  const { responseData, logIn } = useFetch<ResponseData | null>(
    `${fetchUrl.posts}/${postId}/update`,
    {
      headers: getHeadersWithToken(),
      credentials: 'include',
    }
  )

  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <div className={styles.updatePost}>
          <p className={styles.pageTitle}>게시글 수정</p>
          <AuthUpdatePostComponent
            logIn={logIn}
            responseData={responseData}
            postId={postId}
          />
        </div>
      </div>
    </section>
  )
}

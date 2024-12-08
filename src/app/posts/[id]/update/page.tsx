'use client'

import styles from './page.module.css'
import useFetch from '@/hooks/useFetch'
import { getHeadersWithToken, fetchUrl } from '@/static'
import UpdatePostComponent from './components/UpdatePostComponent'

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
}

export default function Page({ params }: PageProps) {
  const postId = params.id

  const { responseData } = useFetch<ResponseData | null>(
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
          <UpdatePostComponent
            responseData={responseData?.data}
            postId={postId}
          />
        </div>
      </div>
    </section>
  )
}

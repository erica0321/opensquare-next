'use client'

import useFetch from '@/hooks/useFetch'
import { getHeadersWithToken, fetchUrl } from '@/static'
import { useState } from 'react'
import styles from './page.module.css'
import PostDetail from './components/post/PostDetail'
import Comments from './components/comment/Comments'
import DeletePostModal from './components/post/DeletePostModal'
import withLogin from '@/hocs/withLogin'

interface Response {
  data: {
    type: string
    profile_image: string
    nickname: string
    created_at: string
    title: string
    post_id: number
    view: number
    commentCount: number
    post_image?: string
    content: string
  }
  logIn: boolean
}

interface PageProps {
  params: { id: string }
}

const AuthPostDetail = withLogin(PostDetail)

export default function Page({ params }: PageProps) {
  const [isPostDelete, setIsPostDelete] = useState(false)
  const postId = Number(params.id)

  const { responseData, logIn } = useFetch<Response>(
    `${fetchUrl.posts}/${postId}`,
    {
      headers: getHeadersWithToken(),
      credentials: 'include',
    }
  )
  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <div className={styles.detailPage}>
          <AuthPostDetail
            responseData={responseData}
            logIn={logIn}
            setIsPostDelete={setIsPostDelete}
          />
          <Comments postId={postId} />
          <DeletePostModal
            isPostDelete={isPostDelete}
            postId={postId}
            setIsPostDelete={setIsPostDelete}
          />
        </div>
      </div>
    </section>
  )
}

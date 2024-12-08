import { useState } from 'react'
import { getHeadersWithToken, fetchUrl } from '@/static'
import AddComment from './AddComment'
import Comment from './Comment'
import styles from './Comments.module.css'
import useFetch from '@/hooks/useFetch'

interface CommnetsProps {
  postId: number
}

interface Target {
  commentId: number
  comment: string
}

interface CommentType {
  comment_id: number
  profile_image?: string
  nickname: string
  created_at: string
  comment: string
}

interface CommentData {
  data: CommentType[]
  message: null
  status: number
}

export default function Comments({ postId }: CommnetsProps) {
  const [isAdd, setIsAdd] = useState(true)
  const [updateTarget, setUpdateTarget] = useState<Target>()

  const { responseData }: { responseData: CommentData | null } = useFetch(
    `${fetchUrl.posts}/${postId}/comments`,
    {
      headers: getHeadersWithToken(),
      credentials: 'include',
    }
  )

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentTitle}>댓글</div>
      <AddComment
        postId={postId}
        setIsAdd={setIsAdd}
        isAdd={isAdd}
        updateTarget={updateTarget}
      />
      {responseData ? (
        <>
          <hr className={styles.divHr} />
          <div className={styles.commentList}>
            {responseData?.data?.map((comment: CommentType) => (
              <Comment
                setUpdateTarget={setUpdateTarget}
                key={comment.comment_id}
                setIsAdd={setIsAdd}
                postId={postId}
                data={comment}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

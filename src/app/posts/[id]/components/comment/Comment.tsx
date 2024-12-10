import DeleteCommentModal from './DeleteCommentModal'
import { checkCommentOwner } from '@/utils/checkOwner'
import { useState } from 'react'
import styles from './Comment.module.css'
import ProfileImage from '@components/ProfileImage'
import { changeDate } from '@/utils/convertDate'
import { toast } from 'react-toastify'

interface CommentProps {
  data: {
    comment_id: number
    profile_image?: string
    nickname: string
    created_at: string
    comment: string
  }
  postId: number
  setIsAdd: (isAdd: boolean) => void
  setUpdateTarget: (target: { commentId: number; comment: string }) => void
}

export default function Comment({
  data,
  postId,
  setIsAdd,
  setUpdateTarget,
}: CommentProps) {
  const [isCommentDelete, setIsCommentDelete] = useState(false)

  const handleClick = async (action: 'update' | 'delete') => {
    try {
      const checkResponseData = await checkCommentOwner({
        postId,
        commentId: data.comment_id,
      })

      if (checkResponseData.status === 403) {
        toast.error('본인이 작성한 댓글이 아닙니다.')
        return
      }

      if (action === 'update') {
        setUpdateTarget({ commentId: data.comment_id, comment: data.comment })
        setIsAdd(false)
      } else if (action === 'delete') {
        setIsCommentDelete(true)
      }
    } catch {
      toast.error('댓글 수정/삭제 도중 오류 발생')
    }
  }

  return (
    <>
      <div className={styles.comment}>
        <div className={styles.commentHeader}>
          <div className={styles.commentWriter}>
            <input type='hidden' id='commentId' value={data.comment_id} />
            <ProfileImage image={data.profile_image ?? ''} size={36} />
            <div className={styles.commentWriterName}>{data.nickname}</div>
            <div className={styles.commentWriterDate}>
              {changeDate(data.created_at)}
            </div>
          </div>
          <div className={styles.commentButton}>
            <button
              onClick={() => handleClick('update')}
              className={styles.commentUpdate}
            >
              ✏️
            </button>
            <button
              onClick={() => handleClick('delete')}
              className={styles.commentDelete}
            >
              🗑️
            </button>
          </div>
        </div>
        <div className={styles.commentBody}>{data.comment}</div>
      </div>
      <DeleteCommentModal
        postId={postId}
        commentId={data.comment_id}
        isCommentDelete={isCommentDelete}
        setIsCommentDelete={setIsCommentDelete}
      />
    </>
  )
}

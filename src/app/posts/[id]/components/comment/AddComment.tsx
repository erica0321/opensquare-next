'use client'

import { useState, useEffect } from 'react'
import styles from './AddComment.module.css'
import { apiRequest } from '@/utils/fetchData'
import { useRouter } from 'next/navigation'
import { navUrl, fetchUrl } from '@/static'
import { toast } from 'react-toastify'

interface AddCommentProps {
  postId: number
  isAdd: boolean
  setIsAdd: (isAdd: boolean) => void
  updateTarget?: {
    commentId: number
    comment: string
  }
}

export default function AddComment({
  postId,
  isAdd,
  setIsAdd,
  updateTarget,
}: AddCommentProps) {
  const [comment, setComment] = useState<string>('')
  const [isAble, setIsAble] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (!isAdd && updateTarget) {
      setComment(updateTarget.comment)
    }
  }, [updateTarget, isAdd])

  // comment 유무에 따른 버튼 비/활성화
  useEffect(() => {
    setIsAble(!!comment)
  }, [comment])

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputComment = event.target.value
    setComment(inputComment)
    setIsAble(!!inputComment)
  }

  const handleClickComment = async () => {
    if (!isAble || loading) return

    setLoading(true)

    const url = isAdd
      ? `${fetchUrl.posts}/${postId}/comments`
      : `${fetchUrl.posts}/${postId}/comments/${updateTarget?.commentId}`

    const method = isAdd ? 'POST' : 'PATCH'

    try {
      const responseData = await apiRequest({
        url,
        method,
        body: { comment },
      })

      if (responseData.status === 201 && isAdd) {
        toast.success('댓글이 등록되었습니다.')
        location.reload()
      } else if (responseData.status === 200 && !isAdd) {
        toast.success('댓글이 수정되었습니다.')
        setIsAdd(true)
        location.reload()
      } else if (responseData.status === 401 || responseData.status === 403) {
        toast.error('로그인 하십시오.')
        router.push(navUrl.home)
      } else {
        toast.error('댓글 작성 실패.')
      }
    } catch {
      toast.error('댓글 작성/수정 중 에러가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.writeComment}>
      <label htmlFor='commentInput'></label>
      <textarea
        className={styles.commentInput}
        rows={4}
        value={comment}
        onChange={handleChangeComment}
        placeholder='댓글을 남겨주세요!'
      ></textarea>
      <div className={styles.line}></div>
      <div className={styles.commentPostButton}>
        <button
          onClick={handleClickComment}
          disabled={!isAble || loading}
          type='button'
          className={
            isAble && !loading ? styles.writeButton : styles.writeButtonUnable
          }
        >
          {isAdd ? '댓글 등록' : '댓글 수정'}
        </button>
      </div>
    </form>
  )
}

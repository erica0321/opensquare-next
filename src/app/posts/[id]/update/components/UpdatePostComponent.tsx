'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { postError } from '@/utils/errorMessage'
import { navUrl, fetchUrl } from '@/static'
import styles from './UpdatePostComponent.module.css'
import { apiRequest } from '@/utils/fetchData'
import { toast } from 'react-toastify'
import Image from 'next/image'

interface ResponseData {
  title: string
  content: string
  post_image?: string
  type: string
}

interface UpdateContainerProps {
  responseData: ResponseData | undefined
  postId: number
}

export default function UpdatePostComponent({
  responseData,
  postId,
}: UpdateContainerProps) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [postImage, setPostImage] = useState<string | null>(null)
  const [isEnable, setIsEnable] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (responseData) {
      setTitle(responseData.title)
      setContent(responseData.content)
      setPostImage(responseData.post_image ?? null)
      setType(responseData.type)
    }
  }, [responseData])

  useEffect(() => {
    setIsEnable(!!title && !!content)
  }, [title, content])

  const handleChangePostImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (data) => {
      if (data.target?.result) {
        setPostImage(data.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleClickUpdatePost = async () => {
    setIsEnable(false)
    try {
      const response = await apiRequest({
        url: `${fetchUrl.posts}/${postId}`,
        method: 'PATCH',
        body: {
          title,
          type,
          content,
          post_image: postImage,
        },
      })

      switch (response.status) {
        case 200:
          toast.success('게시글 수정이 완료되었습니다.')
          router.push(`${navUrl.posts}/${postId}`)
          break
        default:
          toast.error(
            '수정 실패: 이미지가 너무 크거나 다른 오류로 실패했습니다.'
          )
          break
      }
    } catch (error) {
      console.error('게시글 수정 중 에러가 발생했습니다:', error)
      toast.error(
        '게시글 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
      )
      setIsEnable(true)
    }
  }

  return (
    <>
      <form className={styles.boardContainer}>
        <div className={styles.boardLeft}>
          <div className={styles.boardType}>
            <label htmlFor='boardTypeInput' className={styles.inputTitle}>
              주제*
            </label>
            <select
              value={type}
              className={styles.boardTypeSelect}
              id='boardTypeInput'
              onChange={(event) => setType(event.target.value)}
            >
              <option value='coding'>개발</option>
              <option value='other'>고민</option>
            </select>
          </div>
          <div className={styles.boardTitle}>
            <label htmlFor='boardTitleInput' className={styles.inputTitle}>
              제목*
            </label>
            <input
              type='text'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={26}
              className={styles.boardTitleInput}
            />
          </div>
          <div className={styles.boardContent}>
            <label htmlFor='boardContentInput' className={styles.inputTitle}>
              내용*
            </label>
            <textarea
              rows={10}
              value={content}
              maxLength={200}
              onChange={(event) => setContent(event.target.value)}
              className={styles.boardContentInput}
            ></textarea>
          </div>
          <div className={styles.helperTextContainer}>
            <div className={styles.helperText}>
              {!title || !content ? postError : ''}
            </div>
          </div>
        </div>
        <div className={styles.space}></div>
        <div className={styles.updateBoardImage}>
          <div className={styles.updateImageTop}>
            <div className={styles.inputTitle}>포스트 이미지</div>
            <div className={styles.buttonContainer}>
              <label htmlFor='imageInput' className={styles.imageInputButton}>
                추가
              </label>
            </div>
          </div>
          <div className={styles.imageContainer}>
            {postImage ? (
              <Image
                width={600}
                height={490}
                className={styles.imageShow}
                alt='post'
                src={postImage}
              />
            ) : (
              <div className={styles.imageNone}>이미지 없음</div>
            )}
            <input
              type='file'
              className={styles.imageInput}
              id='imageInput'
              onChange={handleChangePostImage}
              accept='image/*'
            />
          </div>
        </div>
      </form>
      <button
        disabled={!isEnable || !title || !content}
        onClick={handleClickUpdatePost}
        className={isEnable ? styles.updateButton : styles.updateButtonDisabled}
      >
        완료
      </button>
    </>
  )
}

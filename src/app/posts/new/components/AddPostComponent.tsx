'use client'

import styles from './AddPostComponent.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { postError } from '@/utils/errorMessage'
import { navUrl, fetchUrl } from '@/static'
import { apiRequest } from '@/utils/fetchData'
import { toast } from 'react-toastify'

export default function AddPostComponent() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [type, setType] = useState<string>('coding')
  const [postImage, setPostImage] = useState<string | null>(null)
  const [isEnable, setIsEnable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setIsEnable(!!postImage && !!title && !!content && !loading)
  }, [title, content, loading, postImage])

  const handleChangePostImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setPostImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleClickAddPost = async () => {
    if (!isEnable || loading) return

    setLoading(true)

    try {
      const responseData = await apiRequest({
        url: fetchUrl.posts,
        method: 'POST',
        body: {
          type,
          title,
          content,
          post_image: postImage,
        },
      })

      switch (responseData.status) {
        case 201:
          toast.success('게시글 작성이 완료되었습니다.')
          router.push(`${navUrl.posts}/${responseData.data}`)
          return
        default:
          toast.error('작성 오류')
          setLoading(false)
          return
      }
    } catch (error) {
      console.error('게시글 작성 중 에러 발생:', error)
      toast.error('게시글 작성 중 에러가 발생했습니다.')
      setLoading(false)
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
              className={styles.boardTypeSelect}
              id='boardTypeInput'
              onChange={(e) => setType(e.target.value)}
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
              maxLength={200}
              onChange={(event) => setContent(event.target.value)}
              className={styles.boardContentInput}
            ></textarea>
          </div>
          <div className={styles.helperTextContainer}>
            <div className={styles.helperText}>
              {!title || !content || !postImage ? postError : ''}
            </div>
          </div>
        </div>
        <div className={styles.space}></div>
        <div className={styles.updateBoardImage}>
          <div className={styles.updateImageTop}>
            <div className={styles.inputTitle}>포스트 이미지</div>
            <label htmlFor='imageInput' className={styles.imageInputButton}>
              추가
            </label>
          </div>
          <div className={styles.imageContainer}>
            {postImage ? (
              <img className={styles.imageShow} alt='post' src={postImage} />
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
        disabled={!isEnable || !title || !content || !postImage}
        onClick={handleClickAddPost}
        className={isEnable ? styles.updateButton : styles.updateButtonDisabled}
      >
        완료
      </button>
    </>
  )
}

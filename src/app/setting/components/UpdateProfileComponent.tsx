'use client'

import DeleteUserModal from './DeleteUserModal'
import styles from './UpdateProfileComponent.module.css'
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import {
  nicknameMessageReduer,
  nicknameInitialMessage,
} from '@/reducer/nicknameReducer'
import { NICKNAME_STATUS } from '@/utils/status'
import { apiRequest } from '@/utils/fetchData'
import { toast } from 'react-toastify'
import { navUrl, fetchUrl, backHost } from '@/static'

interface ResponseData {
  profileImage: string
  nickname: string
  email: string
}

interface UpdateProfileProps {
  responseData?: ResponseData
}

export default function UpdateProfileCompoent({
  responseData,
}: UpdateProfileProps) {
  const [profile, setProfile] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [nicknameState, nicknameDispatcher] = useReducer(
    nicknameMessageReduer,
    nicknameInitialMessage
  )
  const [isAble, setIsAble] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (responseData) {
      setProfile(responseData.profileImage)
      setNickname(responseData.nickname)
    }
  }, [responseData])

  useEffect(() => {
    setIsAble(
      profile !== '' && nickname !== '' && !nicknameState.nicknameMessage
    )
  }, [profile, nickname, nicknameState])

  const handleChangeNickname = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setNickname(value)
    await checkNicknameValidation(value)
  }

  const checkNicknameValidation = async (
    nickname: string
  ): Promise<boolean> => {
    if (!nickname) {
      nicknameDispatcher({ type: NICKNAME_STATUS.Null })
      return false
    }
    if (nickname.includes(' ')) {
      nicknameDispatcher({ type: NICKNAME_STATUS.Space })
      return false
    }

    const isNicknameDuplicate = await apiRequest({
      url: `${backHost}/api/users/user/nickname/${nickname}`,
      method: 'POST',
    }).then((data) => data.status === 400)

    if (isNicknameDuplicate) {
      nicknameDispatcher({ type: NICKNAME_STATUS.Duplicate })
      return false
    }

    nicknameDispatcher({ type: NICKNAME_STATUS.Reset })
    return true
  }

  const handleChangeProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (data: ProgressEvent<FileReader>) => {
      if (data.target?.result) {
        setProfile(data.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleClickUpdateButton = async () => {
    const isValid = await checkNicknameValidation(nickname)

    if (!isValid) return

    try {
      const updateData = await apiRequest({
        url: fetchUrl.profile,
        method: 'PATCH',
        body: {
          nickname,
          profileImage: profile,
        },
      })

      if (updateData.status === 200) {
        toast.success('프로필 수정 완료')
        setTimeout(() => {
          router.push(navUrl.posts)
        }, 1000)
      } else {
        toast.error('프로필 수정 실패')
      }
    } catch (error) {
      console.error('유저 프로필 업데이트 도중 에러가 발생했습니다:', error)
    }
  }

  return (
    <>
      <form className={styles.wrapper}>
        <div className={styles.profileTitle}>
          <p className={styles.inputTitle}>프로필 사진*</p>
          <div className={styles.imageContainer}>
            {profile ? (
              <img className={styles.imageShow} alt='profile' src={profile} />
            ) : (
              <div className={styles.imageNone}></div>
            )}
            <div className={styles.imageUpdate}>
              <label htmlFor='imageInput' className={styles.imageUpdateButton}>
                변경
              </label>
              <input
                className={styles.imageInput}
                id='imageInput'
                onChange={handleChangeProfileImage}
                type='file'
                accept='image/*'
              />
            </div>
          </div>
        </div>
        <div className={styles.profileEmail}>
          <label htmlFor='emailInput' className={styles.inputTitle}>
            이메일
          </label>
          <div id={styles.updateEmailInput}>{responseData?.email}</div>
        </div>
        <div className={styles.profileNickname}>
          <label htmlFor='nicknameInput' className={styles.inputTitle}>
            닉네임
          </label>
          <div className={styles.nicknameContainer}>
            <input
              type='text'
              className={styles.nicknameInput}
              maxLength={10}
              value={nickname}
              onChange={handleChangeNickname}
            />
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {nicknameState.nicknameMessage}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.profilebutton}>
        <button
          type='button'
          className={
            isAble
              ? styles.profileUpdateButton
              : styles.profileUpdateButtonDisabled
          }
          disabled={!isAble}
          onClick={handleClickUpdateButton}
        >
          프로필 저장
        </button>
      </div>
      <div className={styles.profilebutton}>
        <button
          onClick={() => setIsDelete(true)}
          className={styles.profileDeleteButton}
        >
          회원 탈퇴
        </button>
      </div>
      <DeleteUserModal isDelete={isDelete} setIsDelete={setIsDelete} />
    </>
  )
}

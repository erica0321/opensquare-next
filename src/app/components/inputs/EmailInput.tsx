import React from 'react'
import styles from './EmailInput.module.css'
import { fetchUrl } from '@/static'
import { apiRequestNoAuth } from '@/utils/fetchData'
import { EMAIL_STATUS } from '@/utils/status'

type EmailStatus = (typeof EMAIL_STATUS)[keyof typeof EMAIL_STATUS]

interface EmailState {
  emailMessage: string
}

// 이메일 상태를 변경하기 위한 액션 타입
interface EmailAction {
  type: EmailStatus
}

interface EmailInputProps {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  emailState: EmailState
  emailDispatcher: React.Dispatch<EmailAction>
}

export default function EmailInput({
  email,
  setEmail,
  emailState,
  emailDispatcher,
}: EmailInputProps) {
  const handleChangeEmail = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setEmail(value)
    await checkEmailValidation(value)
  }

  const checkEmailValidation = async (email: string): Promise<boolean> => {
    if (!email) {
      emailDispatcher({ type: EMAIL_STATUS.Null })
      return false
    }
    emailDispatcher({ type: EMAIL_STATUS.Reset })

    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailForm.test(email) || email.length < 5) {
      emailDispatcher({ type: EMAIL_STATUS.NotValid })
      return false
    }
    emailDispatcher({ type: EMAIL_STATUS.Reset })

    // apiRequestNoAuth의 반환값 타입을 가정합니다. 실제 API 응답 구조에 따라 조정 필요.
    const isEmailDuplicate = await apiRequestNoAuth<{ status: number }>({
      url: `${fetchUrl.email}/${email}`,
      method: 'POST',
    }).then((data) => data.status === 400)

    if (isEmailDuplicate) {
      emailDispatcher({ type: EMAIL_STATUS.Duplicate })
      return false
    }
    emailDispatcher({ type: EMAIL_STATUS.Reset })

    return true
  }

  return (
    <div className={styles.emailContainer}>
      <label htmlFor='emailInput' className={styles.inputTitle}>
        이메일*
      </label>
      <input
        required
        value={email}
        type='email'
        id={styles.emailInput}
        onChange={handleChangeEmail}
        placeholder='이메일을 입력하세요'
      />
      <div className={styles.helperTextContainer}>
        <div className={styles.helperText}>{emailState.emailMessage}</div>
      </div>
    </div>
  )
}

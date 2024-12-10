import styles from './EmailInput.module.css'
import { fetchUrl } from '@/static'
import { apiRequestNoAuth } from '@/utils/fetchData'
import { EMAIL_STATUS } from '@/utils/status'
import { Input } from 'antd'
import debounce from 'lodash/debounce'
import { useCallback } from 'react'

type EmailStatus = (typeof EMAIL_STATUS)[keyof typeof EMAIL_STATUS]

interface EmailState {
  emailMessage: string
}

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
    debouncedCheckEmailValidation(value)
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

    const isEmailDuplicate = await apiRequestNoAuth({
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

  const debouncedCheckEmailValidation = useCallback(
    debounce(checkEmailValidation, 200),
    []
  )

  return (
    <div className={styles.emailContainer}>
      <label htmlFor='emailInput' className={styles.inputTitle}>
        이메일*
      </label>
      <Input
        allowClear
        size='large'
        count={{
          show: true,
        }}
        value={email}
        status={!email || emailState.emailMessage ? 'error' : ''}
        type='email'
        placeholder='이메일을 입력하세요. (최소 8글자)'
        onChange={handleChangeEmail}
      />

      <div className={styles.helperTextContainer}>
        <div className={styles.helperText}>{emailState.emailMessage}</div>
      </div>
    </div>
  )
}

import styles from './PasswordInput.module.css'
import { PASSWORD_CHECK_STATUS, PASSWORD_STATUS } from '@/utils/status'
import { Input } from 'antd'

type PasswordStatus = (typeof PASSWORD_STATUS)[keyof typeof PASSWORD_STATUS]
type PasswordCheckStatus =
  (typeof PASSWORD_CHECK_STATUS)[keyof typeof PASSWORD_CHECK_STATUS]

interface PasswordState {
  passwordMessage: string
}

interface PasswordCheckState {
  passwordCheckMessage: string
}

interface PasswordAction {
  type: PasswordStatus
}

interface PasswordCheckAction {
  type: PasswordCheckStatus
}

interface PasswordInputProps {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  setPasswordCheck: React.Dispatch<React.SetStateAction<string>>
  passwordState: PasswordState
  passwordDispatcher: React.Dispatch<PasswordAction>
  passwordCheckDispatcher: React.Dispatch<PasswordCheckAction>
  passwordCheck: string
  passwordCheckState: PasswordCheckState
}

export default function PasswordInput({
  password,
  setPassword,
  setPasswordCheck,
  passwordState,
  passwordDispatcher,
  passwordCheckDispatcher,
  passwordCheckState,
  passwordCheck,
}: PasswordInputProps) {
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
    checkPasswordValidation(value, passwordCheck)
  }

  const handleChangePasswordCheck = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setPasswordCheck(value)
    checkPasswordValidation(password, value)
  }

  const checkPasswordValidation = (
    password: string,
    passwordCheck: string
  ): boolean => {
    if (!password) {
      passwordDispatcher({ type: PASSWORD_STATUS.Null })
      return false
    }
    passwordDispatcher({ type: PASSWORD_STATUS.Reset })

    const passwordRegExp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,20}$/

    if (!passwordRegExp.test(password)) {
      passwordDispatcher({ type: PASSWORD_STATUS.NotMatch })
      return false
    }
    passwordDispatcher({ type: PASSWORD_STATUS.Reset })

    if (!passwordCheck) {
      passwordCheckDispatcher({ type: PASSWORD_CHECK_STATUS.Null })
      return false
    }
    passwordCheckDispatcher({ type: PASSWORD_CHECK_STATUS.Reset })

    if (password !== passwordCheck) {
      passwordDispatcher({ type: PASSWORD_STATUS.NotSame })
      passwordCheckDispatcher({ type: PASSWORD_CHECK_STATUS.NotSame })
      return false
    }
    passwordDispatcher({ type: PASSWORD_STATUS.Reset })
    passwordCheckDispatcher({ type: PASSWORD_CHECK_STATUS.Reset })

    return true
  }

  return (
    <>
      <div className={styles.passwordContainer}>
        <label htmlFor='passwordInput' className={styles.inputTitle}>
          비밀번호*
        </label>
        <Input.Password
          allowClear
          status={!password || passwordState.passwordMessage ? 'error' : ''}
          size='large'
          className={styles.input}
          value={password}
          onChange={handleChangePassword}
          placeholder='비밀번호를 입력하세요'
        />

        <div className={styles.helperTextContainer}>
          <div className={styles.helperText}>
            {passwordState.passwordMessage}
          </div>
        </div>
      </div>
      <div className={styles.passwordCheckContainer}>
        <label htmlFor='passwordCheckInput' className={styles.inputTitle}>
          비밀번호 확인*
        </label>
        <Input.Password
          allowClear
          className={styles.input}
          status={
            !passwordCheck || passwordCheckState.passwordCheckMessage
              ? 'error'
              : ''
          }
          size='large'
          value={passwordCheck}
          onChange={handleChangePasswordCheck}
          placeholder='비밀번호를 한번 더 입력하세요'
        />

        <div className={styles.helperTextContainer}>
          <div className={styles.helperText}>
            {passwordCheckState.passwordCheckMessage}
          </div>
        </div>
      </div>
    </>
  )
}

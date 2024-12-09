import styles from './PasswordInput.module.css'
import { PASSWORD_CHECK_STATUS, PASSWORD_STATUS } from '@/utils/status'

type PasswordStatusType = (typeof PASSWORD_STATUS)[keyof typeof PASSWORD_STATUS]
type PasswordCheckStatusType =
  (typeof PASSWORD_CHECK_STATUS)[keyof typeof PASSWORD_CHECK_STATUS]

interface PasswordState {
  passwordMessage: string | null
}

interface PasswordCheckState {
  passwordCheckMessage: string | null
}

interface PasswordInputProps {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  passwordCheck: string
  setPasswordCheck: React.Dispatch<React.SetStateAction<string>>
  passwordState: PasswordState
  passwordDispatcher: React.Dispatch<{ type: PasswordStatusType }>
  passwordCheckState: PasswordCheckState
  passwordCheckDispatcher: React.Dispatch<{ type: PasswordCheckStatusType }>
}

export default function PasswordInput({
  password,
  setPassword,
  passwordCheck,
  setPasswordCheck,
  passwordState,
  passwordDispatcher,
  passwordCheckState,
  passwordCheckDispatcher,
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
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@#%^$!%*?&_]{8,}$/
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
        <input
          required
          type='password'
          value={password}
          className={styles.passwordInput}
          id='passwordInput'
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
        <input
          required
          type='password'
          value={passwordCheck}
          id='passwordCheckInput'
          className={styles.passwordCheckInput}
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

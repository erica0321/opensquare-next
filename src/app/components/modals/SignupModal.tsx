import { useState, useReducer, ChangeEvent } from 'react'
import styles from './SignupModal.module.css'
import { SignUpError } from '@/utils/errorMessage'
import {
  emailInitialMessage,
  emailMessageReducer,
} from '@/reducer/emailReducer'
import {
  passwordInitialMessage,
  passwordMessageReducer,
} from '@/reducer/passwordReducer'
import {
  passwordCheckInitialMessage,
  passwordCheckMessageReducer,
} from '@/reducer/passwordCheckReducer'
import {
  nicknameMessageReduer,
  nicknameInitialMessage,
} from '@/reducer/nicknameReducer'
import { useSignupValidation } from '@/hooks/useSignupValidation'
import EmailInput from '@components/inputs/EmailInput'
import PasswordInput from '@/app/components/inputs/PasswordInput'
import NicknameInput from '@/app/components/inputs/NicknameInput'
import { fetchUrl } from '@/static'
import { apiRequestNoAuth } from '@/utils/fetchData'
import logo from '@images/logo.png'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { Modal } from 'antd'

interface SignUpProps {
  isOpen: boolean
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignUp({ isOpen, setLogIn, setSignUp }: SignUpProps) {
  const [emailState, emailDispatcher] = useReducer(
    emailMessageReducer,
    emailInitialMessage
  )
  const [passwordState, passwordDispatcher] = useReducer(
    passwordMessageReducer,
    passwordInitialMessage
  )
  const [passwordCheckState, passwordCheckDispatcher] = useReducer(
    passwordCheckMessageReducer,
    passwordCheckInitialMessage
  )
  const [nicknameState, nicknameDispatcher] = useReducer(
    nicknameMessageReduer,
    nicknameInitialMessage
  )

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [nickname, setNickname] = useState('')
  const [imageNull, setImageNull] = useState(true)
  const [loading, setLoading] = useState(false)

  const isValid = useSignupValidation(
    email,
    password,
    passwordCheck,
    nickname,
    profileImage || '',
    emailState,
    passwordState,
    passwordCheckState,
    nicknameState
  )

  const reader = new FileReader()
  reader.onload = (event: ProgressEvent<FileReader>) => {
    const result = event.target?.result
    if (typeof result === 'string') {
      setImageNull(false)
      setProfileImage(result)
    }
  }

  const handleChangeProfileImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) {
      setProfileImage(null)
      setImageNull(true)
      return
    }
    reader.readAsDataURL(files[0])
  }

  const handleClickSignUp = async () => {
    if (!isValid || loading) return

    setLoading(true)

    const data = {
      email,
      password,
      nickname,
      profileImage,
    }

    try {
      const responseData = await apiRequestNoAuth({
        url: fetchUrl.signUp,
        method: 'POST',
        body: data,
      })

      switch (responseData.status) {
        case 201:
          toast.success('회원가입 성공')
          setSignUp(false)
          setLogIn(true)
          break
        default:
          toast.error('회원가입 실패')
          setSignUp(false)
          break
      }
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error)
      toast.error('회원가입 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      centered
      open={isOpen}
      footer={null}
      onCancel={() => {
        setSignUp(false)
      }}
    >
      <section className={styles.signUpMain}>
        <div className={styles.title}>
          <img src={logo.src} alt='logo' className={styles.logo} />
        </div>

        <form className={styles.signUpContainer}>
          <div className={styles.topContainer}>
            <p className={styles.inputTitle}>프로필 사진</p>
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {imageNull && SignUpError.imageNullError}
              </div>
            </div>
            <div className={styles.imageContainer}>
              {profileImage ? (
                <Image
                  className={styles.imageShow}
                  alt='profile'
                  src={profileImage}
                />
              ) : null}
              <div className={styles.imageUpdate}>
                <label
                  htmlFor='imageInput'
                  className={styles.imageUpdateButton}
                >
                  +
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
          <div className={styles.bottomContainer}>
            <EmailInput
              email={email}
              setEmail={setEmail}
              emailState={emailState}
              emailDispatcher={emailDispatcher}
            />
            <PasswordInput
              password={password}
              setPassword={setPassword}
              passwordCheck={passwordCheck}
              setPasswordCheck={setPasswordCheck}
              passwordState={passwordState}
              passwordDispatcher={passwordDispatcher}
              passwordCheckState={passwordCheckState}
              passwordCheckDispatcher={passwordCheckDispatcher}
            />
            <NicknameInput
              nickname={nickname}
              setNickname={setNickname}
              nicknameState={nicknameState}
              nicknameDispatcher={nicknameDispatcher}
            />
          </div>
          <button
            type='button'
            onClick={handleClickSignUp}
            className={
              isValid && !loading
                ? styles.signUpButton
                : styles.signUpButtonDisabled
            }
            disabled={!isValid || loading}
          >
            회원가입
          </button>
        </form>
      </section>
    </Modal>
  )
}

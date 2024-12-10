import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './LoginModal.module.css'
import { emailNotValidErrorLine } from '@/utils/errorMessage'
import { navUrl, fetchUrl, headersNoToken } from '@/static'
import logo from '@images/logo.png'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { Input, Modal } from 'antd'

interface LoginProps {
  isOpen: boolean
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogInPage({ isOpen, setLogIn }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailNotValid, setEmailNotValid] = useState(false)
  const [logInSuccess, setLogInSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    checkEmailValidation(event.target.value)
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleClickLogIn = async () => {
    setLoading(true)
    const isEmailValid = checkEmailValidation(email)

    if (!isEmailValid) return

    try {
      const responseData = await fetch(fetchUrl.logIn, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
        headers: headersNoToken,
      })

      if (responseData.ok) {
        const accessToken = responseData.headers.get('access')
        if (accessToken) {
          localStorage.setItem('access', accessToken)
          setLogInSuccess(true)
          router.push(navUrl.posts)
        } else {
          toast.error('로그인 실패')
          setLoading(false)
        }
      } else {
        setLogInSuccess(false)
        toast.error('로그인 실패')
        setLoading(false)
      }
    } catch (error) {
      toast.error(
        '로그인 요청 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
      )
      setLoading(false)
    }
  }

  const checkEmailValidation = (email: string) => {
    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !emailForm.test(email) || email.length < 5) {
      setEmailNotValid(true)
      return false
    }
    setEmailNotValid(false)
    return true
  }

  return (
    <Modal
      centered
      open={isOpen}
      footer={null}
      onCancel={() => {
        setLogIn(false)
      }}
    >
      <section className={styles.logIn}>
        <div className={styles.title}>
          <Image src={logo} alt='logo' className={styles.logo} />
        </div>
        <form className={styles.logInContent}>
          <div className={styles.emailLogInContainer}>
            <label htmlFor='email' className={styles.logInTitle}>
              이메일
            </label>
            <Input
              allowClear
              size='large'
              count={{
                show: true,
              }}
              status={
                !email || emailNotValid || email.length < 8 ? 'error' : ''
              }
              type='email'
              placeholder='이메일을 입력하세요. (최소 8글자)'
              onChange={handleChangeEmail}
            />
          </div>
          <div className={styles.passwordLogInContainer}>
            <label htmlFor='password' className={styles.logInTitle}>
              비밀번호
            </label>
            <Input.Password
              allowClear
              status={!password ? 'error' : ''}
              size='large'
              onChange={handleChangePassword}
              placeholder='비밀번호를 입력하세요'
            />
            <div className={styles.helperTextContainer}>
              <div className={styles.helperText}>
                {emailNotValid && emailNotValidErrorLine}
              </div>
            </div>
          </div>
          <button
            type='button'
            onClick={handleClickLogIn}
            className={
              logInSuccess ? styles.logInButton : styles.logInButtonDisabled
            }
            disabled={!email || !password || loading}
          >
            로그인
          </button>
        </form>
      </section>
    </Modal>
  )
}

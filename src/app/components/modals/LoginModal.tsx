import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './LoginModal.module.css'
import { emailNotValidErrorLine } from '@/utils/errorMessage'
import { navUrl, fetchUrl } from '@/static'
import { headersNoToken } from '@/static'
import { enableScroll } from '@/utils/scroll'
import logo from '@images/logo.png'
import { toast } from 'react-toastify'
import Image from 'next/image'

export default function LogInPage() {
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
          toast.success('로그인 성공')
          setLogInSuccess(true)
          enableScroll()
          setTimeout(() => {
            router.push(navUrl.posts)
          }, 1000)
          setLoading(false)
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
      console.error('로그인 요청 중 에러가 발생했습니다:', error)
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
    <section className={styles.logIn}>
      <div className={styles.title}>
        <Image src={logo} alt='logo' className={styles.logo} />
      </div>
      <form className={styles.logInContent}>
        <div className={styles.emailLogInContainer}>
          <label htmlFor='email' className={styles.logInTitle}>
            이메일
          </label>
          <input
            className={styles.input}
            type='email'
            minLength={8}
            required
            placeholder='이메일을 입력하세요'
            onChange={handleChangeEmail}
          />
        </div>
        <div className={styles.passwordLogInContainer}>
          <label htmlFor='password' className={styles.logInTitle}>
            비밀번호
          </label>
          <input
            className={styles.input}
            type='password'
            required
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
  )
}

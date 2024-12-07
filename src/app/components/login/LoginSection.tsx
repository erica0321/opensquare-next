'use client'

import styles from './LogInSection.module.css'
import { useState } from 'react'
import { usePosition } from '@/hooks/usePosition'
import { disableScroll, enableScroll } from '@/utils/scroll'
import LogInPage from '@/app/components/modals/LoginModal'
import SignUpPage from '@/app/components/modals/SignupModal'

export default function LoginSection() {
  const [logIn, setLogIn] = useState(false)
  const [signUp, setSignUp] = useState(false)

  const position = usePosition(logIn || signUp)

  const handleLogInClick = () => {
    disableScroll()
    setLogIn(true)
  }

  const handleSignUpClick = () => {
    disableScroll()
    setSignUp(true)
  }

  const closeModal = () => {
    setLogIn(false)
    setSignUp(false)
    enableScroll()
  }

  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.lottieContainer}>
          <div className={styles.sideContainer}>
            <h1 className={styles.title}>새로운 개발자 커뮤니티, openSquare</h1>
            <p className={styles.subTitle}>
              고민만 올리면 빠른 답변부터 문제 해결, 지식 확장까지!
            </p>
            <div className={styles.buttonContainer}>
              <div
                onClick={handleLogInClick}
                className={`${styles.logIn} ${styles.button}`}
              >
                로그인
              </div>
              <div
                onClick={handleSignUpClick}
                className={`${styles.signUp} ${styles.button}`}
              >
                회원가입
              </div>
            </div>
          </div>
        </div>
      </div>
      {(logIn || signUp) && (
        <div className={styles.modalContainer} style={{ top: `${position}px` }}>
          <div onClick={closeModal} className={styles.deem}></div>
          {logIn && (
            <div className={styles.modal}>
              <div className={styles.logInModal}>
                <LogInPage />
              </div>
            </div>
          )}
          {signUp && (
            <div className={styles.modal}>
              <div className={styles.signUpModal}>
                <SignUpPage setLogIn={setLogIn} setSignUp={setSignUp} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

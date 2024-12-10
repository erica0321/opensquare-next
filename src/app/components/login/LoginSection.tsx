'use client'

import styles from './LoginSection.module.css'
import { useState } from 'react'
import LogInPage from '@/app/components/modals/LoginModal'
import SignUpPage from '@/app/components/modals/SignupModal'

export default function LoginSection() {
  const [logIn, setLogIn] = useState(false)
  const [signUp, setSignUp] = useState(false)

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
                onClick={() => setLogIn(true)}
                className={`${styles.logIn} ${styles.button}`}
              >
                로그인
              </div>
              <div
                onClick={() => setSignUp(true)}
                className={`${styles.signUp} ${styles.button}`}
              >
                회원가입
              </div>
            </div>
          </div>
        </div>
      </div>
      <LogInPage isOpen={logIn} setLogIn={setLogIn} />
      <SignUpPage isOpen={signUp} setLogIn={setLogIn} setSignUp={setSignUp} />
    </>
  )
}

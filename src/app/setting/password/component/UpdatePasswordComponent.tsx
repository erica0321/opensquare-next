'use client'

import styles from './UpdatePasswordComponent.module.css'
import { useState, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import { navUrl, backHost } from '@/static'
import { usePasswordValidation } from '@/hooks/usePasswordValidation'
import {
  passwordInitialMessage,
  passwordMessageReducer,
} from '@/reducer/passwordReducer'
import {
  passwordCheckInitialMessage,
  passwordCheckMessageReducer,
} from '@/reducer/passwordCheckReducer'
import PasswordInput from './PasswordInput'
import { apiRequest } from '@/utils/fetchData'
import { toast } from 'react-toastify'

export default function UpdatePasswordContainer() {
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const router = useRouter()

  const [passwordState, passwordDispatcher] = useReducer(
    passwordMessageReducer,
    passwordInitialMessage
  )
  const [passwordCheckState, passwordCheckDispatcher] = useReducer(
    passwordCheckMessageReducer,
    passwordCheckInitialMessage
  )

  const isAble = usePasswordValidation(
    password,
    passwordCheck,
    passwordState,
    passwordCheckState
  )

  const handleClickUpdatePassword = async () => {
    try {
      const updateResponse = await apiRequest({
        url: `${backHost}/api/users/user/password`,
        method: 'PATCH',
        body: { password },
      })

      switch (updateResponse.status) {
        case 200:
          toast.success('비밀번호가 수정되었습니다.')
          toast.success('재로그인하십시오.')
          router.push(navUrl.home)
          return
        default:
          toast.error('비밀번호 수정실패')
          return
      }
    } catch (error) {
      console.error('비밀번호 수정 중 에러 발생:', error)
      toast.error(
        '비밀번호 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
      )
    }
  }

  return (
    <form className={styles.passwordWrapper}>
      <div className={styles.passwordInnerWrapper}>
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
      </div>

      <button
        type='button'
        onClick={handleClickUpdatePassword}
        className={isAble ? styles.updateButton : styles.updateButtonDisabled}
        disabled={!isAble}
      >
        완료
      </button>
    </form>
  )
}

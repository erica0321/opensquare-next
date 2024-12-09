import { useState, useEffect } from 'react'

interface PasswordState {
  passwordMessage: string | null
}

interface PasswordCheckState {
  passwordCheckMessage: string | null
}

export function usePasswordValidation(
  password: string,
  passwordCheck: string,
  passwordState: PasswordState,
  passwordCheckState: PasswordCheckState
): boolean {
  const [isAble, setIsAble] = useState<boolean>(false)

  useEffect(() => {
    setIsAble(
      !!password &&
        !!passwordCheck &&
        !passwordState.passwordMessage &&
        !passwordCheckState.passwordCheckMessage &&
        password === passwordCheck
    )
  }, [password, passwordCheck, passwordState, passwordCheckState])

  return isAble
}

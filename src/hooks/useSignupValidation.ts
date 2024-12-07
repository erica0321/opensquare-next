import { useState, useEffect } from 'react'

export function useSignupValidation(
  email: string,
  password: string,
  passwordCheck: string,
  nickname: string,
  profileImage: string,
  emailState: { emailMessage: string },
  passwordState: {
    passwordMessage: string
  },
  passwordCheckState: {
    passwordCheckMessage: string
  },
  nicknameState: {
    nicknameMessage: string
  }
) {
  const [isValid, setIsValid] = useState(false)

  useEffect(
    function checkIsValid() {
      setIsValid(
        !!profileImage &&
          !!email &&
          !!password &&
          !!passwordCheck &&
          !!nickname &&
          !emailState.emailMessage &&
          !passwordState.passwordMessage &&
          !passwordCheckState.passwordCheckMessage &&
          !nicknameState.nicknameMessage
      )
    },
    [
      profileImage,
      email,
      password,
      passwordCheck,
      nickname,
      emailState,
      passwordState,
      passwordCheckState,
      nicknameState,
    ]
  )

  return isValid
}

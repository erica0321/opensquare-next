import styles from './NicknameInput.module.css'
import { NICKNAME_STATUS } from '@/utils/status'
import { apiRequestNoAuth } from '@/utils/fetchData'
import { fetchUrl } from '@/static'
import { Input } from 'antd'
import debounce from 'lodash/debounce'
import { useCallback } from 'react'

type NicknameStatus = (typeof NICKNAME_STATUS)[keyof typeof NICKNAME_STATUS]

interface NicknameState {
  nicknameMessage: string
}

interface NicknameAction {
  type: NicknameStatus
}

interface NicknameInputProps {
  nickname: string
  setNickname: React.Dispatch<React.SetStateAction<string>>
  nicknameState: NicknameState
  nicknameDispatcher: React.Dispatch<NicknameAction>
}

export default function NicknameInput({
  nickname,
  setNickname,
  nicknameState,
  nicknameDispatcher,
}: NicknameInputProps) {
  const handleChangeNickname = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setNickname(value)
    debouncedCheckEmailValidation(value)
  }

  const checkNicknameValidation = async (
    nickname: string
  ): Promise<boolean> => {
    if (!nickname) {
      nicknameDispatcher({ type: NICKNAME_STATUS.Null })
      return false
    }
    nicknameDispatcher({ type: NICKNAME_STATUS.Reset })

    if (String(nickname).includes(' ')) {
      nicknameDispatcher({ type: NICKNAME_STATUS.Space })
      return false
    }
    nicknameDispatcher({ type: NICKNAME_STATUS.Reset })

    const isNicknameDuplicate = await apiRequestNoAuth<{ status: number }>({
      url: `${fetchUrl.signUpNickname}/${nickname}`,
      method: 'POST',
    }).then((data) => data.status === 400)

    if (isNicknameDuplicate) {
      nicknameDispatcher({ type: NICKNAME_STATUS.Duplicate })
      return false
    }
    nicknameDispatcher({ type: NICKNAME_STATUS.Reset })

    return true
  }

  const debouncedCheckEmailValidation = useCallback(
    debounce(checkNicknameValidation, 200),
    []
  )

  return (
    <div className={styles.nicknameContainer}>
      <label htmlFor='nicknameInput' className={styles.inputTitle}>
        닉네임*
      </label>
      <Input
        allowClear
        size='large'
        count={{
          show: true,
        }}
        value={nickname}
        status={!nickname || nicknameState.nicknameMessage ? 'error' : ''}
        type='email'
        placeholder='닉네임을 입력하세요'
        onChange={handleChangeNickname}
      />

      <div className={styles.helperTextContainer}>
        <div className={styles.helperText}>{nicknameState.nicknameMessage}</div>
      </div>
    </div>
  )
}

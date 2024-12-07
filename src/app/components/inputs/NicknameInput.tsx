import styles from './NicknameInput.module.css'
import { NICKNAME_STATUS } from '@/utils/status'
import { apiRequestNoAuth } from '@/utils/fetchData'
import { fetchUrl } from '@/static'

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
    await checkNicknameValidation(value)
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

  return (
    <div className={styles.nicknameContainer}>
      <label htmlFor='nicknameInput' className={styles.inputTitle}>
        닉네임*
      </label>
      <input
        value={nickname}
        type='text'
        id={styles.nicknameSignUpInput}
        maxLength={10}
        required
        onChange={handleChangeNickname}
        placeholder='닉네임을 입력하세요'
      />
      <div className={styles.helperTextContainer}>
        <div className={styles.helperText}>{nicknameState.nicknameMessage}</div>
      </div>
    </div>
  )
}

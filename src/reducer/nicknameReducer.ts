import {
  nicknameDuplicateError,
  nicknameNullError,
  nicknameSpaceError,
} from '../utils/errorMessage'
import { NICKNAME_STATUS } from '@/utils/status'

interface NicknameState {
  nicknameMessage: string
}

export const nicknameInitialMessage: NicknameState = { nicknameMessage: '' }

type NicknameAction =
  | { type: typeof NICKNAME_STATUS.Null }
  | { type: typeof NICKNAME_STATUS.Space }
  | { type: typeof NICKNAME_STATUS.Duplicate }
  | { type: typeof NICKNAME_STATUS.Reset }

export function nicknameMessageReduer(
  _: NicknameState,
  action: NicknameAction
): NicknameState {
  switch (action.type) {
    case NICKNAME_STATUS.Null:
      return { nicknameMessage: nicknameNullError }
    case NICKNAME_STATUS.Space:
      return { nicknameMessage: nicknameSpaceError }
    case NICKNAME_STATUS.Duplicate:
      return { nicknameMessage: nicknameDuplicateError }
    case NICKNAME_STATUS.Reset:
      return nicknameInitialMessage
    default:
      throw new Error(`Unexpected action type ${action.type}`)
  }
}

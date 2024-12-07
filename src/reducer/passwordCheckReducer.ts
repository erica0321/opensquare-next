import {
  passwordCheckNullError,
  passwordNotSameError,
} from '../utils/errorMessage'
import { PASSWORD_CHECK_STATUS } from '@/utils/status'

interface PasswordCheckState {
  passwordCheckMessage: string
}

export const passwordCheckInitialMessage: PasswordCheckState = {
  passwordCheckMessage: '',
}

type PasswordCheckAction =
  | { type: typeof PASSWORD_CHECK_STATUS.Null }
  | { type: typeof PASSWORD_CHECK_STATUS.NotSame }
  | { type: typeof PASSWORD_CHECK_STATUS.Reset }

export function passwordCheckMessageReducer(
  _: PasswordCheckState,
  action: PasswordCheckAction
): PasswordCheckState {
  switch (action.type) {
    case PASSWORD_CHECK_STATUS.Null:
      return { passwordCheckMessage: passwordCheckNullError }
    case PASSWORD_CHECK_STATUS.NotSame:
      return { passwordCheckMessage: passwordNotSameError }
    case PASSWORD_CHECK_STATUS.Reset:
      return passwordCheckInitialMessage
    default:
      throw new Error(`Unexpected action type ${action.type}`)
  }
}

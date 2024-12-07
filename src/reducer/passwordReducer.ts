import {
  passwordNullError,
  passwordNotSameError,
  passwordNotMatchError,
} from '../utils/errorMessage'
import { PASSWORD_STATUS } from '@/utils/status'

interface PasswordState {
  passwordMessage: string
}

export const passwordInitialMessage: PasswordState = { passwordMessage: '' }

type PasswordAction =
  | { type: typeof PASSWORD_STATUS.Null }
  | { type: typeof PASSWORD_STATUS.NotSame }
  | { type: typeof PASSWORD_STATUS.NotMatch }
  | { type: typeof PASSWORD_STATUS.Reset }

export function passwordMessageReducer(
  _: PasswordState,
  action: PasswordAction
): PasswordState {
  switch (action.type) {
    case PASSWORD_STATUS.Null:
      return { passwordMessage: passwordNullError }
    case PASSWORD_STATUS.NotSame:
      return { passwordMessage: passwordNotSameError }
    case PASSWORD_STATUS.NotMatch:
      return { passwordMessage: passwordNotMatchError }
    case PASSWORD_STATUS.Reset:
      return passwordInitialMessage
    default:
      throw new Error(`Unexpected action type ${action.type}`)
  }
}

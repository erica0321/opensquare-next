import {
  emailNullError,
  emailNotValidError,
  emailDuplicateError,
} from '../utils/errorMessage'
import { EMAIL_STATUS } from '@/utils/status'

interface EmailState {
  emailMessage: string
}

export const emailInitialMessage: EmailState = { emailMessage: '' }

type EmailAction =
  | { type: typeof EMAIL_STATUS.Null }
  | { type: typeof EMAIL_STATUS.NotValid }
  | { type: typeof EMAIL_STATUS.Duplicate }
  | { type: typeof EMAIL_STATUS.Reset }

export function emailMessageReducer(
  _: EmailState,
  action: EmailAction
): EmailState {
  switch (action.type) {
    case EMAIL_STATUS.Null:
      return { emailMessage: emailNullError }
    case EMAIL_STATUS.NotValid:
      return { emailMessage: emailNotValidError }
    case EMAIL_STATUS.Duplicate:
      return { emailMessage: emailDuplicateError }
    case EMAIL_STATUS.Reset:
      return emailInitialMessage
    default:
      throw new Error(`Unexpected action type ${action.type}`)
  }
}

import { getHeadersWithToken } from '@/static'
import Link from 'next/link'
import ProfileImage from './ProfileImage'
import useFetch from '@/hooks/useFetch'
import LogoutButton from './buttons/LogoutButton'
import styles from './UserProfile.module.css'
import { navUrl, fetchUrl } from '@/static'

interface UserData {
  data: {
    createdAt: string
    updatedAt: string
    id: number
    email: string
    profileImage: string
    password: string
    nickname: string
    role: string
    posts: null
  }
  message: null
  status: number
}

export default function UserProfile() {
  const {
    responseData,
    loading,
  }: { responseData: UserData | null; loading: boolean } = useFetch(
    `${fetchUrl.user}`,
    {
      headers: getHeadersWithToken(),
      credentials: 'include',
    }
  )

  if (!responseData || loading) {
    return null
  }

  return (
    <div className={styles.userSetting}>
      {responseData?.data.profileImage ? (
        <ProfileImage image={responseData?.data.profileImage} size={36} />
      ) : (
        <div className={styles.profileImage}></div>
      )}
      <div className={styles.settingList}>
        <Link
          href={navUrl.updateProfile}
          className={`${styles.profileUpdate} ${styles.setting}`}
        >
          프로필 수정
        </Link>
        <Link
          href={navUrl.updatePassword}
          className={`${styles.passwordUpdate} ${styles.setting}`}
        >
          비밀번호 수정
        </Link>
        <LogoutButton />
      </div>
    </div>
  )
}

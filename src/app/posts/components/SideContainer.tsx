import useFetch from '@/hooks/useFetch'
import styles from './SideContainer.module.css'
import { backHost, getHeadersWithToken } from '@/static'
import ProfileImage from '@/app/components/ProfileImage'
import Image from 'next/image'
import sideBanner from '@images/side_banner.png'

interface SideContainerProps {
  responseData: {
    data: {
      profileImage: string
      nickname: string
    }
  }
}

export default function SideContainer({ responseData }: SideContainerProps) {
  const { responseData: countResponseData } = useFetch<{
    data: {
      postCount: number
      commentCount: number
    }
  }>(`${backHost}/api/users/myWrite`, {
    headers: getHeadersWithToken(),
    credentials: 'include',
  })

  return (
    <div className={styles.sideContainer}>
      <div className={styles.sideProfile}>
        <div className={styles.profileContainer}>
          <ProfileImage image={responseData?.data.profileImage} size={40} />
          <strong>🚀 {responseData?.data.nickname}</strong>
        </div>
        <hr />
        <div className={styles.bottomContainer}>
          <div className={styles.count}>
            <span>내 스피치</span>
            {countResponseData?.data ? countResponseData.data.postCount : 0}
          </div>
          <div className={styles.count}>
            <span>내 리스피치</span>
            {countResponseData?.data ? countResponseData.data.commentCount : 0}
          </div>
        </div>
      </div>
      <div className={styles.writeContainer}></div>
      <div className={styles.advertisement}>
        <div className={styles.title}>광고</div>
        <Image
          src={sideBanner}
          alt='사이드 배너'
          className={styles.sideBaner}
        />
      </div>
    </div>
  )
}

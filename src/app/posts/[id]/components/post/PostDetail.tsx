import styles from './PostDetail.module.css'
import ProfileImage from '@components/ProfileImage'
import PostButton from './PostButton'
import PostAction from './PostAction'
import { changeDate } from '@/utils/convertDate'
import Image from 'next/image'

interface PostDetailProps {
  responseData: {
    data: {
      type: string
      profile_image: string
      nickname: string
      created_at: string
      title: string
      post_id: number
      view: number
      commentCount: number
      post_image?: string
      content: string
    }
  } | null
  setIsPostDelete: (isDeleted: boolean) => void
}

export default function PostDetail({
  responseData,
  setIsPostDelete,
}: PostDetailProps) {
  const data = responseData?.data

  return (
    <div className={styles.detailBoard}>
      <div className={styles.boardHeader}>
        <div className={styles.postType}>
          {data?.type === 'other' ? '고민' : '개발'}
        </div>
        <div className={styles.writer}>
          {data?.profile_image && (
            <ProfileImage image={data?.profile_image || ''} size={28} />
          )}
          <p className={styles.postWriterName}>{data?.nickname}</p>
          <div className={styles.postWriteDate}>
            {changeDate(data?.created_at || '0')}
          </div>
        </div>
        <div className={styles.boardHeaderBottom}>
          <span className={styles.detailBoardTitle}>{data?.title}</span>
          <PostButton
            postId={data?.post_id || 0}
            setIsPostDelete={setIsPostDelete}
          />
        </div>
      </div>
      <PostAction view={data?.view || 0} comment={data?.commentCount || 0} />
      <div className={styles.boardBody}>
        {data?.post_image && (
          <div className={styles.boardImageContainer}>
            <Image
              priority
              className={styles.boardImage}
              src={data?.post_image}
              alt='게시글 이미지'
              width={800} // 적절한 너비 설정
              height={600} // 적절한 높이 설정
            />
          </div>
        )}
        <div className={styles.boardDetailContent}>{data?.content}</div>
      </div>
    </div>
  )
}

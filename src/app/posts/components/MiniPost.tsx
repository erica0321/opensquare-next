import { viewToK, commentToK } from '@/utils/convertNumber'
import styles from './MiniPost.module.css'
import Link from 'next/link'
import ProfileImage from '@/app/components/ProfileImage'
import { navUrl } from '@/static'
import { changeDate } from '@/utils/convertDate'

interface MiniPostProps {
  data: {
    post_id: string
    title: string
    view: number
    commentCount?: number
    profile_image: string
    nickname: string
    created_at: string
    type: string
    post_image?: string
  }
}

export default function MiniPost({ data }: MiniPostProps) {
  const postTitle = data.title.slice(0, 26)
  const postView = viewToK(data.view)
  const postCommentCount = commentToK(data.commentCount ?? 0)

  return (
    <Link
      href={`${navUrl.posts}/${data.post_id}`}
      className={styles.miniBoardContainer}
    >
      <div className={styles.miniBoardWriter}>
        <div className={styles.userContainer}>
          <ProfileImage image={data.profile_image} />
          <p className={styles.miniWriterName}>{data.nickname}</p>
        </div>
        <div className={styles.date}>📆 {changeDate(data.created_at)}</div>
      </div>
      <div className={styles.miniBoard}>
        <div className={styles.miniBoardLeft}>
          <div className={styles.titleContainer}>
            <div className={styles.postType}>
              {data.type === 'other' ? '고민' : '개발'}
            </div>
            <div className={styles.miniBoardTitle}>{postTitle}</div>
          </div>
          <div className={styles.miniBoardContent}>
            <div className={styles.action}>
              <div className={styles.miniComment}>댓글 {postCommentCount}</div>
              <div className={styles.miniView}>조회수 {postView}</div>
            </div>
          </div>
        </div>
        {data.post_image && (
          <div className={styles.boardImageContainer}>
            <img
              alt='board'
              className={styles.boardImage}
              src={data.post_image}
            />
          </div>
        )}
      </div>
    </Link>
  )
}

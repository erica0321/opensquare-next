import { viewToK, commentToK } from '@/utils/convertNumber'
import styles from './PostAction.module.css'

export default function PostAction({
  view,
  comment,
}: {
  view: number
  comment: number
}) {
  return (
    <div className={styles.boardAction}>
      <div className={styles.count}>
        <div className={styles.readNumber}>👆🏻 조회수 {viewToK(view)}</div>
        <div className={styles.commentNumber}>
          🗨️ 댓글 {commentToK(comment)}
        </div>
      </div>
    </div>
  )
}

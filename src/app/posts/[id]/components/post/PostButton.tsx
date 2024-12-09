import { checkPostOwner } from '@/utils/checkOwner'
import { navUrl } from '@/static'
import { toast } from 'react-toastify'
import styles from './PostButton.module.css'
import { useRouter } from 'next/navigation'

interface PostButtonProps {
  postId: number
  setIsPostDelete: (isDeleted: boolean) => void
}

export default function PostButton({
  postId,
  setIsPostDelete,
}: PostButtonProps) {
  const router = useRouter()
  const handleClickUpdate = async () => {
    const checkResponseData = await checkPostOwner(postId)
    if (checkResponseData.status === 403) {
      toast.error('본인이 작성한 게시물이 아닙니다.')
      return
    }
    router.push(`${navUrl.posts}/${postId}/update`)
  }

  const handleClickDelete = async () => {
    const checkResponseData = await checkPostOwner(postId)

    if (checkResponseData.status === 403) {
      toast.error('본인이 작성한 게시물이 아닙니다.')
      return
    }
    setIsPostDelete(true)
  }

  return (
    <div className={styles.boardButton}>
      <button onClick={handleClickUpdate} className={styles.updateBoard}>
        ✏️
      </button>
      <button onClick={handleClickDelete} className={styles.deleteBoard}>
        🗑️
      </button>
    </div>
  )
}

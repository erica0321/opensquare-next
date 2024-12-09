import { enableScroll } from '@/utils/scroll'
import { navUrl, fetchUrl } from '@/static'
import { apiRequest } from '@/utils/fetchData'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Modal, Button } from 'antd'

interface DeletePostModalProps {
  postId: number
  setIsPostDelete: (value: boolean) => void
  isPostDelete: boolean
}

export default function DeletePostModal({
  postId,
  setIsPostDelete,
  isPostDelete,
}: DeletePostModalProps) {
  const router = useRouter()
  const title = '게시글을 삭제하시겠습니까?'
  const description = '삭제한 내용은 복구할 수 없습니다.'

  const handleClickDeleteCancel = () => {
    enableScroll()
    setIsPostDelete(false)
  }

  const handleClickDeleteConfirm = async () => {
    try {
      const responseData = await apiRequest({
        url: `${fetchUrl.posts}/${postId}`,
        method: 'DELETE',
      })

      if (responseData.status === 200) {
        toast.success('게시물이 삭제되었습니다.')
        router.push(navUrl.posts) // Next.js의 페이지 이동 방식
      } else {
        toast.error('게시물 삭제 실패')
      }
      setIsPostDelete(false)
      enableScroll()
    } catch (error) {
      console.error('게시물 삭제 중 에러 발생:', error)
      toast.error('게시물 삭제 중 에러가 발생했습니다.')
    }
  }

  return (
    <Modal
      title={title}
      open={isPostDelete}
      onOk={handleClickDeleteConfirm}
      onCancel={handleClickDeleteCancel}
      centered
      footer={[
        <Button key='back' onClick={handleClickDeleteCancel}>
          취소
        </Button>,
        <Button key='submit' type='primary' onClick={handleClickDeleteConfirm}>
          확인
        </Button>,
      ]}
    >
      {description}
    </Modal>
  )
}

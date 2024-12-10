import { fetchUrl } from '@/static'
import { apiRequest } from '@/utils/fetchData'
import { toast } from 'react-toastify'
import { Modal, Button } from 'antd'

interface DeleteCommentModalProps {
  postId: number
  commentId: number
  isCommentDelete: boolean
  setIsCommentDelete: (value: boolean) => void
}

export default function DeleteCommentModal({
  postId,
  commentId,
  isCommentDelete,
  setIsCommentDelete,
}: DeleteCommentModalProps) {
  const title = '댓글을 삭제하시겠습니까?'
  const description = '삭제한 내용은 복구할 수 없습니다.'

  const handleClickDeleteConfirm = async () => {
    try {
      const responseData = await apiRequest({
        url: `${fetchUrl.posts}/${postId}/comments/${commentId}`,
        method: 'DELETE',
      })

      if (responseData?.status === 200) {
        toast.success('댓글이 삭제되었습니다.')
        window.location.reload()
      } else {
        toast.error('댓글 삭제에 실패했습니다.')
      }

      setIsCommentDelete(false)
    } catch (error) {
      toast.error('댓글 삭제 중 에러가 발생했습니다.')
    }
  }

  const handleClickDeleteCancel = () => {
    setIsCommentDelete(false)
  }

  return (
    <Modal
      title={title}
      open={isCommentDelete}
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

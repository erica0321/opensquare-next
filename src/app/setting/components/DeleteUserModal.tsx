import { useRouter } from 'next/navigation'
import { navUrl, fetchUrl } from '@/static'
import { apiRequest } from '@/utils/fetchData'
import { toast } from 'react-toastify'
import { Modal, Button } from 'antd'

interface DeleteUserModalProps {
  isDelete: boolean
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteUserModal({
  isDelete,
  setIsDelete,
}: DeleteUserModalProps) {
  const router = useRouter()
  const title = '회원탈퇴 하시겞습니까?'
  const description = '작성된 게시글과 댓글은 삭제됩니다.'

  const handleClickDeleteUserConfirm = async () => {
    try {
      const deleteData = await apiRequest({
        url: fetchUrl.user,
        method: 'DELETE',
      })

      if (deleteData.status === 200) {
        localStorage.removeItem('token')
        toast.success('계정이 삭제되었습니다.')
        router.push(navUrl.home)
      } else {
        toast.error('계정삭제 실패')
      }
      setIsDelete(false)
    } catch {
      toast.error('계정 삭제 중 에러가 발생했습니다.')
    }
  }

  return (
    <Modal
      title={title}
      open={isDelete}
      onOk={handleClickDeleteUserConfirm}
      onCancel={() => setIsDelete(false)}
      centered
      footer={[
        <Button key='back' onClick={() => setIsDelete(false)}>
          취소
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={handleClickDeleteUserConfirm}
        >
          확인
        </Button>,
      ]}
    >
      {description}
    </Modal>
  )
}

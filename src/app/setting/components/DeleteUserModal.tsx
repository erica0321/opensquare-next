import { useRouter } from 'next/navigation'
import { enableScroll } from '@/utils/scroll'
import Modal from '@/app/components/modals/Modal'
import { navUrl, fetchUrl } from '@/static'
import { apiRequest } from '@/utils/fetchData'
import { toast } from 'react-toastify'

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

  const handleClickDeleteUserCancel = () => {
    setIsDelete(false)
    enableScroll()
  }

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
    } catch (error) {
      console.error('계정 삭제 중 에러 발생:', error)
      toast.error('계정 삭제 중 에러가 발생했습니다.')
    }
  }

  return (
    <Modal
      isShow={isDelete}
      title={title}
      description={description}
      handleCancel={handleClickDeleteUserCancel}
      handleConfirm={handleClickDeleteUserConfirm}
    />
  )
}

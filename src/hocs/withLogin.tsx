import { navUrl } from '@/static'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface WithLoginProps {
  logIn?: boolean
  error?: string
  responseData: {
    data: {
      profileImage: string
      nickname: string
    }
  } | null
}

export default function withLogin<P extends object>(
  Component: React.ComponentType<P>
) {
  return function (props: P & WithLoginProps) {
    const router = useRouter()

    if (props.error) {
      toast.error('로딩 중 에러 발생')
      router.push(navUrl.home)
      return
    }

    if (props.logIn === false) {
      toast.error('로그인 하십시오.')
      router.push(navUrl.home)
      return
    }

    return <Component {...props} />
  }
}

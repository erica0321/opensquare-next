import styles from './PostCountSection.module.css'
import useFetch from '@/hooks/useFetch'
import { backHost, headersNoToken } from '@/static'

interface PostCountData {
  data: number
}

export default function PostCountSection() {
  const { responseData } = useFetch<PostCountData | null>(
    `${backHost}/api/posts/info`,
    {
      headers: headersNoToken,
      credentials: 'include',
    }
  )

  return (
    <div className={styles.section}>
      <div className={styles.countContainer}>
        <div className={styles.title}>📣 지금까지 시작된 스피치</div>
        <div className={styles.count}>{responseData?.data} 개</div>
      </div>
    </div>
  )
}

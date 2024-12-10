import styles from './Layout.module.css'
import Link from 'next/link'
import { navUrl } from '@/static'
import { useSearchParams } from 'next/navigation'
import SideContainer from './components/SideContainer'

interface LayoutProps {
  children: React.ReactNode
  logIn?: boolean
  responseData: {
    data: {
      profileImage: string
      nickname: string
    }
  } | null
}

export default function Layout({ children, responseData }: LayoutProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  if (!responseData) {
    return null
  }

  return (
    <>
      <div className={styles.top}>
        <Link
          href={navUrl.posts}
          className={type === null ? `${styles.tabClicked}` : `${styles.tab}`}
        >
          전체
        </Link>
        <Link
          href={navUrl.codingPosts}
          className={
            type === 'coding' ? `${styles.tabClicked}` : `${styles.tab}`
          }
        >
          개발
        </Link>
        <Link
          href={navUrl.otherPosts}
          className={
            type === 'other' ? `${styles.tabClicked}` : `${styles.tab}`
          }
        >
          고민
        </Link>
        <Link
          href={navUrl.myPosts}
          className={type === 'my' ? `${styles.tabClicked}` : `${styles.tab}`}
        >
          MY 글
        </Link>
      </div>
      <div className={styles.layout}>
        <SideContainer responseData={responseData} />
        {children}
      </div>
    </>
  )
}

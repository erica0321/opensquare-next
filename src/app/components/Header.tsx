'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Header.module.css'
import { navUrl } from '@/static'
import logo from '@images/logo.png'
import Image from 'next/image'
import SearchBar from './SearchBar'
import { useShowProfile } from '@/hooks/useShowProfile'
import UserProfile from './UserProfile'

export default function Header() {
  const path = usePathname()
  const { showProfile } = useShowProfile(path)
  return (
    <section className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link
          className={styles.navbarTitle}
          href={path === navUrl.home ? navUrl.home : navUrl.posts}
        >
          <Image alt='로고이미지' src={logo} className={styles.logo} />
        </Link>
        {showProfile ? (
          <div className={styles.navbarRight}>
            <SearchBar />
            <Link className={styles.writeBtn} href={navUrl.addPost}>
              📣 새 스피치
            </Link>
            <UserProfile />
          </div>
        ) : (
          <div className={styles.emptyUserProfile}></div>
        )}
      </div>
    </section>
  )
}

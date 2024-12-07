import search from '@images/search.png'
import styles from './SearchBar.module.css'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { navUrl } from '@/static'
import Image from 'next/image'

export default function SearchBar() {
  const [focus, setFocus] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const searchContainerRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  function handleFocusInput(): void {
    setFocus(true)
  }

  function handleClickOutside(event: MouseEvent): void {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setFocus(false)
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value)
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('q', inputValue)
      router.push(`${navUrl.posts}${currentUrl.search}`)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={searchContainerRef}
      className={focus ? styles.searchContainerFocus : styles.searchContainer}
    >
      <Image alt='search' src={search} className={styles.searchIcon} />
      <input
        onFocus={handleFocusInput}
        className={styles.searchInput}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

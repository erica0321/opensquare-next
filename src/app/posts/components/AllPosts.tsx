import { useState, useRef, useCallback, useEffect } from 'react'
import { fetchUrl, getHeadersWithToken } from '@/static'
import styles from './AllPosts.module.css'
import useFetch from '@/hooks/useFetch'
import MiniPost from './MiniPost'

interface AllPostsProps {
  type: string | null
  search: string | null
}

interface Post {
  post_id: string
  title: string
  view: number
  commentCount?: number
  profile_image: string
  nickname: string
  created_at: string
  type: string
  post_image?: string
}

interface ResponseData {
  data: Post[]
}

export default function AllPosts({ type, search }: AllPostsProps) {
  const [page, setPage] = useState(0)
  const [data, setData] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  const loadMorePosts = useCallback(() => {
    let url = `${fetchUrl.posts}?page=${page}&size=20`

    const params = new URLSearchParams()
    if (type) {
      params.append('type', encodeURIComponent(type))
    }
    if (search) {
      params.append('q', encodeURIComponent(search))
    }
    if (params.toString()) {
      url += `&${params.toString()}`
    }
    return url
  }, [page, type, search])

  const { responseData, loading } = useFetch<ResponseData>(loadMorePosts(), {
    headers: getHeadersWithToken(),
    credentials: 'include',
  })

  useEffect(() => {
    if (responseData?.data) {
      setData((prevData) => {
        const existingIds = new Set(prevData.map((post) => post.post_id))
        const newData = responseData.data.filter(
          (post) => !existingIds.has(post.post_id)
        )
        return [...prevData, ...newData]
      })
      setHasMore(responseData.data.length > 0)
    }
  }, [responseData])

  useEffect(() => {
    setData([])
    setPage(0)
  }, [type, search])

  const lastPostElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <div>
      <div ref={lastPostElementRef} className={styles.postsWrapper}>
        {data.map((post) => (
          <MiniPost key={post.post_id} data={post} />
        ))}
        <div className={styles.target}></div>
      </div>
      <div className={styles.target} ref={lastPostElementRef}></div>
      {loading && <p>Loading...</p>}
    </div>
  )
}

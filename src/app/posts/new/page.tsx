import styles from './Page.module.css'
import AddPostComponent from './components/AddPostComponent'

export default function Page() {
  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <div className={styles.addPost}>
          <p className={styles.pageTitle}>게시글 작성</p>
          <AddPostComponent />
        </div>
      </div>
    </section>
  )
}

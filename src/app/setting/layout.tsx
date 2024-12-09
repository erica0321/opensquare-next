import styles from './layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.container}>
      <div className={styles.main}>{children}</div>
    </section>
  )
}

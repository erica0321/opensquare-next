import styles from './BottomSection.module.css'

export default function BottomSection() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <p>Made By erica.rho</p>
        <a
          href='https://github.com/erica0321'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          Go Github
        </a>
      </div>
    </div>
  )
}

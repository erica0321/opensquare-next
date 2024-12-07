import styles from './ReplySection.module.css'
import computerLottie from '@/assets/lotties/reply.json'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
})

export default function ReplySection() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.title}>리스피치</div>
        <Lottie className={styles.lottie} animationData={computerLottie} />
        <div className={styles.content}>관심 있는 스피치 속</div>
        <div className={styles.content}>나의 스피치를</div>
        <div className={styles.content}>이어나갈 수 있어요!</div>
      </div>
    </div>
  )
}

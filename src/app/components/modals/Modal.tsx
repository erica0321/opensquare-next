import { usePosition } from '@/hooks/usePosition'
import styles from './Modal.module.css'

interface ModalProps {
  isShow: boolean
  title: string
  description: string
  handleCancel: () => void
  handleConfirm: () => void
}

export default function Modal({
  isShow,
  title,
  description,
  handleCancel,
  handleConfirm,
}: ModalProps) {
  const position = usePosition(isShow)

  if (!isShow) {
    return null
  }

  return (
    <div className={styles.modalContainer} style={{ top: `${position}px` }}>
      <div className={styles.deem}></div>
      <div className={`${styles.memberDelete} ${styles.modal}`}>
        <p className={styles.title}>{title}</p>
        <div className={styles.description}>{description}</div>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleCancel}
            className={`${styles.cancelButton} ${styles.button}`}
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles.submitButton} ${styles.button}`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

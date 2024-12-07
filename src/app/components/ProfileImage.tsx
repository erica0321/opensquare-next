import styles from './ProfileImage.module.css'

interface ProfileImageProps {
  image: string
  size?: number
}

export default function ProfileImage({ image, size = 32 }: ProfileImageProps) {
  return (
    <img
      alt='profile'
      src={image}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={styles.userImage}
    />
  )
}

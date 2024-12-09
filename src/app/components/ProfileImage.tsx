import styles from './ProfileImage.module.css'
import Image from 'next/image'

interface ProfileImageProps {
  image: string
  size?: number
}

export default function ProfileImage({ image, size = 32 }: ProfileImageProps) {
  return (
    <Image
      alt='profile'
      src={image}
      width={size}
      height={size}
      className={styles.userImage}
    />
  )
}

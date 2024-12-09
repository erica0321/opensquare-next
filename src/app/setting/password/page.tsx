import styles from './page.module.css'
import UpdatePasswordContainer from './component/UpdatePasswordComponent'

export default function UpdatePassword() {
  return (
    <section className={styles.passwordMain}>
      <p className={styles.pageTitle}>비밀번호 수정</p>
      <UpdatePasswordContainer />
    </section>
  )
}

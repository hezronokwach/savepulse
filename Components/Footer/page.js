import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={`${styles.footerdiv} mt-auto w-full`}>
      <p className={styles.copyright}>© 2024 SavePulse. Saving Lives Together.</p>
      <ul className={styles.socialLinks}>
        <li className={styles.socialLinkItem}>Twitter</li>
        <li className={styles.socialLinkItem}>Facebook</li>
        <li className={styles.socialLinkItem}>LinkedIn</li>
        <li className={styles.socialLinkItem}>Instagram</li>
      </ul>
    </footer>
  );
}
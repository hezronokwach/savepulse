import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className={styles.nav}>
        <div className={styles["nav-logo"]}>
          <Link href="/" className={styles["nav-link"]}>
            <Image 
              src="/images/img10.jpg" 
              alt="SavePulse Logo" 
              width={50}  
              height={100} 
              priority
            />
          </Link>
        </div>
        <div className={styles["nav-links"]}>
          <Link href="/" className={styles["nav-link"]}>Home</Link>
          <Link href="/about" className={styles["nav-link"]}>About Us</Link>
          <Link href="/contact" className={styles["nav-link"]}>Contact</Link>
          <Link href="/FAQs" className={styles["nav-link"]}>FAQs</Link>
        </div>
      </nav>
    </header>
  );
}
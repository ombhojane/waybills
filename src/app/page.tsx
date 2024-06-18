import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <h1>Welcome to MNCL Waybill Portal</h1>
      <nav className={styles.navigation}>
        <Link href="/register-delivery" legacyBehavior>
          <a className={styles.link}>Register Delivery Person</a>
        </Link>
        <Link href="/login-delivery" legacyBehavior>
          <a className={styles.link}>Login as Delivery Person</a>
        </Link>
        <Link href="/register-client" legacyBehavior>
          <a className={styles.link}>Client Register</a>
        </Link>
        <Link href="/login-client" legacyBehavior>
          <a className={styles.link}>Client Login</a>
        </Link>
      </nav>
    </div>
  );
}

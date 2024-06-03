'use client'
import React from 'react';
import Form from '../../components/Form';
import styles from "../src/app/page.module.css";
import Link from 'next/link';

export default function Page() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'white',
      backgroundRepeat: 'no-repeat'
    }}>
      
      <Link href="/register-delivery">
        Go to Delivery Person Registration 
      </Link>

      <Link href="/login-delivery">Login Delivery </Link>

      {/* <Link href="/delivery-form">
        Go to Delivery Form
      </Link> */}
      <Link href="/register-client">
        Go to Delivery Person Registration
      </Link>
      <Link href="/login-client">
        Client Login
      </Link>
    </div>
  );
}
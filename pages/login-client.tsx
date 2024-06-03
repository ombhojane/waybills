import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './login-client.module.css';

export default function LoginClient() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/client-login', formData);
      console.log(response.data); // { token: '...' }
      // handle successful login (e.g., redirect, show message, etc.)
      router.push('/client');
    } catch (error) {
      console.error(error);
      // handle error (e.g., show error message)
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Client Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formField}>
            Email
            <input type="email" value={formData.email} onChange={handleChange} name="email" required />
          </label>
          <label className={styles.formField}>
            Password
            <input type="password" value={formData.password} onChange={handleChange} name="password" required />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
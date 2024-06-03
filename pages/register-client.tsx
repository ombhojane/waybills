import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './register-client.module.css';

export default function RegisterClient() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
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
      const response = await axios.post('/api/client-onboarding', formData);
      console.log(response.data); // { token: '...' }
      // handle successful registration (e.g., redirect, show message, etc.)
      router.push('/client');
    } catch (error) {
      console.error(error);
      // handle error (e.g., show error message)
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Client Registration</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formField}>
            Name
            <input type="text" value={formData.name} onChange={handleChange} name="name" required />
          </label>
          <label className={styles.formField}>
            Username
            <input type="text" value={formData.username} onChange={handleChange} name="username" required />
          </label>

          <label className={styles.formField}>
            Email
            <input type="text" value={formData.email} onChange={handleChange} name="email" required />
          </label>

          <label className={styles.formField}>
            Password
            <input type="password" value={formData.password} onChange={handleChange} name="password" required />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
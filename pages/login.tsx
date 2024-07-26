import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './auth.module.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Cookies from 'js-cookie';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/mumbai');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/login', formData);
      setLoading(false);

      if (response.data.success) {
        Cookies.set('token', response.data.token, { expires: 7 });

        router.push('/mumbai');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <div className={styles.gradientBackground}>
            <img
              src="https://i.ibb.co/1MtD2ZG/download.png"
              alt="Login Illustration"
              className={styles.illustration}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.icon} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            </div>
            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

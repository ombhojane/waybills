import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './auth.module.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post('/api/login', formData);
      console.log('Login response:', response.data);
      setLoading(false);

      // In login.tsx, update the handleSubmit function
if (response.data.success && response.data.branch) {
  const branch = response.data.branch.toLowerCase();
  const redirectPath = `/${branch}`;
  try {
    await router.push({
      pathname: redirectPath,
      query: { name: response.data.name, role: response.data.role },
    });
    console.log('Redirection successful');
  } catch (routerError) {
    console.error('Router push failed:', routerError);
    console.log('Falling back to window.location.href');
    window.location.href = `${redirectPath}?name=${response.data.name}&role=${response.data.role}`;
  }
} else {
        console.error('Login failed:', response.data.message);
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
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

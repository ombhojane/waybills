import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './auth.module.css';

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

      if (response.data.success && response.data.branch) {
        const branch = response.data.branch.toLowerCase();
        const redirectPath = `/${branch}`;
        console.log('Attempting to redirect to:', redirectPath);
        
        try {
          await router.push(redirectPath);
          console.log('Redirection successful');
        } catch (routerError) {
          console.error('Router push failed:', routerError);
          console.log('Falling back to window.location.href');
          window.location.href = redirectPath;
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
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
}
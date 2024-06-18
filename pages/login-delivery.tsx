import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './register-delivery.module.css'; // Assuming you want to use the same CSS module

export default function LoginDelivery() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // State to manage loading status
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    try {
      const response = await axios.post('/api/login', formData);
      console.log(response.data); // Log the token or other data
      setLoading(false); // Set loading to false once the request is completed
      router.push('/delivery-dashboard'); // Redirect to the delivery dashboard instead of the delivery form
    } catch (error) {
      setLoading(false); // Ensure loading is set to false on error
      console.error(error);
      // Here you could add an error message display if needed
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Delivery Person Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formField}>
            Email
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
              className={styles.input}
            />
          </label>
          <label className={styles.formField}>
            Password
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
              className={styles.input}
            />
          </label>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

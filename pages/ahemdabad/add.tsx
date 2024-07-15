import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../auth.module.css';

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
    branch: 'Ahemdabad', 
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/register', formData);
      setLoading(false);
      router.push('/ahemdabad');
    } catch (error) {
      setLoading(false);
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Add User</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="delivery">Delivery Partner</option>
            <option value="admin">Admin</option>
          </select>
          <input type="text" name="branch" value={formData.branch} readOnly />
          <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add User'}</button>
        </form>
      </div>
    </div>
  );
}

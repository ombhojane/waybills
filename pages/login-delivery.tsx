import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginDelivery() {
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
      const response = await axios.post('/api/login', formData);
      console.log(response.data); // { token: '...' }
      // handle successful login (e.g., redirect, show message, etc.)
      router.push('/delivery-form');
    } catch (error) {
      console.error(error);
      // handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h1>Delivery Person Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={formData.email} onChange={handleChange} name="email" required />
        </label>
        <label>
          Password
          <input type="password" value={formData.password} onChange={handleChange} name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
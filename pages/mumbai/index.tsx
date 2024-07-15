import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../dashboard.module.css';

export default function MumbaiDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const renderButtons = () => {
    if (!user) return null;
    switch (user.role) {
      case 'admin':
        return (
          <>
            <button onClick={() => router.push('/mumbai/add')}>Manage Users</button>
            <button onClick={() => router.push('/mumbai/delivery-dashboard')}>
  View Orders
</button>
            <button>View Reports</button>
          </>
        );
      case 'delivery':
        return (
          <>
            <button>View Assignments</button>
            <button>Update Delivery Status</button>
          </>
        );
      case 'client':
        return (
          <>
            <button>Place Order</button>
            <button>Track Order</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Mumbai Dashboard</h1>
      {user && <p>Welcome, {user.name}</p>}
      <div className={styles.buttonContainer}>
        {renderButtons()}
      </div>
    </div>
  );
}
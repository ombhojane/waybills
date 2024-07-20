import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../dashboard.module.css';

interface User {
  name: string;
  role: 'admin' | 'delivery' | 'client';
  // add other properties as needed
}

export default function AhmedabadDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
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
            <button onClick={() => router.push('/ahmedabad/add')}>Manage Users</button>
            <button onClick={() => router.push('/ahmedabad/delivery-dashboard')}>
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
      <h1>Ahmedabad Dashboard</h1>
      {user && <p>Welcome, {user.name}</p>}
      <div className={styles.buttonContainer}>
        {renderButtons()}
      </div>
    </div>
  );
}
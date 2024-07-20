import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../dashboard.module.css';

interface User {
  name: string;
  role: 'admin' | 'delivery' | 'client';
}

export default function MumbaiDashboard() {
  const [user, setUser] = useState<User>({ name: 'John Doe', role: 'admin' });
  const router = useRouter();

  const renderButtons = () => {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <button onClick={() => router.push('/mumbai/add')}>Manage Users</button>
            <button onClick={() => router.push('/mumbai/delivery-dashboard')}>View Orders</button>
            <button onClick={() => router.push('/mumbai/reports')}>View Reports</button>
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
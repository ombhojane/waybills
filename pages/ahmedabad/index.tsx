import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../dashboard.module.css';

interface User {
  name: string;
  role: 'admin' | 'delivery' | 'client';
  // add other properties as needed
}

export default function AhmedabadDashboard() {
  const [user, setUser] = useState<User>({ name: 'John Doe', role: 'admin' });
  const router = useRouter();

  const renderButtons = () => {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <button onClick={() => router.push('/ahmedabad/add')}>Manage Users</button>
            <button onClick={() => router.push('/ahmedabad/delivery-dashboard')}>View Orders</button>
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
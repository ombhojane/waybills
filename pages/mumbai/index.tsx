import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../dashboard.module.css';

interface User {
  name: string;
  role: 'admin' | 'delivery' | 'client';
}

interface DashboardButton {
  label: string;
  onClick: () => void;
}

const MumbaiDashboard: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const [user] = React.useState<User>({ name: name as string || 'User', role: 'admin' });

  const dashboardButtons: Record<User['role'], DashboardButton[]> = {
    admin: [
      { label: 'Manage Users', onClick: () => router.push('/mumbai/add') },
      { label: 'View Orders', onClick: () => router.push('/mumbai/delivery-dashboard') },
      { label: 'View Reports', onClick: () => router.push('/mumbai/reports') },
    ],
    delivery: [
      { label: 'View Assignments', onClick: () => console.log('View Assignments') },
      { label: 'Update Delivery Status', onClick: () => console.log('Update Delivery Status') },
    ],
    client: [
      { label: 'Place Order', onClick: () => console.log('Place Order') },
      { label: 'Track Order', onClick: () => console.log('Track Order') },
    ],
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <Image src="https://i.ibb.co/2cck053/gate-of-india.png" alt="Mumbai Icon" width={50} height={50} />
        <h1 className={styles.title}>Mumbai Dashboard</h1>
      </div>
      {user && <p className={styles.welcome}>Welcome, {user.name}</p>}
      <div className={styles.buttonContainer}>
        {dashboardButtons[user.role].map((button, index) => (
          <button key={index} className={styles.actionButton} onClick={button.onClick}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MumbaiDashboard;

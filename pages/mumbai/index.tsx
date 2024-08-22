// mumbai/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../dashboard.module.css';
import { FaUserCog, FaClipboardList, FaChartBar, FaTasks, FaTruck, FaShoppingCart, FaSearchLocation } from 'react-icons/fa';
import { getUserData } from '../../lib/authMiddleware';

interface User {
  name: string;
  role: 'admin' | 'delivery' | 'client';
  branch: string;
}

interface DashboardButton {
  label: string;
  onClick: () => void;
  icon: React.ReactElement;
}

const MumbaiDashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUserData();
    if (userData && userData.branch.toLowerCase() === 'mumbai') {
      setUser(userData as User);
    } else {
      router.push('/onboarding');
    }
  }, [router]);

  const dashboardButtons: Record<User['role'], DashboardButton[]> = {
    admin: [
      { label: 'Manage Users', onClick: () => router.push('/mumbai/add'), icon: <FaUserCog /> },
      { label: 'View Orders', onClick: () => router.push('/mumbai/delivery-dashboard'), icon: <FaClipboardList /> },
      { label: 'View Reports', onClick: () => router.push('/mumbai/reports'), icon: <FaChartBar /> },
    ],
    delivery: [
      { label: 'View Assignments', onClick: () => console.log('View Assignments'), icon: <FaTasks /> },
      { label: 'Update Delivery Status', onClick: () => router.push('/mumbai/del-update'), icon: <FaTruck /> },
    ],
    client: [
      { label: 'Place Order', onClick: () => console.log('Place Order'), icon: <FaShoppingCart /> },
      { label: 'Track Order', onClick: () => console.log('Track Order'), icon: <FaSearchLocation /> },
    ],
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <Image src="https://i.ibb.co/2cck053/gate-of-india.png" alt="Mumbai Icon" width={50} height={50} />
        <h1 className={styles.title}>Mumbai Dashboard</h1>
      </div>
      <p className={styles.welcome}>Welcome, {user.name}</p>
      <div className={styles.buttonContainer}>
        {dashboardButtons[user.role].map((button, index) => (
          <button key={index} className={styles.actionButton} onClick={button.onClick}>
            <span className={styles.buttonIcon}>{button.icon}</span>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MumbaiDashboard;
// pages/onboarding.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './onboarding.module.css';
import { FaBuilding, FaCity, FaLandmark } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getUserData } from '../lib/authMiddleware';

const branches = [
  { name: 'mumbai', icon: <FaCity />, label: 'Mumbai' },
  { name: 'ahmedabad', icon: <FaLandmark />, label: 'Ahmedabad' },
  { name: 'bkc', icon: <FaBuilding />, label: 'BKC' },
];

export default function Onboarding() {
  const [userBranch, setUserBranch] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = getUserData();
    setUserBranch(userData?.branch.toLowerCase() || '');
  }, []);

  const handleBranchSelect = (branch: string) => {
    if (branch === userBranch) {
      router.push(`/${branch}`);
    } else {
      setError(`Access denied. You can only access your assigned branch: ${userBranch}`);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Select Your Branch
      </motion.h1>
      <div className={styles.branchList}>
        {branches.map((branch, index) => (
          <motion.button
            key={branch.name}
            onClick={() => handleBranchSelect(branch.name)}
            className={`${styles.branchButton} ${branch.name === userBranch ? styles.activeBranch : ''}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.branchIcon}>{branch.icon}</span>
            {branch.label}
          </motion.button>
        ))}
      </div>
      {error && (
        <motion.p 
          className={styles.error}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
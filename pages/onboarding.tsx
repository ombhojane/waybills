import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './onboarding.module.css';

const branches = ['mumbai', 'ahmedabad', 'bkc'];

export default function Onboarding() {
  const [userBranch, setUserBranch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    setUserBranch(userData.branch ? userData.branch.toLowerCase() : '');
  }, []);

  const handleBranchSelect = (branch: string) => {
    if (branch === userBranch) {
      router.push(`/${branch}`);
    } else {
      alert('Access denied. You can only access your assigned branch.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Select Your Branch</h1>
      <div className={styles.branchList}>
        {branches.map((branch) => (
          <button
            key={branch}
            onClick={() => handleBranchSelect(branch)}
            className={styles.branchButton}
          >
            {branch.charAt(0).toUpperCase() + branch.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
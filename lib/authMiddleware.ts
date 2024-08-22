// lib/authMiddleware.ts
import { NextPageContext } from 'next';

export function getUserData() {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
}

export function requireAuth(context: NextPageContext) {
  const { res } = context;
  const userData = getUserData();

  if (!userData) {
    if (res) {
      res.writeHead(302, { Location: '/login' });
      res.end();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return userData;
}
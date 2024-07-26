// lib/authMiddleware.ts
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const secretKey = 'your-secret-key'; // Use an environment variable for the secret key

export function authenticateToken(req: NextApiRequest) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}

export function requireAuth(context: NextPageContext) {
  const { req, res } = context;
  const user = authenticateToken(req as NextApiRequest);

  if (!user) {
    if (res) {
      res.writeHead(302, { Location: '/login' });
      res.end();
    }
  }

  return user;
}

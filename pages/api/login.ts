import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const secretKey = 'your-secret-key'; // Use an environment variable for the secret key

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log('Received login request for email:', email);

    let client;
    try {
      client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
      console.log('Connected to MongoDB');
      const db = client.db(process.env.DB_NAME);

      const user = await db.collection('users').findOne({ email });

      if (!user) {
        console.log('User not found:', email);
        res.status(400).json({ success: false, message: 'User does not exist' });
        return;
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        console.log('Invalid password for user:', email);
        res.status(400).json({ success: false, message: 'Invalid password' });
        return;
      }

      // Generate JWT token
      const token = jwt.sign({ email: user.email, name: user.name, role: user.role, branch: user.branch }, secretKey, { expiresIn: '7d' });

      console.log('Login successful for user:', email, 'Branch:', user.branch, 'Role:', user.role);

      // Set cookie with token
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/'
      }));

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
    } finally {
      if (client) await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: 'Only POST requests are allowed' });
  }
}

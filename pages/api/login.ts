import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

      console.log('Login successful for user:', email, 'Branch:', user.branch);
      res.status(200).json({ success: true, branch: user.branch });
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
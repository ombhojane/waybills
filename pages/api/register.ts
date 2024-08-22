import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password, role, branch } = req.body;

    let client;
    try {
      client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
      const db = client.db(process.env.DB_NAME);

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        res.status(400).json({ success: false, message: 'User already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      await db.collection('users').insertOne({
        name,
        email,
        password: hashedPassword,
        role,
        branch
      });

      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ success: false, message: 'An error occurred during registration' });
    } finally {
      if (client) await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: 'Only POST requests are allowed' });
  }
}
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    let client;
    try {
      client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
      const db = client.db(process.env.DB_NAME);

      const user = await db.collection('users').findOne({ email });
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      const { password, ...userWithoutPassword } = user;
      res.status(200).json({ success: true, user: userWithoutPassword });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'An error occurred while fetching user data' });
    } finally {
      if (client) await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: 'Only GET requests are allowed' });
  }
}
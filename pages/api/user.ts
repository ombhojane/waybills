import { MongoClient, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, "d2ea46a961f8222c5f3c13fa6be8b547c3f6461ed6881d3076428579eb14a9f9");
      const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
      const db = client.db(process.env.DB_NAME);

      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id) });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        client.close();
        return;
      }

      const { password, ...userWithoutPassword } = user;
      client.close();
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
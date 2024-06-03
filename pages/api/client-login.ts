// pages/api/login-client.ts
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db(process.env.DB_NAME);

    const existingUser = await db.collection('clients').findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: 'Client does not exist' });
      client.close();
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid password' });
      client.close();
      return;
    }

    const token = jwt.sign({ id: existingUser._id }, 'secret');

    client.close();

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
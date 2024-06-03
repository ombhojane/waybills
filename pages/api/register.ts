// pages/api/register.ts
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db(process.env.DB_NAME);

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      client.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: result.insertedId }, 'secret');

    client.close();

    res.status(201).json({ token });
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
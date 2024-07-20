// pages/api/data.ts
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db("ahmedabad-bills");

    const data = await db.collection('waybills').find().toArray();
    client.close();
    console.log(data);

    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Only GET requests are allowed' });
  }
}
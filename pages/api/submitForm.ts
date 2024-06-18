import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      srNo, date, toName, branch, podNo, senderName, department, particular,
      noOfEnvelopes, weight, rates, dpartner, deliveryDate
    } = req.body;

    const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db(process.env.DB_NAME);

    await db.collection('waybills').insertOne({
      srNo, date, toName, branch, podNo, senderName, department, particular,
      noOfEnvelopes, weight, rates, dpartner, deliveryDate
    });

    client.close();

    res.status(200).json({ message: 'Data sent' });
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}

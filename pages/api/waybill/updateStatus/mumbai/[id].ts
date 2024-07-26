import { MongoClient, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const { deliveryStatus } = req.body; // Allow dynamic status update

  if (!ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: 'Invalid ID provided' });
  }

  if (!deliveryStatus || typeof deliveryStatus !== 'string') {
    return res.status(400).json({ message: 'Invalid delivery status provided' });
  }

  let client;

  try {
    client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db("mumbai-bills");
    const result = await db.collection('waybills').updateOne(
      { _id: new ObjectId(id as string) },
      { $set: { deliveryStatus: deliveryStatus } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Waybill not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: 'Waybill found, but status was not changed' });
    }

    res.status(200).json({ message: `Delivery status updated to ${deliveryStatus}` });
  } catch (error) {
    console.error('Database operation error:', error);
    res.status(500).json({ message: 'Failed to update delivery status', error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
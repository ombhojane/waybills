import { MongoClient, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const { rating, feedbackMessage } = req.body;

  try {
    const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection('waybills').updateOne(
      { _id: new ObjectId(id as string) },
      {
        $set: {
          deliveryStatus: 'Delivered',
          rating,
          feedbackMessage
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Waybill not found or no update needed' });
    }

    res.status(200).json({ message: 'Feedback submitted successfully' });
    client.close();
  } catch (error) {
    console.error('Database update error:', error);
    res.status(500).json({ message: 'Failed to update waybill', error: error.message });
  }
}

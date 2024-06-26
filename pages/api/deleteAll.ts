// pages/api/deleteAll.ts
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
      const db = client.db(process.env.DB_NAME);

      // Delete all documents from the collection
      const result = await db.collection('waybills').deleteMany({});

      client.close();

      res.status(200).json({ message: 'All data deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete data', error: error.message });
      console.error('Error deleting data', error);
    }
  } else {
    res.status(405).json({ message: 'Only DELETE requests are allowed' });
  }
}

// pages/api/updateData.ts
import { MongoClient, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const { id, updatedData } = req.body;

    try {
      const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
      const db = client.db(process.env.DB_NAME);

      const result = await db.collection('waybills').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      client.close();

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Document updated successfully' });
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update data', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Only PUT requests are allowed' });
  }
}

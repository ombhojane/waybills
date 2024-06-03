// pages/api/submitForm.ts
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { serialNumber, name, city, waybillNo, sender, department, noOfDocuments, weight, courierCompany } = req.body;

    const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db(process.env.DB_NAME);

    await db.collection('waybills').insertOne({
      serialNumber,
      name,
      city,
      waybillNo,
      sender,
      department,
      noOfDocuments,
      weight,
      courierCompany
    });

    client.close();

    res.status(200).json({ message: 'Data sent' });
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
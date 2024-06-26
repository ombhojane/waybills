// // pages/api/login.ts
// import { MongoClient } from 'mongodb';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
//     const db = client.db(process.env.DB_NAME);

//     const existingUser = await db.collection('users').findOne({ email });
//     if (!existingUser) {
//       res.status(400).json({ message: 'User does not exist' });
//       client.close();
//       return;
//     }

//     const passwordIsValid = await bcrypt.compare(password, existingUser.password);
//     if (!passwordIsValid) {
//       res.status(400).json({ message: 'Invalid password' });
//       client.close();
//       return;
//     }

//     const token = jwt.sign({ id: existingUser._id }, 'secret');

//     client.close();

//     res.status(200).json({ token });
//   } else {
//     res.status(405).json({ message: 'Only POST requests are allowed' });
//   }
// }
// pages/api/login.ts
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

    const existingUser = await db.collection('users').findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: 'User does not exist' });
      client.close();
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, existingUser.password);
    if (!passwordIsValid) {
      res.status(400).json({ message: 'Invalid password' });
      client.close();
      return;
    }

    const token = jwt.sign({ id: existingUser._id }, "d2ea46a961f8222c5f3c13fa6be8b547c3f6461ed6881d3076428579eb14a9f9");
    console.log(token + " "+  email + password)
    client.close();

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const {
    srNo, date, toName, branch, podNo, senderName, department, particular,
    noOfEnvelopes, weight, rates, dpartner, deliveryDate, clientEmail
  } = req.body;

  // MongoDB Connection and Data Insertion
  try {
    const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db(process.env.DB_NAME);

    await db.collection('waybills').insertOne({
      srNo, date, toName, branch, podNo, senderName, department, particular,
      noOfEnvelopes, weight, rates, dpartner, deliveryDate
    });

    client.close();
  } catch (error) {
    console.error('MongoDB Insert Error:', error);
    return res.status(500).json({ message: 'Database error', error: error.message });
  }

  // Email Sending Setup
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Assuming Gmail for this example
      auth: {
        user: "ombhojane05@gmail.com", // Use environment variables
        pass: "kzez kudy toxu oqoj"
      }
    });

    const mailOptions = {
      from: "ombhojane05@gmail.com",
      to: clientEmail,
      subject: 'New Waybill Submission Confirmation',
      text: `Dear ${toName},\n\nA new waybill has been submitted with the following details:\n\n` +
            `Waybill Number: ${srNo}\nDate: ${date}\nBranch: ${branch}\nPOD Number: ${podNo}\n` +
            `Sender Name: ${senderName}\nDepartment: ${department}\nParticulars: ${particular}\n` +
            `Delivery Partner: ${dpartner}\nExpected Delivery Date: ${deliveryDate}\n\n` +
            `Please review the details and contact us if there are any issues.\n\nBest regards,\nMNCL`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email Sending Error:', error);
    return res.status(500).json({ message: 'Failed to send confirmation email', error: error.message });
  }

  res.status(200).json({ message: 'Data sent and email notification sent successfully.' });
}

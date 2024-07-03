import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const {
    srNo, date, toName, branch, podNo, senderName, department, particular,
    noOfEnvelopes, weight, rates, dpartner, deliveryDate, clientEmail, clientPhoneNumber // New field for client phone number
  } = req.body;

  // MongoDB Connection and Data Insertion
  let insertResult;
  try {
    const client = await MongoClient.connect("mongodb+srv://aminvasudev6:wcw9QsKgW3rUeGA4@waybillcluster.88jnvsg.mongodb.net/?retryWrites=true&w=majority&appName=waybillCluster");
    const db = client.db(process.env.DB_NAME);

    insertResult = await db.collection('waybills').insertOne({
      srNo, date, toName, branch, podNo, senderName, department, particular,
      noOfEnvelopes, weight, rates, dpartner, deliveryDate, deliveryStatus: 'In Transit' // Initial status
    });

    client.close();
  } catch (error) {
    console.error('MongoDB Insert Error:', error);
    return res.status(500).json({ message: 'Database error', error: error.message });
  }

  // Email Sending Setup
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "ombhojane05@gmail.com",
        pass: "kzez kudy toxu oqoj"
      }
    });

    const feedbackUrl = `https://waybills.vercel.app/feedback/${insertResult.insertedId}`;

    const mailOptions = {
      from: "ombhojane05@gmail.com",
      to: clientEmail,
      subject: 'New Waybill Submission Confirmation',
      html: `Dear ${toName},<br><br>A new waybill has been submitted with the following details:<br><br>` +
            `Waybill Number: ${srNo}<br>Date: ${date}<br>Branch: ${branch}<br>POD Number: ${podNo}<br>` +
            `Sender Name: ${senderName}<br>Department: ${department}<br>Particulars: ${particular}<br>` +
            `Delivery Partner: ${dpartner}<br>Expected Delivery Date: ${deliveryDate}<br><br>` +
            `Please review the details and provide feedback: <a href="${feedbackUrl}">Click here</a><br><br>` +
            `Best regards,<br>MNCL`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email Sending Error:', error);
    return res.status(500).json({ message: 'Failed to send confirmation email', error: error.message });
  }

  // SMS Sending Setup
  try {
    const feedbackUrl = `https://waybills.vercel.app/feedback/${insertResult.insertedId}`;

    const smsMessage = `Dear ${toName}, a new waybill has been submitted with Waybill Number: ${srNo}. Expected Delivery Date: ${deliveryDate}. Review: ${feedbackUrl}`;
    
    await twilioClient.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: clientPhoneNumber // Make sure this number is in E.164 format (e.g., +1234567890)
    });
  } catch (error) {
    console.error('SMS Sending Error:', error);
    return res.status(500).json({ message: 'Failed to send SMS notification', error: error.message });
  }

  res.status(200).json({ message: 'Data sent and notifications sent successfully.' });
}

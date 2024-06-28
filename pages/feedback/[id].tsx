import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface WaybillData {
  srNo: string;
  date: string;
  toName: string;
  branch: string;
  podNo: string;
  senderName: string;
  department: string;
  particular: string;
  noOfEnvelopes: string;
  weight: string;
  rates: string;
  deliveryStatus: string;
  deliveryDate: string;
}

const FeedbackPage = () => {
  const [waybill, setWaybill] = useState<WaybillData | null>(null);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchWaybillData(id as string);
    }
  }, [id]);

  const fetchWaybillData = async (id: string) => {
    try {
      const response = await axios.get(`/api/waybill/${id}`);
      setWaybill(response.data);
    } catch (error) {
      console.error('Error fetching waybill:', error);
      setError('Failed to fetch waybill. Please check if the waybill ID is correct or try again later.');
    }
  };

  const submitFeedback = async () => {
    try {
      const response = await axios.post(`/api/waybill/submitFeedback/${id}`, { rating, message });
      alert(response.data.message);
      fetchWaybillData(id as string);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!waybill) return <div className="text-center">Loading...</div>;

  const today = new Date();
  const deliveryDate = new Date(waybill.deliveryDate);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Waybill Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>Waybill Number:</strong> {waybill.srNo}</p>
        <p><strong>Date:</strong> {waybill.date}</p>
        <p><strong>To Name:</strong> {waybill.toName}</p>
        <p><strong>Branch:</strong> {waybill.branch}</p>
        <p><strong>POD Number:</strong> {waybill.podNo}</p>
        <p><strong>Sender Name:</strong> {waybill.senderName}</p>
        <p><strong>Department:</strong> {waybill.department}</p>
        <p><strong>Particulars:</strong> {waybill.particular}</p>
        <p><strong>No of Envelopes:</strong> {waybill.noOfEnvelopes}</p>
        <p><strong>Weight:</strong> {waybill.weight}</p>
        <p><strong>Rates:</strong> {waybill.rates}</p>
        <p><strong>Delivery Status:</strong> {waybill.deliveryStatus}</p>

        {deliveryDate <= today && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Feedback</h2>
            <div className="flex space-x-2 my-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Leave a feedback message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={submitFeedback}>Submit Feedback</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;

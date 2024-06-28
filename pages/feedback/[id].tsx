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

  if (error) return <div>{error}</div>;
  if (!waybill) return <div>Loading...</div>;

  const today = new Date();
  const deliveryDate = new Date(waybill.deliveryDate);

  return (
    <div>
      <h1>Waybill Details</h1>
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
        <div>
          <h2>Feedback</h2>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>{star <= rating ? '★' : '☆'}</button>
            ))}
          </div>
          <textarea
            placeholder="Leave a feedback message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button onClick={submitFeedback}>Submit Feedback</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface WaybillData {
    _id: string;
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
    dpartner: string;
    deliveryDate: string;
    clientEmail: string;
    }
    

const FeedbackPage = () => {
  const [waybill, setWaybill] = useState<WaybillData | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchWaybillData(id as string);
    }
  }, [id]);

  const fetchWaybillData = async (id: string) => {
    try {
      const response = await axios.get<WaybillData>(`/api/waybill/${id}`);
      setWaybill(response.data);
    } catch (error) {
      console.error('Error fetching waybill:', error);
      setError('Failed to fetch waybill. Please check if the waybill ID is correct or try again later.');
    }
  };

  const handleSubmitFeedback = async () => {
    if (!waybill) return;
    try {
      const response = await axios.post(`/api/feedback/${waybill._id}`, {
        rating,
        feedbackMessage,
      });
      alert('Feedback submitted successfully!');
      fetchWaybillData(id as string);  // Refresh waybill data to reflect the updated delivery status
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };

  const canSubmitFeedback = new Date(waybill?.deliveryDate ?? '') <= new Date();

  if (error) return <div>{error}</div>;
  if (!waybill) return <div>Loading...</div>;

  return (
    <div>
      <h1>Waybill Details</h1>
      {/* Display waybill details */}
      {canSubmitFeedback && (
        <div>
          <h2>Submit Your Feedback</h2>
          <label>
            Rating:
            <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
          </label>
          <label>
            Message:
            <textarea value={feedbackMessage} onChange={(e) => setFeedbackMessage(e.target.value)} />
          </label>
          <button onClick={handleSubmitFeedback}>Submit Feedback</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './feedback.module.css'; // Assuming your styles are defined here

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

  if (error) return <div className={styles.container}>{error}</div>;
  if (!waybill) return <div className={styles.container}>Loading...</div>;

  const today = new Date();
  const deliveryDate = new Date(waybill.deliveryDate);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Waybill Details</h1>
      {Object.entries(waybill).map(([key, value]) => (
        <p key={key} className={styles.detail}><strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}</p>
      ))}
      {deliveryDate <= today && (
        <div className={styles.feedbackContainer}>
          <h2>Feedback</h2>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className={styles.starButton} onClick={() => setRating(star)}>
                {star <= rating ? '★' : '☆'}
              </button>
            ))}
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Leave a feedback message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className={styles.submitButton} onClick={submitFeedback}>
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;

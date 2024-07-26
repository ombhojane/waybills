import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../FeedbackPages.module.css';


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
      const response = await axios.post(`/api/waybill/submitFeedback/mumbai/${id}`, { rating, message });
      alert(response.data.message);
      fetchWaybillData(id as string);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (!waybill) return <div className={styles.loading}>Loading...</div>;

  const today = new Date();
  const deliveryDate = new Date(waybill.deliveryDate);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Waybill Details</h1>
      <div className={styles.card}>
        <div className={styles.grid}>
          <DetailItem icon={<PackageIcon />} label="Waybill Number" value={waybill.srNo} />
          <DetailItem icon={<CalendarIcon />} label="Date" value={waybill.date} />
          <DetailItem icon={<UserIcon />} label="To Name" value={waybill.toName} />
          <DetailItem icon={<BuildingIcon />} label="Branch" value={waybill.branch} />
          <DetailItem icon={<DocumentIcon />} label="POD Number" value={waybill.podNo} />
          <DetailItem icon={<UserIcon />} label="Sender Name" value={waybill.senderName} />
          <DetailItem icon={<FolderIcon />} label="Department" value={waybill.department} />
          <DetailItem icon={<ClipboardIcon />} label="Particulars" value={waybill.particular} />
          <DetailItem icon={<MailIcon />} label="No of Envelopes" value={waybill.noOfEnvelopes} />
          <DetailItem icon={<ScaleIcon />} label="Weight" value={waybill.weight} />
          <DetailItem icon={<CurrencyIcon />} label="Rates" value={waybill.rates} />
          <DetailItem icon={<TruckIcon />} label="Delivery Status" value={waybill.deliveryStatus} />
        </div>

        {deliveryDate <= today && (
          <div className={styles.feedbackSection}>
            <h2 className={styles.feedbackTitle}>Feedback</h2>
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`${styles.star} ${star <= rating ? styles.starActive : styles.starInactive}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Leave a feedback message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            ></textarea>
            <button 
              className={styles.button}
              onClick={submitFeedback}
            >
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: JSX.Element, label: string, value: string }) => (
  <div className={styles.detailItem}>
    <div className={styles.icon}>{icon}</div>
    <div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  </div>
);

// SVG icons (24x24)
const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ScaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

const CurrencyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

export default FeedbackPage;
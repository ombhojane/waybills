import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const FeedbackPage = () => {
  const [waybill, setWaybill] = useState<{ deliveryStatus: string } | null>(null);
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
      const response = await axios.get(`/api/waybill/${id}`);
      setWaybill(response.data);
    } catch (error) {
      console.error('Error fetching waybill:', error);
      setError('Failed to fetch waybill. Please check if the waybill ID is correct or try again later.');
    }
  };

  const updateDeliveryStatus = async () => {
    try {
      const response = await axios.put(`/api/waybill/updateStatus/${id}`);
      alert(response.data.message);
      fetchWaybillData(id as string); // Refetch waybill data to update the UI
    } catch (error) {
      console.error('Error updating delivery status:', error);
      alert('Failed to update delivery status. Please try again.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!waybill) return <div>Loading...</div>;

  return (
    <div>
      <h1>Waybill Details</h1>
      <p><strong>Delivery Status:</strong> {waybill.deliveryStatus}</p>
      {waybill.deliveryStatus !== 'Delivered' && (
        <button onClick={updateDeliveryStatus}>Mark as Delivered</button>
      )}
    </div>
  );
};

export default FeedbackPage;

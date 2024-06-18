import { FormEvent, useState } from "react";
import styles from "../src/app/page.module.css";
import React from "react";
import { useRouter } from 'next/router';

export default function Form() {
  const [formData, setFormData] = useState({
    srNo: '',
    date: '',
    toName: '',
    branch: '',
    podNo: '',
    senderName: '',
    department: '',
    particular: '',
    noOfEnvelopes: '',
    weight: '',
    rates: '',
    dpartner: '',
    deliveryDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Success: Data submitted successfully.');
        setFormData({
          srNo: '', date: '', toName: '', branch: '', podNo: '', senderName: '',
          department: '', particular: '', noOfEnvelopes: '', weight: '', rates: '',
          dpartner: '', deliveryDate: ''
        }); // Reset form
      } else {
        setStatus('Failure: Error in sending data.');
      }
    } catch (error) {
      setStatus('Failure: Network or server error.');
      console.error('Error sending data', error);
    }
    setLoading(false);
  };

  // Helper function to format labels
  const formatLabel = (label: string) => {
    return label
      // Split based on uppercase letters
      .replace(/([A-Z])/g, ' $1')
      // Trim leading space and replace underscores with spaces
      .replace(/_/g, ' ')
      // Capitalize each word
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className={styles.container} style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h1 className={styles.formTitle}>Add a New Waybill</h1>
      <h4 className={styles.formHeader}>Waybill Form</h4>
      <form className={styles.form} onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <label key={key} className={styles.formLabel}>
            {formatLabel(key)}
            <input
              className={styles.formInput}
              type={['date', 'deliveryDate'].includes(key) ? 'date' : 'text'}
              value={value}
              onChange={handleChange}
              name={key}
              pattern={key === 'srNo' || key === 'noOfEnvelopes' || key === 'weight' || key === 'rates' ? '\\d*' : undefined}
              required
            />
          </label>
        ))}
        <button type="submit" disabled={loading} className={styles.formButton}>
          {loading ? 'Please wait...' : 'Submit'}
        </button>
      </form>
      <p className={styles.statusMessage}>{status}</p>
      {!loading && status === 'Success: Data submitted successfully.' && (
        <div className={styles.buttonGroup}>
          <button onClick={() => router.push('/delivery-dashboard')} className={styles.dashboardButton}>
            Return to Dashboard
          </button>
          <button onClick={() => {
            setFormData({
              srNo: '', date: '', toName: '', branch: '', podNo: '', senderName: '',
              department: '', particular: '', noOfEnvelopes: '', weight: '', rates: '',
              dpartner: '', deliveryDate: ''
            });
            setStatus('');
          }} className={styles.addMoreButton}>
            Add More Waybills
          </button>
        </div>
      )}
    </div>
  );
}

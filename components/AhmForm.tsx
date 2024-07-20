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
    deliveryDate: '',
    clientEmail: '',  // New field for client email
    clientPhoneNumber: '' // New field for client phone number
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'clientPhoneNumber') {
      // Prepend +91 if not already present
      const formattedValue = value.startsWith('+91') ? value : `+91${value}`;
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const response = await fetch('/api/ahmsubmitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Success: Data submitted successfully.');
        setFormData({
          srNo: '', date: '', toName: '', branch: '', podNo: '', senderName: '',
          department: '', particular: '', noOfEnvelopes: '', weight: '', rates: '',
          dpartner: '', deliveryDate: '', clientEmail: '', clientPhoneNumber: '' // Reset form
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

  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}>Add a New Waybill</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <h3>Sr No.</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.srNo}
            onChange={handleChange}
            name="srNo"
            pattern="^[0-9]+$"
            required
            title="Please enter a valid serial number (digits only)"
          />
          <h3>Date</h3>
          <input
            className={styles.formInput}
            type="date"
            value={formData.date}
            onChange={handleChange}
            name="date"
            required
          />
          <h3>Client Name</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.toName}
            onChange={handleChange}
            name="toName"
            required
          />
        </div>
        <div className={styles.formRow}>
          <h3>Client Email</h3>
          <input
            className={styles.formInput}
            type="email"
            value={formData.clientEmail}
            onChange={handleChange}
            name="clientEmail"
            required
          />
        </div>
        <div className={styles.formRow}>
          <h3>Client Phone Number</h3>
          <input
            className={styles.formInput}
            type="tel"
            value={formData.clientPhoneNumber.replace('+91', '')} // Display without +91
            onChange={handleChange}
            name="clientPhoneNumber"
            pattern="^[0-9]{10}$" // E.164 format without +91
            required
            title="Please enter a valid phone number"
          />
        </div>
        <div className={styles.formRow}>
          <h3>Branch</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.branch}
            onChange={handleChange}
            name="branch"
            required
          />
          <h3>POD No.</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.podNo}
            onChange={handleChange}
            name="podNo"
            required
          />
          <h3>Sender Name</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.senderName}
            onChange={handleChange}
            name="senderName"
            required
          />
        </div>
        <div className={styles.formRow}>
          <h3>Department</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.department}
            onChange={handleChange}
            name="department"
            required
          />
          <h3>Particular</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.particular}
            onChange={handleChange}
            name="particular"
            required
          />
          <h3>No. of Envelopes</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.noOfEnvelopes}
            onChange={handleChange}
            name="noOfEnvelopes"
            pattern="^[0-9]+$"
            required
            title="Please enter a number"
          />
        </div>
        <div className={styles.formRow}>
          <h3>Weight</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.weight}
            onChange={handleChange}
            name="weight"
            pattern="^[0-9]+$"
            required
            title="Weight must be a number"
          />
          <h3>Rates</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.rates}
            onChange={handleChange}
            name="rates"
            pattern="^[0-9]+$"
            required
            title="Please enter a numeric rate"
          />
          <h3>Delivery Partner</h3>
          <input
            className={styles.formInput}
            type="text"
            value={formData.dpartner}
            onChange={handleChange}
            name="dpartner"
            required
          />
        </div>
        <div className={styles.formRow}>
          <h3>Delivery Date</h3>
          <input
            className={styles.formInput}
            type="date"
            value={formData.deliveryDate}
            onChange={handleChange}
            name="deliveryDate"
            required
          />
        </div>
        <button type="submit" disabled={loading} className={styles.formButton}>
          {loading ? 'Please wait...' : 'Submit'}
        </button>
      </form>
      <p className={styles.statusMessage}>{status}</p>
      {!loading && status === 'Success: Data submitted successfully.' && (
        <div className={styles.buttonGroup}>
          <button onClick={() => router.push('/ahmedabad')} className={styles.dashboardButton}>
            Return to Dashboard
          </button>
          <button onClick={() => {
            setFormData({
              srNo: '', date: '', toName: '', branch: '', podNo: '', senderName: '',
              department: '', particular: '', noOfEnvelopes: '', weight: '', rates: '',
              dpartner: '', deliveryDate: '', clientEmail: '', clientPhoneNumber: ''
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './delivery-dashboard.module.css';
import { useRouter } from 'next/router';

interface DataItem {
  _id: string;
  srNo: string;
  date: string;
  toName: string;
  branch: string;
  podNo: string;
  senderName: string;
  department: string;
  particular: string; // Corrected spelling from 'perticular' to 'particular'
  noOfEnvelopes: string;
  weight: string; // Corrected spelling from 'waight' to 'weight'
  rates: string;
  bluedart: string;
  deliveryDate: string;
  [key: string]: string; // Index signature
}

export default function DeliveryDashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<DataItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<DataItem[]>('/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (item: DataItem) => {
    setEditId(item._id);
    setEditFormData(item);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditFormData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editFormData) {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!editFormData || !editId) return;
  
    const { _id, ...dataWithoutId } = editFormData; // Destructure to separate _id from the rest of the data
  
    try {
      const response = await axios.put('/api/updateData', {
        id: editId,
        updatedData: dataWithoutId  // Send without _id
      });
      alert(response.data.message);
      const newData = data.map(item => (item._id === editId ? { ...item, ...editFormData } : item));
      setData(newData);
      handleCancel();
    } catch (error) {
      alert('Failed to update data');
      console.error('Error while updating data:', error);
    }
  };
  


  const handleDeleteAll = async () => {
    if (confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
      try {
        const response = await axios.delete('/api/deleteAll');
        alert(response.data.message);
        fetchData(); // Refresh data after deletion
      } catch (error) {
        alert('Failed to delete data');
        console.error('Error while deleting data:', error);
      }
    }
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delivery Dashboard</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.addButton} onClick={() => router.push('/delivery-form')}>
          Add New Waybill
        </button>
        <button className={styles.deleteButton} onClick={handleDeleteAll}>
          Delete All Data
        </button>
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Insights</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Date</th>
              <th>To Name</th>
              <th>Branch</th>
              <th>POD No</th>
              <th>Sender Name</th>
              <th>Department</th>
              <th>Particular</th>
              <th>No of Envelopes</th>
              <th>Weight</th>
              <th>Rates</th>
              <th>Bluedart</th>
              <th>Delivery Date</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {editId === item._id ? (
                  <>
                    {Object.keys(editFormData || {}).map(key => (
                      key !== '_id' && <td key={key}>
                        <input
                          type="text"
                          name={key}
                          value={(editFormData as DataItem)[key]}
                          onChange={handleChange}
                        />
                      </td>
                    ))}
                    <td>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    {Object.entries(item).map(([key, value], idx) => (
                      key !== '_id' && <td key={idx}>{value}</td>
                    ))}
                    <td>
                      <button onClick={() => handleEditClick(item)}>Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

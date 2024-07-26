import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../delivery-dashboard.module.css';
import { useRouter } from 'next/router';
import * as XLSX from 'xlsx';

interface DataItem {
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
  deliveryStatus: string;
  [key: string]: any;
}

export default function DeliveryDashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<DataItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'intransit' | 'delivered'>('all');
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, filter]);

  const fetchData = async () => {
    try {
      const response = await axios.get<DataItem[]>('/api/ahmdata');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = () => {
    if (filter === 'all') {
      setFilteredData(data);
    } else if (filter === 'intransit') {
      setFilteredData(data.filter(item => item.deliveryStatus === 'In Transit'));
    } else {
      setFilteredData(data.filter(item => item.deliveryStatus === 'Delivered'));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof DataItem;
    const value = e.target.value;
    if (editFormData) {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!editFormData || !editId) return;
  
    const { _id, ...dataWithoutId } = editFormData;
  
    try {
      const response = await axios.put('/api/ahmupdateData', {
        id: editId,
        updatedData: dataWithoutId
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

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(({ _id, ...item }) => item));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "DeliveryData.xlsx");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delivery Dashboard</h1>
      <div className={styles.actions}>
        <div className={styles.filters}>
          <button 
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'intransit' ? styles.active : ''}`}
            onClick={() => setFilter('intransit')}
          >
            In Transit
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'delivered' ? styles.active : ''}`}
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
        </div>
        <button className={styles.addButton} onClick={() => router.push('/ahmedabad/delivery-form')}>
          Add New Waybill
        </button>
        <button className={styles.downloadButton} onClick={handleDownload}>
          Download Data
        </button>
      </div>

      <div className={styles.tableContainer}>
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
              <th>Delivery Partner</th>
              <th>Delivery Date</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                {editId === item._id ? (
                  <>
                    {Object.keys(editFormData || {}).map(key => (
                      key !== '_id' && (
                        <td key={key}>
                          {key === 'deliveryStatus' ? (
                            <select
                              name={key}
                              value={(editFormData as DataItem)[key]}
                              onChange={handleChange}
                              className={styles.editInput}
                            >
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              name={key}
                              value={(editFormData as DataItem)[key]}
                              onChange={handleChange}
                              className={styles.editInput}
                            />
                          )}
                        </td>
                      )
                    ))}
                    <td>
                      <button className={styles.saveButton} onClick={handleSave}>Save</button>
                      <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    {Object.entries(item).map(([key, value], idx) => (
                      key !== '_id' && (
                        <td key={idx}>
                          {key === 'deliveryStatus' ? (
                            <span className={`${styles.status} ${styles[value.toLowerCase().replace(' ', '')]}`}>
                              {value}
                            </span>
                          ) : value}
                        </td>
                      )
                    ))}
                    <td>
                      <button className={styles.editButton} onClick={() => handleEditClick(item)}>Edit</button>
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
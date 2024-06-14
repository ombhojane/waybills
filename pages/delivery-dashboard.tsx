import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './delivery-dashboard.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DataItem {
  serialNumber: string;
  sender: string;
  waybillNo: string;
  noOfDocuments: string;
  weight: string;
  courierCompany: string;
}

export default function DeliveryDashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('/api/data');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delivery Dashboard</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.addButton} onClick={() => router.push('/delivery-form')}>
          Add New Waybill
        </button>
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Insights</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Sender Name</th>
              <th>Waybill Number</th>
              <th>Documents</th>
              <th>Weight</th>
              <th>Courier Partner</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.serialNumber}</td>
                <td>{item.sender}</td>
                <td>{item.waybillNo}</td>
                <td>{item.noOfDocuments}</td>
                <td>{item.weight}</td>
                <td>{item.courierCompany}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

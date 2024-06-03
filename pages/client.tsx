import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./client.module.css";

interface DataItem {
  serialNumber: string;
  sender: string;
  waybillNo: string;
  noOfDocuments: string;
  weight: string;
  courierCompany: string;
}

export default function ClientPage() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<DataItem[]>('/api/data');
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hey Client</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Sender Name</th>
            <th>Waybill Number</th>
            <th>No of Documents</th>
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
  );
}
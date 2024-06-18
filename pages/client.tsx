import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./client.module.css";
import styless from "../src/app/page.module.css";

interface DataItem {
  srNo: string; // Changed from serialNumber to srNo to match DeliveryDashboard
  date: string; // Adding date to match the schema
  toName: string; // Changed from sender to toName to match DeliveryDashboard
  branch: string; // Adding branch to match the schema
  podNo: string; // Changed from waybillNo to podNo to match DeliveryDashboard
  department: string; // Adding department to match the schema
  particular: string; // Adding particular to match the schema
  noOfEnvelopes: string; // Changed from noOfDocuments to noOfEnvelopes to match DeliveryDashboard
  weight: string;
  rates: string; // Adding rates to match the schema
  bluedart: string; // Changed courierCompany to bluedart to match DeliveryDashboard
  deliveryDate: string; // Adding deliveryDate to match the schema
}

export default function ClientPage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('/api/data');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className={styless.title}>Client Dashboard</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Date</th>
            <th>To Name</th>
            <th>Branch</th>
            <th>POD No</th>
            <th>Department</th>
            <th>Particular</th>
            <th>No of Envelopes</th>
            <th>Weight</th>
            <th>Rates</th>
            <th>Bluedart</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.srNo}</td>
              <td>{item.date}</td>
              <td>{item.toName}</td>
              <td>{item.branch}</td>
              <td>{item.podNo}</td>
              <td>{item.department}</td>
              <td>{item.particular}</td>
              <td>{item.noOfEnvelopes}</td>
              <td>{item.weight}</td>
              <td>{item.rates}</td>
              <td>{item.bluedart}</td>
              <td>{item.deliveryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

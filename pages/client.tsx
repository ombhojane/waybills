import React from 'react';
import styles from "./client.module.css";

export default function clientPage() {
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
            
          </tbody>
        </table>
      </div>
    );
}
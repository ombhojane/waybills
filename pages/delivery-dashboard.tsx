import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./delivery-dashboard.module.css";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";

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
  feedback?: {
    rating: number;
    message: string;
  };
}

export default function DeliveryDashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<DataItem | null>(null);
  const [filter, setFilter] = useState<"all" | "intransit" | "delivered">(
    "all"
  );
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchData(token);
    }
  }, []);

  useEffect(() => {
    filterData();
  }, [data, filter]);

  const fetchData = async (token: string) => {
    try {
      const response = await axios.get<DataItem[]>("/api/mumdata", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  };

  const filterData = () => {
    if (filter === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => item.deliveryStatus.toLowerCase() === filter)
      );
    }
  };

  const renderTableCell = (key: string, value: any) => {
    if (key === 'deliveryStatus') {
      return (
        <span className={`${styles.status} ${styles[value.toLowerCase()]}`}>
          {value}
        </span>
      );
    }
    return String(value);
  };
  const renderFeedback = (feedback?: { rating: number; message: string }) => {
    if (feedback && typeof feedback === 'object') {
      return (
        <>
          <span className={styles.rating}>Rating: {feedback.rating}/5</span>
          <br />
          <span className={styles.feedbackMessage}>Message: {feedback.message}</span>
        </>
      );
    }
    return 'N/A';
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
      const response = await axios.put("/api/mumupdateData", {
        id: editId,
        updatedData: dataWithoutId,
      });
      alert(response.data.message);
      const newData = data.map((item) =>
        item._id === editId ? { ...item, ...editFormData } : item
      );
      setData(newData);
      handleCancel();
    } catch (error) {
      alert("Failed to update data");
      console.error("Error while updating data:", error);
    }
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(
      data.map(({ _id, feedback, ...item }) => item)
    );
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
            className={`${styles.filterButton} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "intransit" ? styles.active : ""
            }`}
            onClick={() => setFilter("intransit")}
          >
            In Transit
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "delivered" ? styles.active : ""
            }`}
            onClick={() => setFilter("delivered")}
          >
            Delivered
          </button>
        </div>
        <button
          className={styles.addButton}
          onClick={() => router.push("/mumbai/delivery-form")}
        >
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
              <th>Bluedart</th>
              <th>Delivery Date</th>
              <th>Delivery Status</th>
              <th>Actions</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
  {filteredData.map((item, index) => (
    <tr key={index}>
      {editId === item._id ? (
        <>
          {Object.entries(item).map(([key, value]) => 
            key !== '_id' && key !== 'feedback' && (
              <td key={key}>
                <input
                  type="text"
                  name={key}
                  value={String(value)}
                  onChange={handleChange}
                  className={styles.editInput}
                />
              </td>
            )
          )}
          <td>
            <button className={styles.saveButton} onClick={handleSave}>Save</button>
            <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
          </td>
          <td>{renderFeedback(item.feedback)}</td>
        </>
      ) : (
        <>
          {Object.entries(item).map(([key, value]) => 
            key !== '_id' && key !== 'feedback' && (
              <td key={key}>{typeof value === 'string' ? value : JSON.stringify(value)}</td>
            )
          )}
          <td>
            <button className={styles.editButton} onClick={() => handleEditClick(item)}>Edit</button>
          </td>
          <td>{renderFeedback(item.feedback)}</td>
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

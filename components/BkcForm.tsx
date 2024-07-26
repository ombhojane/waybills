import { FormEvent, useState } from "react";
import styles from "../pages/form.module.css";
import React from "react";
import { useRouter } from "next/router";

export default function Form() {
  const [formData, setFormData] = useState({
    srNo: "",
    date: "",
    toName: "",
    clientEmail: "",
    clientPhoneNumber: "",
    branch: "",
    podNo: "",
    senderName: "",
    department: "",
    particular: "",
    noOfEnvelopes: "",
    weight: "",
    rates: "",
    dpartner: "",
    deliveryDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "clientPhoneNumber") {
      const formattedValue = value.startsWith("+91") ? value : `+91${value}`;
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch("/api/bkcsubmitForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Success: Data submitted successfully.");
        setFormData({
          srNo: "",
          date: "",
          toName: "",
          branch: "",
          podNo: "",
          senderName: "",
          department: "",
          particular: "",
          noOfEnvelopes: "",
          weight: "",
          rates: "",
          dpartner: "",
          deliveryDate: "",
          clientEmail: "",
          clientPhoneNumber: "",
        });
      } else {
        setStatus("Failure: Error in sending data.");
      }
    } catch (error) {
      setStatus("Failure: Network or server error.");
      console.error("Error sending data", error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}>Add a New Waybill</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="srNo">Sr No.</label>
            <input
              id="srNo"
              className={styles.formInput}
              type="text"
              value={formData.srNo}
              onChange={handleChange}
              name="srNo"
              pattern="^[0-9]+$"
              required
              title="Please enter a valid serial number (digits only)"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              className={styles.formInput}
              type="date"
              value={formData.date}
              onChange={handleChange}
              name="date"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="toName">Client Name</label>
            <input
              id="toName"
              className={styles.formInput}
              type="text"
              value={formData.toName}
              onChange={handleChange}
              name="toName"
              required
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="clientEmail">Client Email</label>
            <input
              id="clientEmail"
              className={styles.formInput}
              type="email"
              value={formData.clientEmail}
              onChange={handleChange}
              name="clientEmail"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="clientPhoneNumber">Client Phone Number</label>
            <input
              id="clientPhoneNumber"
              className={styles.formInput}
              type="tel"
              value={formData.clientPhoneNumber.replace("+91", "")}
              onChange={handleChange}
              name="clientPhoneNumber"
              pattern="^[0-9]{10}$"
              required
              title="Please enter a valid phone number"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              className={styles.formInput}
              type="text"
              value={formData.branch}
              onChange={handleChange}
              name="branch"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="podNo">POD No.</label>
            <input
              id="podNo"
              className={styles.formInput}
              type="text"
              value={formData.podNo}
              onChange={handleChange}
              name="podNo"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="senderName">Sender Name</label>
            <input
              id="senderName"
              className={styles.formInput}
              type="text"
              value={formData.senderName}
              onChange={handleChange}
              name="senderName"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="department">Department</label>
            <input
              id="department"
              className={styles.formInput}
              type="text"
              value={formData.department}
              onChange={handleChange}
              name="department"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="particular">Particular</label>
            <input
              id="particular"
              className={styles.formInput}
              type="text"
              value={formData.particular}
              onChange={handleChange}
              name="particular"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="noOfEnvelopes">No. of Envelopes</label>
            <input
              id="noOfEnvelopes"
              className={styles.formInput}
              type="number"
              value={formData.noOfEnvelopes}
              onChange={handleChange}
              name="noOfEnvelopes"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="deliveryDate">Delivery Date</label>
            <input
              id="deliveryDate"
              className={styles.formInput}
              type="date"
              value={formData.deliveryDate}
              onChange={handleChange}
              name="deliveryDate"
              required
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="weight">Weight</label>
            <input
              id="weight"
              className={styles.formInput}
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              name="weight"
              required
              title="Weight can include decimal points"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="rates">Rates</label>
            <input
              id="rates"
              className={styles.formInput}
              type="text"
              value={formData.rates}
              onChange={handleChange}
              name="rates"
              pattern="^[0-9]+$"
              required
              title="Please enter a numeric rate"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="dpartner">Delivery Partner</label>
            <input
              id="dpartner"
              className={styles.formInput}
              type="text"
              value={formData.dpartner}
              onChange={handleChange}
              name="dpartner"
              required
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className={styles.formButton}>
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
      <p className={styles.statusMessage}>{status}</p>
      {!loading && status === "Success: Data submitted successfully." && (
        <div className={styles.buttonGroup}>
          <button
            onClick={() => router.push("/bkc/delivery-dashboard")}
            className={styles.dashboardButton}
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => {
              setFormData({
                srNo: "",
                date: "",
                toName: "",
                branch: "",
                podNo: "",
                senderName: "",
                department: "",
                particular: "",
                noOfEnvelopes: "",
                weight: "",
                rates: "",
                dpartner: "",
                deliveryDate: "",
                clientEmail: "",
                clientPhoneNumber: "",
              });
              setStatus("");
            }}
            className={styles.addMoreButton}
          >
            Add More Waybills
          </button>
        </div>
      )}
    </div>
  );
}

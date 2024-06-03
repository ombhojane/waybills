import { FormEvent, useState } from "react";
import styles from "../src/app/page.module.css";
import React from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    serialNumber: '',
    name: '',
    city: '',
    waybillNo: '',
    sender: '',
    department: '',
    noOfDocuments: '',
    weight: '',
    courierCompany: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/submitForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Data sent');
    } else {
      console.error('Error sending data');
    }
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.formHeader}>Waybill Form</h4>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Serial No.
          <input type="number" value={formData.serialNumber} onChange={handleChange} name="serialNumber" pattern="\d*" required />
        </label>
        <label>
          Name
          <input type="text" value={formData.name} onChange={handleChange} name="name" pattern="[A-Za-z\s]*" required />
        </label>
        <label>
          City
          <input type="text" value={formData.city} onChange={handleChange} name="city" pattern="[A-Za-z\s]*" required />
        </label>
        <label>
  Waybill no
  <input type="text" value={formData.waybillNo} onChange={handleChange} name="waybillNo" pattern="[A-Za-z0-9]*" required />
</label>
<label>
  Sender
  <input type="text" value={formData.sender} onChange={handleChange} name="sender" pattern="[A-Za-z\s]*" required />
</label>
<label>
  Department
  <input type="text" value={formData.department} onChange={handleChange} name="department" pattern="[A-Za-z\s]*" required />
</label>
<label>
  No of documents
  <input type="text" value={formData.noOfDocuments} onChange={handleChange} name="noOfDocuments" pattern="\d*" required />
</label>
<label>
  Weight
  <input type="number" value={formData.weight} onChange={handleChange} name="weight" pattern="\d*\.?\d*" required />
</label>
<label>
  Courier company
  <input type="text" value={formData.courierCompany} onChange={handleChange} name="courierCompany" pattern="[A-Za-z\s]*" required />
</label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
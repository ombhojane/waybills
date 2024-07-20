import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import styles from '../reports.module.css';
import { FaSearch, FaFilter, FaSpinner } from 'react-icons/fa';

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

const Reports: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    status: 'all',
    branch: '',
    dpartner: '',
    senderName: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [data, filter, searchTerm]);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/mumdata');
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = data;

    if (filter.startDate && filter.endDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.date) >= new Date(filter.startDate) &&
          new Date(item.date) <= new Date(filter.endDate)
      );
    }

    if (filter.status !== 'all') {
      filtered = filtered.filter((item) => item.deliveryStatus === filter.status);
    }

    if (filter.branch) {
      filtered = filtered.filter((item) => item.branch.toLowerCase().includes(filter.branch.toLowerCase()));
    }

    if (filter.dpartner) {
      filtered = filtered.filter((item) => item.dpartner.toLowerCase().includes(filter.dpartner.toLowerCase()));
    }

    if (filter.senderName) {
      filtered = filtered.filter((item) => item.senderName.toLowerCase().includes(filter.senderName.toLowerCase()));
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.toName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.podNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.particular.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const calculateSummary = () => {
    const summary = {
      totalShipments: filteredData.length,
      totalEnvelopes: filteredData.reduce((sum, item) => sum + parseInt(item.noOfEnvelopes), 0),
      totalWeight: filteredData.reduce((sum, item) => sum + parseFloat(item.weight), 0),
      totalRates: filteredData.reduce((sum, item) => sum + parseFloat(item.rates), 0),
    };
    return summary;
  };

  const calculateMonthlyBilling = () => {
    const monthlyBilling: { [key: string]: number } = {};

    filteredData.forEach((item) => {
      const month = format(new Date(item.date), 'MMMM yyyy');
      monthlyBilling[month] = (monthlyBilling[month] || 0) + parseFloat(item.rates);
    });

    return monthlyBilling;
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delivery Reports</h1>

      <div className={styles.filterSection}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        <br></br>
        <button className={styles.filterButton} onClick={() => document.getElementById('filterModal')?.showModal()}>
          <FaFilter /> Filters
        </button>
      </div>

      <dialog id="filterModal" className={styles.filterModal}>
        <h2 className={styles.modalTitle}>Filter Options</h2>
        <div className={styles.filterGrid}>
          <input
            type="date"
            name="startDate"
            value={filter.startDate}
            onChange={handleFilterChange}
            className={styles.input}
            placeholder="Start Date"
          />
          <input
            type="date"
            name="endDate"
            value={filter.endDate}
            onChange={handleFilterChange}
            className={styles.input}
            placeholder="End Date"
          />
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className={styles.input}
          >
            <option value="all">All Statuses</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
          <input
            type="text"
            name="branch"
            value={filter.branch}
            onChange={handleFilterChange}
            className={styles.input}
            placeholder="Branch"
          />
          <input
            type="text"
            name="dpartner"
            value={filter.dpartner}
            onChange={handleFilterChange}
            className={styles.input}
            placeholder="Delivery Partner"
          />
          <input
            type="text"
            name="senderName"
            value={filter.senderName}
            onChange={handleFilterChange}
            className={styles.input}
            placeholder="Sender Name"
          />
        </div>
        <div className={styles.modalActions}>
          <button onClick={() => document.getElementById('filterModal')?.close()} className={styles.closeButton}>
            Close
          </button>
        </div>
      </dialog>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Summary</h2>
          <div className={styles.summaryGrid}>
            {Object.entries(calculateSummary()).map(([key, value]) => (
              <div key={key} className={styles.summaryItem}>
                <span className={styles.summaryLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className={styles.summaryValue}>{value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Monthly Billing</h2>
          <ul className={styles.billingList}>
            {Object.entries(calculateMonthlyBilling()).map(([month, total]) => (
              <li key={month} className={styles.billingItem}>
                <span className={styles.billingMonth}>{month}</span>
                <span className={styles.billingAmount}>₹{total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Delivery List</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Date</th>
                <th>To</th>
                <th>Branch</th>
                <th>POD No.</th>
                <th>Sender</th>
                <th>Department</th>
                <th>Particular</th>
                <th>Envelopes</th>
                <th>Weight</th>
                <th>Rates</th>
                <th>Partner</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item._id}>
                  <td>{item.srNo}</td>
                  <td>{format(new Date(item.date), 'dd/MM/yyyy')}</td>
                  <td>{item.toName}</td>
                  <td>{item.branch}</td>
                  <td>{item.podNo}</td>
                  <td>{item.senderName}</td>
                  <td>{item.department}</td>
                  <td>{item.particular}</td>
                  <td>{item.noOfEnvelopes}</td>
                  <td>{item.weight}</td>
                  <td>₹{item.rates}</td>
                  <td>{item.dpartner}</td>
                  <td>{item.deliveryDate ? format(new Date(item.deliveryDate), 'dd/MM/yyyy') : ''}</td>
                  <td>{item.deliveryStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {pageCount}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
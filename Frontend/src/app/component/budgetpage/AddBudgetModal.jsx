import React, { useState } from 'react';
import styles from '../../../styles/ExpenseModal.module.css';
import axios from '../../../api/axios';
import { useSelector } from '../../../api/hook';

const AddBudgetModal = ({ isOpen, onClose, onAddBudget }) => {
  const [name, setName] = useState('');
  const [amountSpent, setAmountSpent] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.user.id);
  const [loading, setLoading] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBudget = {
      name,
      total_amount: totalAmount,
      amount_spent: amountSpent,
      start_date: startDate,
      end_date: endDate,
    };
    setLoading(true);

    try {
      const response = await axios.post(`/budgets/${userId}/`, newBudget
        , {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
      // Add the newly created budget to the list
      onAddBudget(response.data);
      setLoading(false)
      onClose();

    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Add New Budget</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Budget Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter budget name"
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Total Amount</label>
              <input
                type="number"
                id="totalAmount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Enter total amount"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="amountSpent">Amount Spent</label>
              <input
                type="number"
                id="amountSpent"
                value={amountSpent}
                onChange={(e) => setAmountSpent(e.target.value)}
                placeholder="Enter amount spent"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          <button type="submit" className={styles.addButton} disabled={loading}>
          {loading ? 'Loading...' : 'Add Budget'}

          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;

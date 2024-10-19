import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios'; // Adjust the import based on your axios setup
import styles from '../../../styles/ExpenseModal.module.css';
import { useSelector } from '../../../api/hook';

const EditTableModal = ({ isOpen, onClose, transaction, onUpdate }) => {
    const [amount, setAmount] = useState('');
    const [transaction_date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category_type, setCategoryType] = useState('Income'); // Default type
    const [category, setCategory] = useState('');
  
    const accessToken = useSelector((state) => state.auth.accessToken);
  
    useEffect(() => {
      if (transaction) {
        setAmount(transaction.amount);
        setDate(transaction.transaction_date);
        setDescription(transaction.description);
        setCategory(transaction.category);
        setCategoryType(transaction.category_type);
      }
    }, [transaction]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const updatedTransaction = { 
        amount, 
        transaction_date, 
        description, 
        category, 
        category_type 
      };
      
      try {
        const response = await axios.put(`/transactions/${transaction.id}/`, updatedTransaction, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        onUpdate(response.data); // Update the transaction in the parent component
      } catch (error) {
        console.error('Error updating transaction:', error);
      }
    };
  
    // if (!isOpen) return null;
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Edit Transaction</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className={styles.input}
              />
            </div>
  
            <div className={styles.row}>
              <div className={`${styles.formGroup} ${styles.rowChild}`}>
                <label className={styles.label} htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={transaction_date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={`${styles.formGroup} ${styles.rowChild}`}>
                <label className={styles.label} htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description"
                  className={styles.input}
                />
              </div>
            </div>
  
            <div className={styles.formGroup}>
              <label className={styles.label}>Category Type</label>
              <select
                value={category_type}
                onChange={(e) => setCategoryType(e.target.value)}
                className={styles.input}
              >
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
            </div>
  
            <div className={styles.formGroup}>
              <label className={styles.label}>Category Name</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.input}
              />
            </div>
  
            <button type="submit" className={styles.addButton}>Update</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditTableModal;
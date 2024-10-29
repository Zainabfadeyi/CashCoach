import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'; // Adjust the import based on your axios setup
import styles from '../../styles/ExpenseModal.module.css';
import { useSelector } from '../../api/hook';

const ExpenseModal = ({ isOpen, onClose, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [transaction_date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category_type, setcategory_type] = useState('Income'); // Default type
  const [categories, setCategories] = useState([]); // State for all categories
  const [filteredCategories, setFilteredCategories] = useState([]); // State for filtered categories
  const [category, setCategory] = useState(''); // Default selected category
  const [loading, setLoading] = useState(false); 

  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.user.id);

  // Fetch all categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`categories/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCategories(response.data);
      filterCategories(response.data); // Filter categories after fetching
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch categories when component mounts or accessToken changes
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [accessToken, isOpen]);

  // Filter categories based on category type (Income or Expense)
  const filterCategories = (allCategories) => {
    const filtered = allCategories.filter(category => {
      return category.category_type === category_type; // Assuming categories have a 'type' field
    });
    setFilteredCategories(filtered);
    if (filtered.length > 0) {
      setCategory(filtered[0].name); // Automatically set the first category
    } else {
      setCategory(''); // Clear category if no matching categories
    }
  };

  // Update filtered categories when category_type changes
  useEffect(() => {
    filterCategories(categories); // Re-filter when category type changes
  }, [category_type, categories]);

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const transactionType = category_type === 'Income' ? 'Income' : 'Expenses';
    const transactionData = { 
      amount, 
      transaction_date, 
      description, 
      category, 
      category_type: transactionType 
    };

    try {
      const response = await axios.post(`transactions/?user_id=${userId}/`, transactionData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      onAdd(response.data); // Call onAdd with the response data if necessary
      resetFields();
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset all fields to their default state
  const resetFields = () => {
    setAmount('');
    setDate('');
    setDescription('');
    setcategory_type('Income'); // Reset to default
    setCategory(''); // Clear category
  };

  // Call resetFields on modal close
  const handleClose = () => {
    resetFields(); // Clear all fields
    onClose(); // Trigger onClose prop
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Add Transaction</h2>
        <button className={styles.closeButton} onClick={handleClose}>×</button>
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
            <div className={styles.amountButtons}>
              {[5000, 10000, 20000, 50000, 100000].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAmountChange(value)}
                  className={styles.amountButton}
                >
                  ₦{value.toLocaleString()}
                </button>
              ))}
            </div>
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
              onChange={(e) => {
                setcategory_type(e.target.value);
                setCategory(''); // Reset selected category when type changes
              }}
              className={styles.input}
            >
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category Name</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.input}
            >
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.addButton}>
            {loading ? 'Adding...' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;

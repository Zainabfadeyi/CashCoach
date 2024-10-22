import React, { useState } from 'react';
import styles from '../../../styles/category.module.css';

const AddCategory = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [categoryType, setCategoryType] = useState('Income'); // default type

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && categoryType) {
      onAddCategory({ name, category_type: categoryType });
      setName('');
      setCategoryType('Income'); // reset to default after submission
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Create a new category</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className={styles.input}
            />
          </div>
          <div className={styles.select}>
            <label className={styles.label} htmlFor="categoryType">Type</label>
            <select
              id="categoryType"
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
              className={styles.input}
            >
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
            </select>
          </div>

          <button type="submit" className={styles.addButton}>Create new category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;

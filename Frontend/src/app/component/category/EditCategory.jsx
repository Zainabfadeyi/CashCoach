import React, { useState } from 'react';
import styles from '../../../styles/category.module.css';

const EditCategory = ({ categoryData, onSubmit , onClose}) => {
  // State to manage form data
  const [name, setName] = useState(categoryData?.name || '');
  const [categoryType, setCategoryType] = useState(categoryData?.category_type || 'Income');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct form data and pass it to the parent component
    const updatedCategory = {
      name,
      category_type: categoryType,
    };
    onSubmit(updatedCategory);  // Assuming onSubmit handles category update in parent component
  };

  return (
    <div className={styles.modalEditOverlay}>
      <div className={styles.modalEditContent}>
      <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.modalTitle}>Edit Category</h2>
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
          <div className={styles.formGroup}>
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

          <button type="submit" className={styles.addButton}>Save Category</button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;

// import React, { useState } from 'react';
// import styles from '../../../styles/category.module.css'

// const AddCategory= () => {
//   const [name, setName] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [categoryType, setCategoryType] = useState('income');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//   };


//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <h2 className={styles.modalTitle}>Add New Budget</h2>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <label className={styles.label} htmlFor="name">Budget Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="category name"
//               className={styles.input}
//             />
//           </div>
//           <div className={styles.select}>
//             <label className={styles.label} htmlFor="categoryType">Category Type</label>
//             <select
//               id="categoryType"
//               value={categoryType}
//               onChange={(e) => setCategoryType(e.target.value)}
//               className={styles.input}
//             >
//               <option value="income">Income</option>
//               <option value="expenses">Expenses</option>
//             </select>
//           </div>
//           <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label className={styles.label} htmlFor="startDate">Start Date</label>
//             <input
//               type="date"
//               id="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className={styles.input}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label} htmlFor="endDate">End Date</label>
//             <input
//               type="date"
//               id="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className={styles.input}
//             />
//           </div>
//           </div>
//           <button type="submit" className={styles.addButton}>Create new category</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;

import React, { useState } from 'react';
import styles from '../../../styles/category.module.css';

const AddCategory = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [categoryType, setCategoryType] = useState('income');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name ) {
      onAddCategory({ name,type: categoryType });
      setName('');
      setCategoryType('income');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Create a new categories</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="category name"
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
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
            </select>
          </div>
          
          <button type="submit" className={styles.addButton}>Create new category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;

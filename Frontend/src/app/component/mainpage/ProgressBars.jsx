// import React, { useEffect, useState } from 'react';
// import { ProgressBar } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from '../../../styles/dashboard.module.css';
// import { TRANSACTIONS } from '../../mockData'; // Import the mock data directly

// const calculateCategoryTotals = () => {
//   const categoryTotals = {
//     Income: 0,
//     Groceries: 0,
//     Utilities: 0,
//     Entertainment: 0,
//     Travel: 0,
//     Miscellaneous: 0,
//   };

//   TRANSACTIONS.forEach(transaction => {
//     const category = transaction.category; // Adjust if needed based on the structure of your mock data
//     if (categoryTotals.hasOwnProperty(category)) {
//       categoryTotals[category] += Math.abs(transaction.amount);
//     }
//   });

//   return categoryTotals;
// };

// const ProgressBars = () => {
//   const [categoryTotals, setCategoryTotals] = useState({
//     Income: 0,
//     Groceries: 0,
//     Utilities: 0,
//     Entertainment: 0,
//     Travel: 0,
//     Miscellaneous: 0,
//   });

//   useEffect(() => {
//     const totals = calculateCategoryTotals(); // Use the mock data to calculate totals
//     setCategoryTotals(totals);
//   }, []);

//   const totalAmount = Object.values(categoryTotals).reduce((acc, val) => acc + val, 0);

//   const categoryColors = {
//     Income: 'success',
//     Groceries: 'info',
//     Utilities: 'warning',
//     Entertainment: 'danger',
//     Travel: 'primary',
//     Miscellaneous: 'secondary',
//   };

//   return (
//     <div className={styles.progress}>
//       <div style={{ fontSize: "19px", fontWeight: "800" }}>Category Status</div>
//       <ProgressBar style={{ height: '30px' }}>
//         {Object.keys(categoryTotals).map((category, index) => {
//           const percentage = totalAmount > 0 ? (categoryTotals[category] / totalAmount) * 100 : 0;
//           return (
//             <ProgressBar
//               key={index}
//               now={percentage}
//               variant={categoryColors[category]}
//               label={`${category} ${percentage.toFixed(2)}%`}
//               style={{ fontSize: '12px' }}
//             />
//           );
//         })}
//       </ProgressBar>
//     </div>
//   );
// };

// export default ProgressBars;
import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../../styles/dashboard.module.css';
import { TRANSACTIONS } from '../../mockData';

const calculateCategoryTotals = () => {
  const categoryTotals = {
    Income: 0,
    Groceries: 0,
    Utilities: 0,
    Entertainment: 0,
    Travel: 0,
    Miscellaneous: 0,
  };

  TRANSACTIONS.forEach(transaction => {
    const category = transaction.category;
    if (categoryTotals.hasOwnProperty(category)) {
      categoryTotals[category] += Math.abs(transaction.amount);
    }
  });

  return categoryTotals;
};

const ProgressBars = () => {
  const [categoryTotals, setCategoryTotals] = useState({
    Income: 0,
    Groceries: 0,
    Utilities: 0,
    Entertainment: 0,
    Travel: 0,
    Miscellaneous: 0,
  });

  useEffect(() => {
    const totals = calculateCategoryTotals();
    setCategoryTotals(totals);
  }, []);

  const totalAmount = Object.values(categoryTotals).reduce((acc, val) => acc + val, 0);

  const categoryColors = {
    Income: '#28a745',
    Groceries: '#17a2b8',
    Utilities: '#ffc107',
    Entertainment: '#dc3545',
    Travel: '#007bff',
    Miscellaneous: '#6c757d',
  };

  return (
    <div className={styles.progressLine}>
      <div>
      <div style={{ fontSize: "20px", fontWeight: "700", color:"#1F2C73", paddingBottom:"20px"}}>Monthly Expenses Breakdown</div>
      <ProgressBar style={{ height: '15px', marginBottom:"20px" }}>
        {Object.keys(categoryTotals).map((category, index) => {
          const percentage = totalAmount > 0 ? (categoryTotals[category] / totalAmount) * 100 : 0;
          return (
            <ProgressBar
              key={index}
              now={percentage}
              style={{ backgroundColor: categoryColors[category] }}
              isChild
            />
          );
        })}
      </ProgressBar>
      </div>

         <div className={styles.categoryList} >
        {Object.keys(categoryTotals).map((category, index) => {
          const amount = categoryTotals[category];
          const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
          return (
            <div key={index} className={styles.OverallPrg} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' , color:"#7184AD"}}>
              <div
                style={{
                  display: 'inline-block',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: categoryColors[category],
                  marginRight: '10px',
                  border: "1px solid #c5c5c5",
                  padding: "7px"
                }}
              />
              <span style={{ fontWeight: 'bold', flexGrow: 1 }}>{category}</span>
              <span style={{ marginLeft: '10px',fontSize:"18px" }}>₦{amount.toFixed(2)}</span>
              <span style={{ marginLeft: '10px', fontWeight:"900",fontSize:"18px"  }}>{percentage.toFixed(2)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBars;

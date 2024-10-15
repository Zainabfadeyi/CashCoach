
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { faker } from '@faker-js/faker';
// import styles from '../../../styles/dashboard.module.css';

// // Generate some fake data for expenses
// const generateTransactions = () => [
//   { category: 'Groceries', amount: faker.datatype.number({ min: 100, max: 1000 }) },
//   { category: 'Utilities', amount: faker.datatype.number({ min: 100, max: 1000 }) },
//   { category: 'Entertainment', amount: faker.datatype.number({ min: 100, max: 1000 }) },
//   { category: 'Travel', amount: faker.datatype.number({ min: 100, max: 1000 }) },
//   { category: 'Miscellaneous', amount: faker.datatype.number({ min: 100, max: 1000 }) },
// ];

// // Calculate category totals and percentages
// const calculateCategoryTotals = (transactions) => {
//   const total = transactions.reduce((sum, t) => sum + t.amount, 0);
//   return transactions.map((transaction) => ({
//     ...transaction,
//     percentage: (transaction.amount / total) * 100,
//   }));
// };

// const CircularProgress = ({ incomePercentage, expensePercentage }) => {
//   // Ensure that income and expense percentages are summed up correctly
//   const totalPercentage = incomePercentage + expensePercentage;

//   return (
//     <div className={styles.circularProgress}>
//       <svg width="120" height="120">
//         <circle
//           cx="60"
//           cy="60"
//           r="50"
//           fill="none"
//           stroke="#e9ecef"
//           strokeWidth="10"
//         />
//         {/* Expense Arc - Right Side */}
//         <circle
//           cx="60"
//           cy="60"
//           r="50"
//           fill="none"
//           stroke="#dc3545"
//           strokeWidth="10"
//           strokeDasharray={`${expensePercentage} ${100 - expensePercentage}`}
//           strokeDashoffset="25"
//           strokeLinecap="round"
//           transform="rotate(90 60 60)"
//         />
//         {/* Income Arc - Left Side */}
//         <circle
//           cx="60"
//           cy="60"
//           r="50"
//           fill="none"
//           stroke="#28a745"
//           strokeWidth="10"
//           strokeDasharray={`${incomePercentage} ${100 - incomePercentage}`}
//           strokeDashoffset="75"
//           strokeLinecap="round"
//           transform="rotate(-90 60 60)"
//         />
//         <text x="60" y="65" textAnchor="middle" fontSize="12" fill="#000">
//           {incomePercentage.toFixed(0)}% / {expensePercentage.toFixed(0)}%
//         </text>
//       </svg>
//       <div className={styles.circularLabel}>Income vs Expense</div>
//     </div>
//   );
// };

// const ProgressBars = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [totalIncome, setTotalIncome] = useState(5000); // Example income value

//   useEffect(() => {
//     const fakeData = generateTransactions();
//     setTransactions(fakeData);
//   }, []);

//   const categorizedExpenses = calculateCategoryTotals(transactions);
//   const totalExpense = categorizedExpenses.reduce((sum, t) => sum + t.amount, 0);
//   const expensePercentage = (totalExpense / totalIncome) * 100;
//   const incomePercentage = 100 - expensePercentage;

//   return (
//     <div className={styles.progressWrapper}>
//       <h3>Income and Expense Breakdown</h3>
      
//       <div className="d-flex justify-content-center">
//         <CircularProgress
//           incomePercentage={incomePercentage}
//           expensePercentage={expensePercentage}
//         />
//       </div>
      
//       <div className={styles.categoryList}>
//         {categorizedExpenses.map((expense, index) => (
//           <div key={index} className={styles.categoryItem}>
//             <div
//               style={{
//                 display: 'inline-block',
//                 width: '15px',
//                 height: '15px',
//                 borderRadius: '50%',
//                 backgroundColor: '#dc3545',
//                 marginRight: '10px',
//               }}
//             />
//             <span style={{ fontWeight: 'bold', flexGrow: 1 }}>{expense.category}</span>
//             <span style={{ marginLeft: '10px' }}>₦{expense.amount.toFixed(2)}</span>
//             <span style={{ marginLeft: '10px', fontWeight: '900' }}>{expense.percentage.toFixed(2)}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProgressBars;
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faker } from '@faker-js/faker';
import styles from '../../../styles/expenses.module.css';

// Generate some fake data for expenses
const generateTransactions = () => [
  { category: 'Groceries', amount: faker.datatype.number({ min: 100, max: 1000 }) },
  { category: 'Utilities', amount: faker.datatype.number({ min: 100, max: 1000 }) },
  { category: 'Entertainment', amount: faker.datatype.number({ min: 100, max: 1000 }) },
  { category: 'Travel', amount: faker.datatype.number({ min: 100, max: 1000 }) },
  { category: 'Miscellaneous', amount: faker.datatype.number({ min: 100, max: 1000 }) },
];

// Calculate category totals and percentages
const calculateCategoryTotals = (transactions) => {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  return transactions.map((transaction) => ({
    ...transaction,
    percentage: (transaction.amount / total) * 100,
  }));
};

const CircularProgress = ({ incomePercentage, expensePercentage }) => {
  return (
    <div className={styles.circularProgress}>
    <svg width="200" height="200">
  <circle
    cx="100"
    cy="100"
    r="80"
    fill="none"
    stroke="#e9ecef"
    strokeWidth="10"
  />
  {/* Expense Arc - Right Half (50% of the circle) */}
  <circle
    cx="100"
    cy="100"
    r="80"
    fill="none"
    stroke="#2F2CD8"
    strokeWidth="10"
    strokeDasharray="251 251" // 50% of the circumference
    strokeDashoffset="251" // Start from the right
    strokeLinecap="round"
    transform="rotate(90 100 100)"
  />
  {/* Income Arc - Left Half (50% of the circle) */}
  <circle
    cx="100"
    cy="100"
    r="80"
    fill="none"
    stroke="#F4F4FD"
    strokeWidth="10"
    strokeDasharray="251 251" // 50% of the circumference
    strokeDashoffset="-251" // Start from the left
    strokeLinecap="round"
    transform="rotate(-90 100 100)"
  />
  <text x="100" y="105" textAnchor="middle" fontSize="16" fill="#000">
    {incomePercentage.toFixed(0)}% / {expensePercentage.toFixed(0)}%
  </text>
</svg>

      <div className={styles.circularLabel}>Income vs Expense</div>
    </div>
  );
};

const ProgressBars = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(5000); // Example income value

  useEffect(() => {
    const fakeData = generateTransactions();
    setTransactions(fakeData);
  }, []);

  const categorizedExpenses = calculateCategoryTotals(transactions);
  const totalExpense = categorizedExpenses.reduce((sum, t) => sum + t.amount, 0);
  const expensePercentage = (totalExpense / totalIncome) * 100;
  const incomePercentage = 100 - expensePercentage;

  return (
    <div className={styles.progressWrapper}>
      <div>Income and Expense Breakdown</div>
      
      <div className="d-flex justify-content-center">
        <CircularProgress
          incomePercentage={incomePercentage}
          expensePercentage={expensePercentage}
        />
      </div>
      
      <div className={styles.categoryList}>
        {categorizedExpenses.map((expense, index) => (
          <div key={index} className={styles.categoryItem}>
            <div
              style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: '#2F2CD8',
                marginRight: '10px',
              }}
            />
            <div style={{display:"flex", width:"100%" }}>  
            <div style={{ fontWeight: 'bold', flexGrow: 1 }}>{expense.category}</div>
            <div style={{display:"flex"}}>
            <div style={{ marginLeft: '10px' }}>₦{expense.amount.toFixed(2)}</div>
            <div style={{ marginLeft: '10px', fontWeight: '900' }}>{expense.percentage.toFixed(2)}%</div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;


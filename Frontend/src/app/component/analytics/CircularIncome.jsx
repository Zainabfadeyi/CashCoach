import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faker } from '@faker-js/faker';
import styles from '../../../styles/expenses.module.css';

// Generate some fake data for income
const generateIncome = () => [
  { category: 'Salary', amount: faker.datatype.number({ min: 1000, max: 5000 }) },
  { category: 'Investments', amount: faker.datatype.number({ min: 500, max: 3000 }) },
  { category: 'Freelance', amount: faker.datatype.number({ min: 300, max: 2000 }) },
  { category: 'Gifts', amount: faker.datatype.number({ min: 100, max: 1500 }) },
  { category: 'Miscellaneous', amount: faker.datatype.number({ min: 100, max: 1000 }) },
];

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
      strokeWidth="20"
    />
    {/* Expense Arc - Right Half (50% of the circle) */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="#2F2CD8"
      strokeWidth="20"
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
      strokeWidth="20"
      strokeDasharray="251 251" // 50% of the circumference
      strokeDashoffset="-251" // Start from the left
      strokeLinecap="round"
      transform="rotate(-90 100 100)"
    />
    <text x="100" y="105" textAnchor="middle" fontSize="16" fill="#000">
      {incomePercentage.toFixed(0)}% / {expensePercentage.toFixed(0)}%
    </text>
  </svg>
  
      </div>
    );
  };
  const ProgressBars = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(5000); // Example income value
  
    useEffect(() => {
      const fakeData = generateIncome();
      setTransactions(fakeData);
    }, []);
  
    const categorizedExpenses = calculateCategoryTotals(transactions);
    const totalExpense = categorizedExpenses.reduce((sum, t) => sum + t.amount, 0);
    const expensePercentage = (totalExpense / totalIncome) * 100;
    const incomePercentage = 100 - expensePercentage;
  
    return (
      <div className={styles.progressWrapper}>
        <div style={{fontSize:"20px", color:"#1f2c73"}}>Income Breakdown</div>
        
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
                  backgroundColor: '#F4F4FD',
                  marginRight: '10px',
                  fontWeight:"900"
                }}
              />
              <div style={{display:"flex", width:"100%" , marginBottom:"20px", borderBottom:" 1px solid #e5eaef"}}>  
              <div style={{ fontWeight: 'bold', flexGrow: 1 }}>{expense.category}</div>
              <div style={{display:"flex", marginBottom:"10px"}}>
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
  
  
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { faker } from '@faker-js/faker';
// import styles from '../../../styles/expenses.module.css';

// // Generate some fake data for income
// const generateIncome = () => [
//   { category: 'Salary', amount: faker.datatype.number({ min: 1000, max: 5000 }) },
//   { category: 'Investments', amount: faker.datatype.number({ min: 500, max: 3000 }) },
//   { category: 'Freelance', amount: faker.datatype.number({ min: 300, max: 2000 }) },
//   { category: 'Gifts', amount: faker.datatype.number({ min: 100, max: 1500 }) },
//   { category: 'Miscellaneous', amount: faker.datatype.number({ min: 100, max: 1000 }) },
// ];

// const calculateCategoryTotals = (transactions) => {
//   const total = transactions.reduce((sum, t) => sum + t.amount, 0);
//   return transactions.map((transaction) => ({
//     ...transaction,
//     percentage: (transaction.amount / total) * 100,
//   }));
// };

// const CircularProgress = ({ incomePercentage, expensePercentage }) => {
//      // Total circumference for a full circle (r = 80)
//   const circumference = 2 * Math.PI * 80;
  
//   // Calculate offset for income and expense, allowing for over 100% values
//   const expenseOffset = circumference * (1 - expensePercentage / 100);
//   const incomeOffset = -circumference * (incomePercentage / 100);
//   return (
//     <div className={styles.circularProgress}>
//     <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', maxWidth: '200px' }}>
//       <circle
//         cx="100"
//         cy="100"
//         r="80"
//         fill="none"
//         stroke="#e9ecef"
//         strokeWidth="10"
//       />
//       {/* Expense Arc */}
//       <circle
//         cx="100"
//         cy="100"
//         r="80"
//         fill="none"
//         stroke="#2F2CD8"
//         strokeWidth="10"
//         strokeDasharray={circumference}
//         strokeDashoffset={Math.max(expenseOffset, 0)} // Adjust offset for over 100%
//         strokeLinecap="round"
//         transform="rotate(90 100 100)"
//       />
//       {/* Income Arc */}
//       <circle
//         cx="100"
//         cy="100"
//         r="80"
//         fill="none"
//         stroke="#F4F4FD"
//         strokeWidth="10"
//         strokeDasharray={circumference}
//         strokeDashoffset={Math.min(incomeOffset, -circumference)} // Adjust offset for over 100%
//         strokeLinecap="round"
//         transform="rotate(-90 100 100)"
//       />
//       <text x="100" y="105" textAnchor="middle" fontSize="16" fill="#000">
//         {incomePercentage.toFixed(0)}% / {expensePercentage.toFixed(0)}%
//       </text>
//     </svg>
//   </div>
//   );
// };

// const ProgressBars = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [totalIncome, setTotalIncome] = useState(5000);

//   useEffect(() => {
//     const fakeData = generateIncome();
//     setTransactions(fakeData);
//   }, []);

//   const categorizedExpenses = calculateCategoryTotals(transactions);
//   const totalExpense = categorizedExpenses.reduce((sum, t) => sum + t.amount, 0);
//   const expensePercentage = (totalExpense / totalIncome) * 100;
//   const incomePercentage = 100 - expensePercentage;

//   return (
//     <div className={styles.progressWrapper}>
//       <div style={{ fontSize: '20px', color: '#1f2c73' }}>Income Breakdown</div>
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
//                 backgroundColor: '#F4F4FD',
//                 marginRight: '10px',
//               }}
//             />
//             <div style={{ display: 'flex', width: '100%', marginBottom: '20px', borderBottom: '1px solid #e5eaef' }}>
//               <div style={{ fontWeight: 'bold', flexGrow: 1 }}>{expense.category}</div>
//               <div style={{ display: 'flex', marginBottom: '10px' }}>
//                 <div style={{ marginLeft: '10px' }}>₦{expense.amount.toFixed(2)}</div>
//                 <div style={{ marginLeft: '10px', fontWeight: '900' }}>{expense.percentage.toFixed(2)}%</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProgressBars;



import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useFetchTransactions } from '../../../api/apiFolder/tableApi'; // Import the fetch function
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from '../../../styles/dashboard.module.css';

const calculateCategoryTotals = (transactions) => {
  const categoryTotals = {
    Income: 0,
    Groceries: 0,
    Utilities: 0,
    Entertainment: 0,
    Travel: 0,
    Miscellaneous: 0,
  };

  transactions.forEach(transaction => {
    const category = transaction.category; // Adjust this key based on your API response
    if (categoryTotals.hasOwnProperty(category)) {
      categoryTotals[category] += Math.abs(transaction.amount);
    }
  });

  return categoryTotals;
};

const Progress = () => {
  const { fetchTransactions } = useFetchTransactions(); // Fetch transactions from API
  const [categoryTotals, setCategoryTotals] = useState({
    Income: 0,
    Groceries: 0,
    Utilities: 0,
    Entertainment: 0,
    Travel: 0,
    Miscellaneous: 0,
  });


    const fetchData = async () => {
      try {
        const transactions = await fetchTransactions(); // Fetch transactions from the API
        const totals = calculateCategoryTotals(transactions); // Calculate category totals
        setCategoryTotals(totals); // Set the calculated totals to state
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
      useEffect(() => {
    fetchData();
  }, []); 

  const totalAmount = Object.values(categoryTotals).reduce((acc, val) => acc + val, 0); 

  return (
    <div className={styles.progress}>
      <div style={{ fontSize: "20px", fontWeight: "700" ,color:"#1F2C73"}}>Monthly Budgets</div>
      {Object.keys(categoryTotals).map((category, index) => {
        const percentage = totalAmount > 0 ? (categoryTotals[category] / totalAmount) * 100 : 0; 
        return (
          <div key={index} style={{ margin: '20px 0' }} className={styles.wrapper}>
            <div className={styles.category}> 
              <div>{category}</div>
              {`${percentage.toFixed(2)}%`}
            </div>
            <div className={styles.bar}>
              <ProgressBar
                now={percentage}
                style={{ height: '12px' }}
                className={styles.progressBar}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;
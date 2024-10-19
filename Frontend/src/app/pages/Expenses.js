import React, { useState, useEffect } from 'react';
import styles from '../../styles/expenses.module.css';
import CircleProgress from '../component/analytics/CircleProgress';
import ExpensesTable from '../component/tables/ExpensesTable';
import LoadingSpinner from '../component/LoadingSpinner'; // Import your loading spinner

const Expenses = () => {
  const [loading, setLoading] = useState(true);

  // Simulating data fetching or API call
  useEffect(() => {
    // Simulate loading delay, you can replace this with actual API call
    const fetchData = async () => {
      setLoading(true);
      // Simulate a delay (replace with actual API call logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.Expenses}>
      {loading ? (
        <LoadingSpinner message="Loading expenses data..." />
      ) : (

        <>
          <div style={{ width: "30%" }}>
            <CircleProgress />
          </div>
          <div style={{ width: "70%" }}>
            <ExpensesTable />
          </div>
        </>
      )}
    </div>
  );
};

export default Expenses;

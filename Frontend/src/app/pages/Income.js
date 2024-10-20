import React, { useState, useEffect } from 'react';
import styles from '../../styles/expenses.module.css';
import CircularIncome from '../component/analytics/CircularIncome';
import LoadingSpinner from '../component/LoadingSpinner'; // Import your loading spinner
import TanStackTable from '../component/tables/TanStackTable';

const Expenses = () => {
  const [loading, setLoading] = useState(true);

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
        <LoadingSpinner message="Loading income data..." />
      ) : (

        <>
          <div style={{ width: "30%" }}>
            <CircularIncome />
          </div>
          <div style={{ width: "70%" }}>
            <TanStackTable/>
          </div>
        </>
      )}
    </div>
  );
};

export default Expenses;

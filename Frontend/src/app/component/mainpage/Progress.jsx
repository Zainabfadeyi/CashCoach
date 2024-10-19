import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import axios from '../../../api/axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../../styles/dashboard.module.css';
import { useSelector } from '../../../api/hook'; 

const Progress = () => {
  const [budgetData, setBudgetData] = useState([]); 
  const accessToken = useSelector((state) => state.auth.accessToken); 
  // Function to fetch budget summary from API
  const fetchBudgetSummary = async () => {
    try {
      const response = await axios.get('/dashboard/budget-summary',
        {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBudgetData(response.data);
    } catch (error) {
      console.error('Error fetching budget summary:', error);
    }
  };

  useEffect(() => {
    fetchBudgetSummary();
  }, []);

  return (
    <div className={styles.progress}>
      <div style={{ fontSize: '20px', fontWeight: '700', color: '#1F2C73' }}>Monthly Budgets</div>
      
      {budgetData.map((budget, index) => {
        const percentage = budget.percentage_spent; 
        return (
          <div key={index} style={{ margin: '20px 0' }} className={styles.wrapper}>
            <div className={styles.category}>
              <div>{budget.name}</div> 
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

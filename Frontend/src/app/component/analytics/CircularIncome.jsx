
  import React, { useEffect, useState } from 'react';
  import axios from '../../../api/axios';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import styles from '../../../styles/expenses.module.css';
import { useSelector } from '../../../api/hook';
import LoadingSpinner from '../LoadingSpinner';
  
  const CircularIncome = ({ incomePercentage, expensePercentage }) => {
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
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#2F2CD8"
          strokeWidth="20"
          strokeDasharray="251 251"
          strokeDashoffset={(251 * (100 - incomePercentage)) / 100}
          strokeLinecap="round"
          transform="rotate(90 100 100)"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#F4F4FD"
          strokeWidth="20"
          strokeDasharray="251 251"
          strokeDashoffset={(251 * (100 - expensePercentage)) / 100}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />
        <text x="100" y="105" textAnchor="middle" fontSize="16" fill="#000">
          {incomePercentage.toFixed(2)}% / {expensePercentage.toFixed(2)}%
        </text>
        </svg>
      </div>
    );
  };
  
  const ProgressBars = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user.user.id);
    const [incomePercentage, setIncomePercentage] = useState(0);
    const [expensePercentage, setExpensePercentage] = useState(0);
    // Fetch data from the API
    // Fetch progress data (income/expenses percentages)
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`income-expense-Progress/${userId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;

        // Strip the '%' and convert to numbers
        const income = parseFloat(data.income_percentage.replace('%', ''));
        const expense = parseFloat(data.expenses_percentage.replace('%', ''));

        setIncomePercentage(income);
        setExpensePercentage(expense);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching progress data:', error);
        setIsLoading(false);
      }
    };

    fetchProgressData();
  }, [accessToken]);


    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`income-overview/${userId}/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
      
            });
        
          const data = response.data;
          setTransactions(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching transactions:', error);
          setIsLoading(false);
        }
      };
  
      fetchTransactions();
    }, []);
  
    if (isLoading) {
      return <div><LoadingSpinner  size={50} message="Processing..."/></div>;
    }
  
  
  
    return (
      <div className={styles.progressWrapper}>
        <div style={{ fontSize: '20px', color: '#1f2c73' }}>Income Breakdown</div>
  
        <div className="d-flex justify-content-center">
          <CircularIncome
            incomePercentage={incomePercentage}
            expensePercentage={expensePercentage}
          />
        </div>
  
        <div className={styles.categoryList}>
          {transactions.map((transaction, index) => (
            <div key={index} className={styles.categoryItem}>
              <div
                style={{
                  display: 'inline-block',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: '#F4F4FD',
                  marginRight: '10px',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  marginBottom: '20px',
                  borderBottom: '1px solid ##e5eaef',
                }}
              >
                <div style={{ fontWeight: 'bold', flexGrow: 1 }}>{transaction.category}</div>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <div style={{ marginLeft: '10px' }}>₦{parseFloat(transaction.amount).toFixed(2)}</div>
                  <div style={{ marginLeft: '10px', fontWeight: '900' }}>{parseFloat(transaction.percentage).toFixed(2)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProgressBars;
  
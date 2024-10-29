import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import axios from '../../../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../../styles/dashboard.module.css';
import { useSelector } from '../../../api/hook';

const ProgressBars = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const userId = useSelector((state) => state.auth.user.user.id);
  const colorPalette = ['#28a745', '#17a2b8', '#ffc107', '#dc3545', '#007bff', '#6c757d', '#343a40', '#8e44ad', '#e74c3c', '#f39c12'];

  const fetchData = async () => {
    try {
      // Fetch data from the API
      const response = await axios.get(`/dashboard/monthly-expense-breakdown/${userId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Limit the response to the first 6 items
      const data = response.data.slice(0, 6);
  
      // Calculate the total amount from the data
      const total = data.reduce((acc, item) => acc + item.amount, 0);
  
      // Update the state with the data and total amount
      setCategoryData(data);
      setTotalAmount(total);
  
    } catch (error) {
      // Log any errors encountered during the fetch
      console.error('Error fetching monthly expense breakdown:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <div className={styles.progressLine}>
      <div>
        <div style={{ fontSize: "20px", fontWeight: "700", color: "#1F2C73", paddingBottom: "20px" }}>
          Monthly Expenses Breakdown
        </div>
        <ProgressBar style={{ height: '15px', marginBottom: "20px" }}>
          {categoryData.map((item, index) => (
            <ProgressBar
              key={index}
              now={item.percentage}
              style={{ backgroundColor: colorPalette[index % colorPalette.length] }}
              isChild
            />
          ))}
        </ProgressBar>
      </div>

      <div className={styles.categoryList}>
        {categoryData.map((item, index) => (
          <div key={index} className={styles.OverallPrg} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: "#7184AD" }}>
            <div
              style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: colorPalette[index % colorPalette.length],
                marginRight: '10px',
                border: "1px solid #c5c5c5",
                padding: "7px"
              }}
            />
            <span style={{ fontWeight: 'bold', flexGrow: 1 }}>{item.name}</span>
            <span style={{ marginLeft: '10px', fontSize: "18px" }}>₦{item.amount.toFixed(2)}</span>
            <span style={{ marginLeft: '10px', fontWeight: "900", fontSize: "18px" }}>{item.percentage.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;

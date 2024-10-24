import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import axios from '../../../api/axios'; // Use axios for fetching data
import styles from '../../../styles/dashboard.module.css';
import { useSelector } from '../../../api/hook';

const formatDataForNivoLineChart = (data) => [
  {
    id: 'Transaction Amounts',
    color: '#1f78b4',
    data: data.map(transaction => ({
      x: transaction.day,  // Use week_start as x-axis
      y: transaction.amount_spent, // Use amount_spent as y-axis
    })),
  },
];

const BudgetLineChart =  ({ budgetId })  => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  // Fetch the API data
  useEffect(() => {
    const fetchTransactions = async () => {
      console.log('Fetching transactions for budgetId:', budgetId);
      try {
        const response = await axios.get(`sidebar/budgets/${budgetId}/spending-chart/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      
        setTransactions(response.data); // Save the fetched data
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (budgetId) {
      fetchTransactions(); // Fetch data only if budgetId is available
    }
  }, [budgetId, accessToken]);

  // Format the data for Nivo chart
  const data = formatDataForNivoLineChart(transactions);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className={styles.LineChart}>
      <div>
        <div style={{ fontSize: '20px', fontWeight: '600', color: '#1F2C73' }}>Budget Period</div>
      </div>
      <div style={{ height: '400px', width: '100%' }}>
        <ResponsiveLine
          data={data}
          colors={['#6362E7']}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          padding={0}
          lineWidth={4}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          yFormat=" >-.2f"
          enableArea={true}
          areaBaselineValue={0}
          axisTop={null}
          axisRight={null}
          tooltip={({ point }) => (
            <div
              style={{
                background: 'white',
                padding: '5px',
                border: '1px solid #ccc',
                fontSize: '10px',
              }}
            >
              <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted}
            </div>
          )}
          gridXValues="every 1 day"
          gridYValues={[]}
        />
      </div>
    </div>
  );
};
export default BudgetLineChart
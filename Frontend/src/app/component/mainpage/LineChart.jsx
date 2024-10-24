import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import axios from '../../../api/axios'; // Assuming axios is configured for your API base URL
import styles from '../../../styles/dashboard.module.css';
import { useSelector } from '../../../api/hook'; // Assuming you are using this to get the access token

const LineChart = () => {
  const [dailyIncomeTrend, setDailyIncomeTrend] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0); // State for total income
  const accessToken = useSelector((state) => state.auth.accessToken); // Get access token

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('/dashboard/daily-income-trend/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Extract total income and daily income trend from response
        const { total_income, daily_income_trend } = response.data;

        // Set total income from the response
        setTotalIncome(total_income);

        // Format daily income trend for the chart
        const formattedData = daily_income_trend.map(item => ({
          date: item.date,
          totalAmount: item.total_income,
        }));
        
        setDailyIncomeTrend(formattedData); // Set formatted data in state
      } catch (error) {
        console.error('Error fetching daily income trend:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  // Format data for Nivo Line chart
  const formatDataForNivoLineChart = (data) => [
    {
      id: 'Income Trend',
      color: '#1f78b4',
      data: data.map(item => ({
        x: item.date,
        y: item.totalAmount,
      })),
    },
  ];

  const data = formatDataForNivoLineChart(dailyIncomeTrend);

  return (
    <div className={styles.LineChart}>
      <div>
        <div style={{fontSize: "22px", fontWeight: "600", color:"#1F2C73"}}>Balance Trends</div>
        <div style={{fontSize: "30px", fontWeight: "700", color:"#1F2C73"}}>₦ {totalIncome.toLocaleString()}</div>
      </div>
      
      <div style={{ height: '400px', width: '100%' }}>
        <ResponsiveLine
          data={data}
          colors={["#6362E7"]}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
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
                fontSize: "10px",
              }}
            >
              <strong>{point.data.xFormatted}</strong>: ₦{point.data.yFormatted}
            </div>
          )}
          gridXValues="every 1 day"
          gridYValues={[]}
        />
      </div>
    </div>
  );
};

export default LineChart;

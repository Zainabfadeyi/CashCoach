// // LineChart.js
// import { ResponsiveLine } from '@nivo/line';
// import { TRANSACTIONS } from '../../mockData';

// const formatDate = (date) => {
//   const options = { day: 'numeric', month: 'short', year: 'numeric' };
//   return new Intl.DateTimeFormat('en-US', options).format(date);
// };

// const getLast12DaysTransactions = () => {
//   const today = new Date();
//   const past12Days = Array.from({ length: 12 }, (_, i) => {
//     const date = new Date(today);
//     date.setDate(today.getDate() - i);
//     const dateString = formatDate(date);

//     return {
//       date: dateString,
//       totalAmount: TRANSACTIONS
//         .filter(transaction => transaction.transactionDate === dateString)
//         .reduce((acc, transaction) => acc + transaction.amount, 0),
//     };
//   }).reverse();
//   return past12Days;
// };

// const formatDataForNivoLineChart = (transactions) => [
//   {
//     id: 'Transaction Amounts',
//     color: '#1f78b4', // Set to a blue color
//     data: transactions.map(transaction => ({
//       x: transaction.date,
//       y: Math.max(transaction.totalAmount, 0),
//     })),
//   },
// ];

// const LineChart = () => {
//   const transactions = getLast12DaysTransactions();
//   const data = formatDataForNivoLineChart(transactions);

//   console.log(data); // For debugging

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//       <ResponsiveLine
//         data={data}
//         margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
//         colors={["#2379EA"]}
//         xScale={{ type: 'point' }}
//         yScale={{
//           type: 'linear',
//           min: 'auto',
//           max: 'auto',
//           stacked: false, // Set to false to avoid stacking for clearer visibility
//           reverse: false,
//         }}
       
//         yFormat=" >-.2f"
//         curve="catmullRom"  // Smoothens the line
//         enableArea={true}   // Enable the area fill below the line
//         areaBaselineValue={0} // Base of the area fill
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickValues: [],
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "",
//           legendOffset: 36,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           tickValues: [],
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "",
//           legendOffset: -40,
//           legendPosition: "middle",
//         }}
//         enableGridX={false}
//         enableGridY={false}
//         pointSize={8}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         tooltip={({ point }) => (
//           <div
//             style={{
//               background: 'white',
//               padding: '5px',
//               border: '1px solid #ccc',
//               fontSize:"10px"
//             }}
//           >
//             <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted}
//           </div>
//         )}
//         layers={[
//           'grid',
//           'markers',
//           'areas',
//           'lines',   // Focus on default 'lines' rendering
//           'slices',
//           'points',
//           'mesh',
//           'legends',
//         ]}
//       />
//     </div>
//   );
// };

// export default LineChart;
// LineChart.js
// import { ResponsiveLine } from '@nivo/line';
// import { TRANSACTIONS } from '../../mockData';
// import styles from '../../../styles/dashboard.module.css'

// const formatDate = (date) => {
//   const options = { day: 'numeric', month: 'short' };
//   return new Intl.DateTimeFormat('en-US', options).format(date);
// };

// const getLast12DaysTransactions = () => {
//   const today = new Date();
//   const past12Days = Array.from({ length: 12 }, (_, i) => {
//     const date = new Date(today);
//     date.setDate(today.getDate() - i);
//     const dateString = formatDate(date);

//     return {
//       date: dateString,
//       totalAmount: TRANSACTIONS
//         .filter(transaction => transaction.transactionDate === dateString)
//         .reduce((acc, transaction) => acc + transaction.amount, 0),
//     };
//   }).reverse();
//   return past12Days;
// };

// const formatDataForNivoLineChart = (transactions) => [
//   {
//     id: 'Transaction Amounts',
//     color: '#1f78b4', // Set to a blue color
//     data: transactions.map(transaction => ({
//       x: transaction.date,
//       y: Math.max(transaction.totalAmount, 0),
//     })),
//   },
// ];

// const LineChart = () => {
//   const transactions = getLast12DaysTransactions();
//   const data = formatDataForNivoLineChart(transactions);

//   console.log(data); // For debugging

//   return (
//     <div className={styles.LineChart}> 
//     <div>
//       <div style={{fontSize: "22px", fontWeight: "600", color:"#1F2C73",}}>Balance Trends</div>
//       <div style={{fontSize: "30px", fontWeight: "700", color:"#1F2C73",}}> ₦ 200,591</div>
//     </div>
  
//     <div style={{ height: '400px', width: '100%' }}>
//       <ResponsiveLine
//         data={data}
//         colors={["#6362E7"]}
//         margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
//         xScale={{ type: 'point' }}
//         yScale={{
//           type: 'linear',
//           min: 'auto',
//           max: 'auto',
//           stacked: false, // Set to false to avoid stacking for clearer visibility
//           reverse: false,
//         }}
//         padding={0}
//         lineWidth={4}
//         pointSize={10}
//         pointColor={{ theme: 'background' }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: 'serieColor' }}
//         pointLabel="y"
//         pointLabelYOffset={-12}
//         useMesh={true}
//         yFormat=" >-.2f"
//         enableArea={true}   // Enable the area fill below the line
//         areaBaselineValue={0} // Base of the area fill
//         axisTop={null}
//         axisRight={null}
        
//          tooltip={({ point }) => (
//           <div
//             style={{
//               background: 'white',
//               padding: '5px',
//               border: '1px solid #ccc',
//               fontSize:"10px"
//             }}
//           >
//             <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted}
//           </div>
//         )}
//         gridXValues="every 1 day"  
//         gridYValues={[]}   
        

//       />
//     </div>
//     </div>
//   );
// };

// export default LineChart;

import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import axios from '../../../api/axios';
import styles from '../../../styles/dashboard.module.css';
import { useSelector } from '../../../api/hook';

const LineChart = () => {
  const [transactions, setTransactions] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    // Fetch data from the API
    axios.get('/dashboard/daily-income-trend/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        // Format the data for Nivo
        const formattedData = response.data.map(item => ({
          date: item.date,
          totalAmount: item.total_income,
        }));
        setTransactions(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [accessToken]);

  const formatDataForNivoLineChart = (transactions) => [
    {
      id: 'Transaction Amounts',
      color: '#1f78b4',
      data: transactions.map(transaction => ({
        x: transaction.date,
        y: Math.max(transaction.totalAmount, 0),
      })),
    },
  ];

  const data = formatDataForNivoLineChart(transactions);

  return (
    <div className={styles.LineChart}>
      <div>
        <div style={{fontSize: "22px", fontWeight: "600", color:"#1F2C73"}}>Balance Trends</div>
        <div style={{fontSize: "30px", fontWeight: "700", color:"#1F2C73"}}>₦ 200,591</div>
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

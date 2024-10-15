import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useFetchTransactions } from '../../../api/apiFolder/tableApi';
import styles from "../../../styles/dashboard.module.css";


const groupDataByMonth = (transactions) => {
  const groupedData = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = monthDate.toLocaleString('default', { month: 'long' });
    const year = monthDate.getFullYear();


    groupedData.push({ month: `${monthName} `, income: 0, expenses: 0 });
  }

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    const month = transactionDate.toLocaleString('default', { month: 'long' });
    const year = transactionDate.getFullYear();
    const monthYear = `${month} `;

    const monthIndex = groupedData.findIndex((item) => item.month === monthYear);
    if (monthIndex !== -1) {

      if (transaction.transaction_type === "Income") {
        groupedData[monthIndex].income += Number(transaction.amount); // Convert to number
      } else if (transaction.transaction_type === "Expenses") {
        groupedData[monthIndex].expenses += Number(transaction.amount); // Convert to number
      }
    }
  });

  return groupedData;
};

const Bar = () => {
  const { fetchTransactions } = useFetchTransactions();
  const [barChartData, setBarChartData] = useState([]);

 
    const fetchData = async () => {
      try {
        const transactions = await fetchTransactions(); 
        const groupedData = groupDataByMonth(transactions); 
        setBarChartData(groupedData); 
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

     useEffect(() => {

    fetchData();
  }, []); 

  return (
    <div className={styles.barContainer}>
      <div style={{fontSize: "20px", fontWeight: "700" ,color:"#1F2C73"}}>Monthly Income vs Expenses</div>
      <div style={{ height: "380px", transformOrigin: "center" }}>
        <ResponsiveBar
          data={barChartData}
          keys={["income", "expenses"]}
          indexBy="month"
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          borderWidth={2}
          padding={0.4}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["#0703E9", "#D5D5F7"]} 
          borderRadius={0}
          axisTop={null}
          axisRight={null}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          role="application"
          barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in month: ${e.indexValue}`}
        />
      </div>
    </div>
  );
};

export default Bar;
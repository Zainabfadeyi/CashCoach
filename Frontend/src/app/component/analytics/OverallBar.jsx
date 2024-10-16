import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styles from "../../../styles/dashboard.module.css";
import { TRANSACTIONS } from '../../data'; // Importing fake data

// Function to group data by month and categorize as income and expenses
const groupDataByMonth = (transactions) => {
  const groupedData = [];
  const currentDate = new Date();
  
  // Get the last 12 months, including the current month
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = monthDate.toLocaleString('default', { month: 'short' });
    const year = monthDate.getFullYear();
    
    // Initialize income and expenses for each month
    groupedData.push({ month: `${monthName} ${year}`, income: 0, expenses: 0 });
  }

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    const month = transactionDate.toLocaleString('default', { month: 'short' });
    const year = transactionDate.getFullYear();
    const monthYear = `${month} ${year}`;
    
    // Find the corresponding month in the groupedData array
    const monthIndex = groupedData.findIndex((item) => item.month === monthYear);
    if (monthIndex !== -1) {
      if (transaction.transaction_type === "Income") {
        groupedData[monthIndex].income += Number(transaction.amount);
      } else if (transaction.transaction_type === "Expenses") {
        groupedData[monthIndex].expenses += Math.abs(Number(transaction.amount));
      }
    }
  });

  return groupedData.reverse(); 
};

const OverallBar = () => {
  const [OverallBarData, setOverallBarData] = useState([]);
  
  useEffect(() => {
    const groupedData = groupDataByMonth(TRANSACTIONS);
    setOverallBarData(groupedData); 
  }, []); 

  return (
    <div className={styles.barContainer}>
      <div style={{ height: "380px", transformOrigin: "center" }}>
        <ResponsiveBar
          data={OverallBarData}
          keys={["income", "expenses"]}
          indexBy="month"
          margin={{ top: 50, right: 100, bottom: 70, left: 90 }}
          borderWidth={2}
          padding={0.1}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["#2F2CD8", "#D5D5F7"]}
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

export default OverallBar;

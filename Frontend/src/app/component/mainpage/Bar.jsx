import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useFetchTransactions } from '../../../api/apiFolder/tableApi';
import styles from "../../../styles/dashboard.module.css";

const transformDataForBarChart = (data) => {
  return Object.entries(data).map(([monthYear, { income_data, expense_data }]) => ({
    month: monthYear,
    Income: income_data,
    Expenses: expense_data,
  }));
};

const Bar = () => {
  const { analyticsTransactions } = useFetchTransactions();
  const [barChartData, setBarChartData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await analyticsTransactions();
      const transformedData = transformDataForBarChart(data);
      setBarChartData(transformedData);
    } catch (error) {
      console.error('Error fetching monthly income and expense data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.barContainer}>
      <div style={{ fontSize: "20px", fontWeight: "700", color: "#1F2C73" }}>Monthly Income vs Expenses</div>
      <div style={{ height: "380px", transformOrigin: "center" }}>
        <ResponsiveBar
          data={barChartData}
          keys={["Income", "Expenses"]}
          indexBy="month"
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          borderWidth={2}
          padding={0.4}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["#0703E9", "#D5D5F7"]}
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

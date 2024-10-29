import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useFetchTransactions } from '../../../api/apiFolder/tableApi';
import styles from "../../../styles/dashboard.module.css";
import LoadingSpinner from '../LoadingSpinner';

const transformDataForBarChart = (data) => {
  return Object.entries(data).map(([monthYear, { income_data, expense_data }]) => ({
    month: monthYear,
    Income: income_data,
    Expenses: expense_data,
  }));
};

const OverallBar = () => {
  const { analyticsTransactions } = useFetchTransactions();
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await analyticsTransactions();
      const transformedData = transformDataForBarChart(data);
      setBarChartData(transformedData);
    } catch (error) {
      console.error('Error fetching monthly income and expense data:', error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className={styles.barContainer}>
        {loading ? (
        <LoadingSpinner message="Loading data..." />  
      ) : (
        <div style={{ height: "380px", transformOrigin: "center" }}>
          <ResponsiveBar
            data={barChartData}
            keys={["Income", "Expenses"]}
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
      )}
    </div>
  );
};

export default OverallBar;

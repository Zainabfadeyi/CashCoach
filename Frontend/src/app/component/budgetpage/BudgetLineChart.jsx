import { ResponsiveLine } from '@nivo/line';
import { TRANSACTIONS } from '../../mockData';
import styles from '../../../styles/dashboard.module.css'

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'short' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const getLast12DaysTransactions = () => {
  const today = new Date();
  const past12Days = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = formatDate(date);

    return {
      date: dateString,
      totalAmount: TRANSACTIONS
        .filter(transaction => transaction.transactionDate === dateString)
        .reduce((acc, transaction) => acc + transaction.amount, 0),
    };
  }).reverse();
  return past12Days;
};

const formatDataForNivoLineChart = (transactions) => [
  {
    id: 'Transaction Amounts',
    color: '#1f78b4', // Set to a blue color
    data: transactions.map(transaction => ({
      x: transaction.date,
      y: Math.max(transaction.totalAmount, 0),
    })),
  },
];

const BudgetLineChart = () => {
  const transactions = getLast12DaysTransactions();
  const data = formatDataForNivoLineChart(transactions);

  console.log(data); // For debugging

  return (
    <div className={styles.LineChart}> 
    <div>
      <div style={{fontSize: "22px", fontWeight: "600", color:"#1F2C73",}}>Budget Period</div>

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
          stacked: false, // Set to false to avoid stacking for clearer visibility
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
        enableArea={true}   // Enable the area fill below the line
        areaBaselineValue={0} // Base of the area fill
        axisTop={null}
        axisRight={null}
        
         tooltip={({ point }) => (
          <div
            style={{
              background: 'white',
              padding: '5px',
              border: '1px solid #ccc',
              fontSize:"10px"
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

export default BudgetLineChart;


import React from 'react'
import Transaction from './Transaction';
import Progress from '../component/mainpage/Progress';
import styles from '../../styles/expenses.module.css'
import TanStackTable from '../component/tables/TanStackTable';
import CircleProgress from '../component/analytics/CircleProgress';
import ExpensesTable from '../component/tables/ExpensesTable';

const Expenses = () => {
  return (
    <div className={styles.Expenses}>
      <div style={{width:"30%"}}>
        <CircleProgress/>
      </div>
      <div style={{width:"70%"}}> 
        <ExpensesTable/>
      </div>
    </div>
  )
}

export default Expenses;
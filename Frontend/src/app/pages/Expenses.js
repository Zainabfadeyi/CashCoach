import React from 'react'
import Transaction from './Transaction';
import Progress from '../component/mainpage/Progress';
import styles from '../../styles/expenses.module.css'
import TanStackTable from '../component/tables/TanStackTable';
import CircleProgress from '../component/analytics/CircleProgress';

const Expenses = () => {
  return (
    <div className={styles.Expenses}>
      <div style={{width:"100%"}}>
        <CircleProgress/>
      </div>
      <div style={{width:"100%"}}> 
        <TanStackTable/>
      </div>
    </div>
  )
}

export default Expenses;
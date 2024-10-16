import React from 'react'
import styles from '../../styles/expenses.module.css'
import CircularIncome from '../component/analytics/CircularIncome'
import TanStackTable from '../component/tables/TanStackTable'

const Income = () => {
  return (
    <div className={styles.Expenses}>
      <div style={{width:"30%"}}>
        <CircularIncome/>
      </div>
      <div style={{width:"70%"}}> 
        <TanStackTable/>
      </div>
    </div>
  )
}

export default Income
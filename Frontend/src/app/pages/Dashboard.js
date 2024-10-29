import React, { useEffect, useState } from 'react'
import Bar from '../component/mainpage/Bar'
import styles from '../../styles/dashboard.module.css'
import TanStackTable from '../component/mainpage/TanStackTable'
import Progress from '../component/mainpage/Progress'
import ExpenseModal from '../component/ExpenseModal'
import { useAddTransaction } from '../../api/apiFolder/addTransaction'
import { useSelector } from '../../api/hook'
import axios from '../../api/axios'; 
import LineChart from '../component/mainpage/LineChart'
import ProgressBars from '../component/mainpage/ProgressBars'


const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addTransaction } = useAddTransaction();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.user.id);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 
  const [selectedIncomeMonth, setSelectedIncomeMonth] = useState(new Date().getMonth() + 1);// Month index (1-12)
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMonthChange = (event) => {
    const monthIndex = parseInt(event.target.value, 10); // Get the selected month index (1-12)
    setSelectedMonth(monthIndex);
  };
  const handleIncomeMonthChange = (event) => {
    const monthIndex = parseInt(event.target.value, 10); // Get the selected month index (1-12)
    setSelectedIncomeMonth(monthIndex);
  };

 
    const fetchTotals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/dashboard/total-expenses/${userId}/${selectedMonth}/`
        , {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTotalExpense(response.data.total_expenses); // Adjust based on your API response structure
         // Adjust based on your API response structure
      } catch (err) {
        console.error('Error fetching totals:', err);
        setError('Failed to load totals.');
      } finally {
        setLoading(false);
      }
    };
     useEffect(() => {

    fetchTotals();
  }, [selectedMonth]);

  
    const fetchIncTotals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/dashboard/total-income/${userId}/${selectedIncomeMonth}/`
        , {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTotalIncome(response.data.total_income); // Adjust based on your API response structure
      } catch (err) {
        console.error('Error fetching totals:', err);
        setError('Failed to load totals.');
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {

    fetchIncTotals();
  }, [selectedIncomeMonth]);




  const handleAddExpense = async (expenseData) => {
    try {
      fetchIncTotals()
      fetchTotals()
      
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };
  return (
    <div className={styles.container}>
      <div style={{marginBottom:"20px", marginTop:"-15px",fontSize:"15px",color:"#1F2C73"}}>Welcome Cash Coach Finance Management</div>
      <div className={styles.TopContainer}>
      <div className={styles.first}>
          <div style={{ display: "flex", justifyContent: "space-between" , alignItems:"center"}}>
            <div style={{ fontSize: '17px', fontWeight: '600' , color:"#1F2C73",}}>Total Income</div>
            <select value={selectedIncomeMonth} onChange={handleIncomeMonthChange} className={styles.monthDropdown}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(2024, i, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div style={{ fontSize: '25px', fontWeight: '900' , color:"#1F2C73",}}>₦ {loading ? 'Loading...' : totalIncome}</div>
          <div>16% vs last month</div>
        </div>
        <div className={styles.first}>
          <div style={{ display: "flex", justifyContent: "space-between" , alignItems:"center"}}>
            <div style={{ fontSize: '17px', fontWeight: '600', color:"#1F2C73", }}>Total Expense</div>
            <select value={selectedMonth} onChange={handleMonthChange} className={styles.monthDropdown}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(2024, i, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div style={{ fontSize: '25px', fontWeight: '900', color:"#1F2C73", }}>₦ {loading ? 'Loading...' : totalExpense}</div>
          <div>16% vs last month</div>
        </div>
        <div className={styles.second}>
          <div className={styles.section} onClick={openModal}>
            <div className={styles.plus}>+</div> 
            <div style={{fontWeight:"700"}}> Add Transaction</div>
          </div>
        </div>

      </div>
      <div className={styles. display} >
        <div style={{width:"70%"}}>
      <LineChart/>
        </div>
        <div style={{width:"30%"}}>
        <ProgressBars/>
        </div>
       </div>
       <div className={styles. display} >
         <Progress/>
      
       <div >
        <Bar/>
      
        </div>
       </div>
       <div style={{width:"100%", marginTop:"20px"}}>
        <TanStackTable/>
        </div>     
        <ExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddExpense}
      /> 
 </div>
 
  )
}

export default Dashboard;
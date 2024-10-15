import React, { useEffect, useState } from 'react';
import styles from '../../styles/account.module.css';
import { CiExport } from 'react-icons/ci';
import BarChart from '../component/acc/BarChart';
import Footer from '../component/acc/Footer';
import axios from '../../api/axios'; // Make sure to import axios
import { useSelector } from '../../api/hook';
import { useAddTransaction } from '../../api/apiFolder/addTransaction';
import ExpenseModal from '../component/ExpenseModal';
import { SiDailydotdev } from 'react-icons/si';
import { MdOutlineDirectionsTransit } from 'react-icons/md';
import { TbTransform, TbTransformPointTopRight } from 'react-icons/tb';

const Analytics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addTransaction } = useAddTransaction();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Month index (1-12)
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMonthChange = (event) => {
    const monthIndex = parseInt(event.target.value, 10); // Get the selected month index (1-12)
    setSelectedMonth(monthIndex);
  };

  
    const fetchTotals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/transactions/totals/${selectedMonth}`
        , {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTotalIncome(response.data.total_income); // Adjust based on your API response structure
        setTotalExpense(response.data.total_expenses); // Adjust based on your API response structure
      } catch (err) {
        console.error('Error fetching totals:', err);
        setError('Failed to load totals.');
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {

    fetchTotals();
  }, []); // Fetch totals whenever the selected month changes

  const handleAddExpense = async (expenseData) => {
    try {
      const newTransaction = await addTransaction(expenseData);
      console.log('Transaction added:', newTransaction);
      // Optionally, refresh transactions or update local state here
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.TopContainer}>
        <div className={styles.first}>
          <div className={styles.Analytics}>
          
          <div  className={styles.icon} style={{backgroundColor:"#2F2CD8"}}><SiDailydotdev /></div>
         
           <div >
            <div>
            Daily Average
            </div>
            <h3 style={{color:"#1F2C73", fontWeight:"500",lineHeight:"1.6",marginTop:"0"}}> 
            $5470.36
            </h3>
           </div>
          </div>
         
          
        </div>
        <div className={styles.first}>
        <div className={styles.Analytics}>
        <div className={styles.Analytics}>
          
          <div  className={styles.icon} style={{backgroundColor:"#12A347"}} ><MdOutlineDirectionsTransit /></div>
          <div >
           <div>
           Total Transaction
           </div>
           <h3 style={{color:"#1F2C73", fontWeight:"500",lineHeight:"1.6",marginTop:"0"}}> 
           345
           </h3>
          </div>
         </div>
         </div>
          
        </div>
        <div className={styles.first}>
        <div className={styles.Analytics}>
    
          <div
          className={styles.icon} style={{backgroundColor:"#DC2626"}}><TbTransformPointTopRight /></div>
          <div >
           <div>
           Categories
           </div>
           <h3 style={{color:"#1F2C73", fontWeight:"500",lineHeight:"1.6",marginTop:"0"}}> 
           45
           </h3>
        
         </div>
         </div>
         
        </div>
        <div className={styles.second}>
          <div className={styles.section}>
            <div className={styles.plus}>
              <CiExport />
            </div>
            <div style={{ fontWeight: '700' }}>Export Data</div>
          </div>
        </div>
      </div>
      <div className={styles.display}>
        <div style={{ width: "100%"}}>
          <BarChart selectedMonth={selectedMonth} />
        </div>
      </div>
      <Footer />

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddExpense}
      /> 
    </div>
  );
};

export default Analytics;
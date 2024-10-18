

// import React, { useState, useEffect } from 'react';
// import { ProgressBar } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from '../../styles/budget.module.css';
// import axios from '../../api/axios';
// import BudgetLineChart from '../component/budgetpage/BudgetLineChart';
// import { FaCheckCircle } from 'react-icons/fa';
// import { CiSquarePlus } from 'react-icons/ci';
// import AddBudgetModal from '../component/budgetpage/AddBudgetModal';
// import { useSelector } from '../../api/hook';
// import { format, differenceInDays } from 'date-fns';

// const Budget = () => {
//   const [budgets, setBudgets] = useState([]);
//   const [selectedBudget, setSelectedBudget] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const accessToken = useSelector((state) => state.auth.accessToken);

//   // Fetch budgets from the server when component mounts
//   useEffect(() => {
//     const fetchBudgets = async () => {
//       try {
//         const response = await axios.get('/budgets/', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         setBudgets(response.data);
//         if (response.data.length > 0) {
//           setSelectedBudget(response.data[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching budgets:', error);
//       }
//     };

//     fetchBudgets();
//   }, [accessToken]);

//   const handleAddBudget = (newBudget) => {
//     const budget = {
//       id: budgets.length + 1,
//       category: newBudget.category,
//       budget: newBudget.amount,
//       total_amount: '',
//       amount_spent:''
//     };
//     setBudgets([...budgets, budget]);
//   };

//   const handleBudgetClick = (budget) => {
//     setSelectedBudget(budget);
//   };

//   if (!selectedBudget) {
//     return <div>Loading...</div>;
//   }

//   const getTimeLabel = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const daysDifference = differenceInDays(end, start);

//     if (daysDifference <= 1) {
//       return 'Tomorrow';
//     } else if (daysDifference <= 7) {
//       return 'week';
//     } else if (daysDifference <= 14) {
//       return '2 weeks';
//     } else if (daysDifference <= 21){
//       return '3 weeks'

//     } else if (daysDifference <= 30) {
//       return 'month';
//     } else {
//       return 'Overtime';
//     }
//   };
//   const spent = Math.min(selectedBudget.totalSpent, selectedBudget.budget);
//   const spent_percentage = selectedBudget.budget ? Math.min((spent / selectedBudget.budget) * 100, 100) : 0;
//   const remaining_Percentage = 100 - spent_percentage;

//   return (
//     <div className={styles.Budget}>
//     <div style={{ width: '30%' }}>
//       {budgets.map((budget) => (
//         <div
//           key={budget.id}
//           className={styles.BudgetFirst}
//           onClick={() => handleBudgetClick(budget)}
//           style={{ cursor: 'pointer', marginBottom: '10px' }}
//         >
//           <div style={{ fontSize: '25px', color: '#E1E1F9' }}>
//             <FaCheckCircle />
//           </div>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               width: '100%',
//               alignItems: 'center',
//             }}
//           >
//             <div>
//               {/* Correctly display category name */}
//               <div style={{ fontSize: '20px', color: '#1F2C73', fontWeight: '600' }}>
//                 {budget.name}
//               </div>
              
//               {/* Display the category name under it */}
//               <div style={{ fontSize: '20px', color: '#1F2C73', fontWeight: '600' }}>
//                 ₦{budget.total_amount}
//               </div>
//             </div>
      
//            <div style={{ color: '#1F2C73' }}>
//                 {getTimeLabel(budget.start_date, budget.end_date)}
//               </div>
//           </div>
//         </div>
//       ))}
//       <div className={styles.Add} onClick={() => setModalOpen(true)}>
//         <div style={{ fontSize: '17px', fontWeight: '600', color: '#1F2C73', marginBottom: '10px' }}>
//           Add new budget
//         </div>
//         <div style={{ color: '#2F2CD8' }}>
//           <CiSquarePlus />
//         </div>
//       </div>
//     </div>

//     <div style={{ width: '70%' }}>
//         <div className={styles.header}>{selectedBudget.category}</div>
//         <div className={styles.BudgetSecond}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
//             <div style={{ fontSize: '17px', color: '#1F2C73' }}>Spend</div>
//             <div style={{ fontSize: '17px', color: '#1F2C73' }}>Budget</div>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <div style={{ fontSize: '22px', fontWeight: '700', color: '#1F2C73' }}>₦{budget.amount_spent}</div>
//             <div style={{ fontSize: '22px', fontWeight: '700', color: '#1F2C73' }}>₦{selectedBudget.budget.total_amount}</div>
//           </div>

//           <div className={styles.progressBarContainer}>
//             <ProgressBar now={spent_percentage} animated style={{ height: '12px', borderRadius: '15px', backgroundColor: '#d3d3d3', overflow: 'hidden', marginBottom: '10px' }}>
//               <div className="progress-bar" role="progressbar" style={{ width: `${spent_percentage}%`, backgroundColor: '#2F2CD8', borderRadius: '15px' }}></div>
//             </ProgressBar>
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1F2C73' }}>
//             <div>{`${spent_percentage.toFixed(2)}%`}</div>
//             <div>{remaining_Percentage.toFixed(2)}%</div>
//           </div>
//         </div>
//        <div className={styles.update}>
//          <div>
//                    <div style={{fontSize:"17px",  color:"#1F2C73", marginBottom:"10px"}}>Last Month</div>
//          <div style={{fontSize:"22px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦60,000</div>         </div>
//          <div>
//          <div style={{fontSize:"17px", color:"#1F2C73", marginBottom:"10px"}}>Expenses</div>
//          <div style={{fontSize:"22px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦50,000</div>
//          </div>         <div>
//          <div style={{fontSize:"17px", color:"#1F2C73", marginBottom:"10px"}}>Change</div>
//          <div style={{fontSize:"22px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦10,000</div>
        
//          </div>
//        </div>
//         <BudgetLineChart />
//       </div>


     

//       {/* Add Budget Modal */}
//       <AddBudgetModal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onAddBudget={handleAddBudget}
//       />
//     </div>
//   );
// };

// export default Budget;


import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/budget.module.css';
import axios from '../../api/axios';
import BudgetLineChart from '../component/budgetpage/BudgetLineChart';
import { FaCheckCircle } from 'react-icons/fa';
import { CiSquarePlus } from 'react-icons/ci';
import AddBudgetModal from '../component/budgetpage/AddBudgetModal';
import { useSelector } from '../../api/hook';
import { format, differenceInDays } from 'date-fns';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);

  // Fetch all budgets when component mounts
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('/budgets/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBudgets(response.data);
        if (response.data.length > 0) {
          handleBudgetClick(response.data[0]); // Automatically select the first budget and fetch its details
        }
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, [accessToken]);
    const handleAddBudget = (newBudget) => {
    const budget = {
      id: budgets.length + 1,
      category: newBudget.category,
      budget: newBudget.amount,
      total_amount: '',
      amount_spent:''
    };
    setBudgets([...budgets, budget]);
    
  };

  // Fetch budget details from the /progress endpoint
  const handleBudgetClick = async (budget) => {
    try {
      const response = await axios.get(`budget/${budget.id}/progress/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSelectedBudget(response.data); // Set the budget details returned from the API
    } catch (error) {
      console.error('Error fetching budget progress:', error);
    }
  };

  if (!selectedBudget) {
    return <div>Loading...</div>;
  }

  const getTimeLabel = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDifference = differenceInDays(end, start);

    if (daysDifference <= 1) {
      return 'Tomorrow';
    } else if (daysDifference <= 7) {
      return 'week';
    } else if (daysDifference <= 14) {
      return '2 weeks';
    } else if (daysDifference <= 21) {
      return '3 weeks';
    } else if (daysDifference <= 30) {
      return 'month';
    } else {
      return 'Overtime';
    }
  };

  

  return (
    <div className={styles.Budget}>
    <div style={{ width: '30%' }}>
  {budgets.map((budget) => (
        <div
          key={budget.id}
          className={styles.BudgetFirst}
          onClick={() => handleBudgetClick(budget)}
          style={{ cursor: 'pointer', marginBottom: '10px' }}
        >
          <div style={{ fontSize: '25px', color: '#E1E1F9' }}>
            <FaCheckCircle />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div>
              {/* Correctly display category name */}
              <div style={{ fontSize: '20px', color: '#1F2C73', fontWeight: '600' }}>
                {budget.name}
              </div>
              
              {/* Display the category name under it */}
              <div style={{ fontSize: '20px', color: '#1F2C73', fontWeight: '600' }}>
                ₦{budget.total_amount}
              </div>
            </div>
      
           <div style={{ color: '#1F2C73' }}>
                {getTimeLabel(budget.start_date, budget.end_date)}
              </div>
          </div>
        </div>
      ))}
      <div className={styles.Add} onClick={() => setModalOpen(true)}>
        <div style={{ fontSize: '17px', fontWeight: '600', color: '#1F2C73', marginBottom: '10px' }}>
          Add new budget
        </div>
        <div style={{ color: '#2F2CD8' }}>
          <CiSquarePlus />
        </div>
      </div>
    </div>

      <div style={{ width: '70%' }}>
        {selectedBudget ? (
          <>
            <div className={styles.header}>{selectedBudget.name}</div>
            <div className={styles.BudgetSecond}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div style={{ fontSize: '17px', color: '#1F2C73' }}>Spend</div>
                <div style={{ fontSize: '17px', color: '#1F2C73' }}>Budget</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#1F2C73' }}>
                  ₦{selectedBudget.amount_spent || 0}
                </div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#1F2C73' }}>
                  ₦{selectedBudget.total_amount || 0}
                </div>
              </div>

              <div className={styles.progressBarContainer}>
                <ProgressBar
                  now={selectedBudget.spent_percentage}
                  animated
                  style={{ height: '12px', borderRadius: '15px', backgroundColor: '#d3d3d3', overflow: 'hidden', marginBottom: '10px' }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${selectedBudget.spent_percentage}%`,
                      backgroundColor: '#2F2CD8',
                      borderRadius: '15px',
                    }}
                  ></div>
                </ProgressBar>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1F2C73' }}>
                <div>{selectedBudget.spent_percentage}%</div>
                <div>{selectedBudget.remaining_percentage}%</div>
              </div>
            </div>
            <BudgetLineChart budgetId={selectedBudget.id} />
          </>
        ) : (
          <div>Please select a budget to view details.</div>
        )}
      </div>


      <AddBudgetModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddBudget={handleAddBudget}
      />
    </div>
  );
};

export default Budget;

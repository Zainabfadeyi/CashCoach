// import React ,{useState}from 'react';
// import { ProgressBar } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from '../../styles/budget.module.css';
// import { TRANSACTIONS } from '../mockData';
// import LineChart from '../component/mainpage/LineChart';
// import BudgetLineChart from '../component/budgetpage/BudgetLineChart';
// import { FaCheckCircle } from 'react-icons/fa';
// import { CiSquarePlus } from 'react-icons/ci';
// import { width } from '@fortawesome/free-solid-svg-icons/fa0';
// import AddBudgetModal from '../component/budgetpage/AddBudgetModal';

// const Budget = ({ category = "Groceries", budget = 60000 }) => {
//   // Calculate total spent for the specified category, capping it at the budget
//   const totalSpent = TRANSACTIONS
//     .filter(transaction => transaction.category === category)
//     .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

//   // If totalSpent is greater than the budget, cap it at the budget
//   const spent = Math.min(totalSpent, budget);

//   // Calculate the percentage spent, ensuring it doesn't exceed 100%
//   const spentPercentage = budget ? Math.min((spent / budget) * 100, 100) : 0;
//   const remainingPercentage = 100 - spentPercentage;

//   const [isModalOpen, setModalOpen] = useState(false);

//   const handleAddBudget = (budget) => {
//     // Logic to handle the added budget
//     console.log(budget);
//   };
//   return (
//     <div className={styles.Budget}>
//       <div style={{width:"30%"}}>
//       <div className={styles.BudgetFirst}>
//         <div style={{fontSize:"25px", color:"#E1E1F9"}}>
//       <FaCheckCircle />
//       </div>
//       <div style={{display:'flex', justifyContent:"space-between", width:"100%", alignItems:"center" }}>
//         <div > 
//       <div  style={{fontSize:"25px", color:"#1F2C73", fontWeight:"600"}}>  Groceries</div>
//        <div style={{color:"#1F2C73"}}>₦1200.34</div> 
//         </div>
        
//         <div tyle={{color:"#1F2C73"}}>Overtime</div>
//       </div>
//       </div>
//       <div className={styles.BudgetFirst}>
//         <div style={{fontSize:"25px", color:"#E1E1F9"}}>
//       <FaCheckCircle />
//       </div>
//       <div style={{display:'flex', justifyContent:"space-between", width:"100%", alignItems:"center" }}>
//         <div > 
//       <div  style={{fontSize:"25px", color:"#1F2C73", fontWeight:"600"}}>  Groceries</div>
//        <div style={{color:"#1F2C73"}}>₦1200.34</div> 
//         </div>
        
//         <div tyle={{color:"#1F2C73"}}>Overtime</div>
//       </div>
//       </div>
//       <div className={styles.BudgetFirst}>
//         <div style={{fontSize:"25px", color:"#E1E1F9"}}>
//       <FaCheckCircle />
//       </div>
//       <div style={{display:'flex', justifyContent:"space-between", width:"100%", alignItems:"center" }}>
//         <div > 
//       <div  style={{fontSize:"25px", color:"#1F2C73", fontWeight:"600"}}>  Groceries</div>
//        <div style={{color:"#1F2C73"}}>₦1200.34</div> 
//         </div>
        
//         <div tyle={{color:"#1F2C73"}}>Overtime</div>
//       </div>
//       </div>
//       <div className={styles.Add} onClick={() => setModalOpen(true)}>
//         <div style={{fontSize:"20px", fontWeight:"600", color:"#1F2C73", marginBottom:"10px"}}>Add new budget</div>
//         <div style={{color:"#2F2CD8"}}> <CiSquarePlus /></div>
       
        
//       </div>
//       </div>
//       <div style={{width:"70%"}}>
     
//       <div className={styles.header}>{category}</div>
   

//       <div className={styles.BudgetSecond}>

//         <div style={{display:"flex", width:"100%", justifyContent:"space-between", marginBottom:"5px"}}>
//         <div style={{fontSize:"20px", color:"#1F2C73"}}> Spend</div>
//         <div  style={{fontSize:"20px",  color:"#1F2C73"}}>Budget</div>
//         </div>
//         <div style={{display:"flex", width:"100%", justifyContent:"space-between",  marginBottom:"10px"}}>
//         <div style={{fontSize:"25px", fontWeight:"700", color:"#1F2C73"}}> ₦{spent ? spent.toLocaleString() : '0'}</div>
//         <div  style={{fontSize:"25px", fontWeight:"700", color:"#1F2C73"}}>₦{budget ? budget.toLocaleString() : '0'}</div>
//         </div>
  
//         <div className={styles.progressBarContainer}>
//   <ProgressBar 
//     now={spentPercentage} 
//     animated
//     style={{
//       height: '12px', 
//       borderRadius: '15px', 
//       backgroundColor: '#d3d3d3',
//       overflow: 'hidden',
//       marginBottom: '10px',
//     }}
//   >
//     <div 
//       className="progress-bar"
//       role="progressbar"
//       style={{
//         width: `${spentPercentage}%`, 
//         backgroundColor: '#2F2CD8',
//         borderRadius: '15px'
//       }}
//     >
//     </div>
//   </ProgressBar>
// </div>

//         <div  style={{display:"flex", width:"100%", justifyContent:"space-between", color :"#1F2C73"}}>
//         <div>{`${spentPercentage.toFixed(2)}%`} </div>
//         <div>{remainingPercentage.toFixed(2)}% </div>
//         </div> 
//       </div>
//       <div className={styles.update}>
//         <div>
//         <div style={{fontSize:"20px",  color:"#1F2C73", marginBottom:"10px"}}>Last Month</div>
//         <div style={{fontSize:"25px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦60,000</div>
//         </div>
//         <div>
//         <div style={{fontSize:"20px", color:"#1F2C73", marginBottom:"10px"}}>Expenses</div>
//         <div style={{fontSize:"25px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦50,000</div>
//         </div>
//         <div>
//         <div style={{fontSize:"20px", color:"#1F2C73", marginBottom:"10px"}}>Change</div>
//         <div style={{fontSize:"25px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦10,000</div>
        
//         </div>
//       </div>
     
//       <div>        
//          <BudgetLineChart />
//        </div>
//        </div>
//        <AddBudgetModal
//         isOpen={isModalOpen} 
//         onClose={() => setModalOpen(false)} 
//         onAddBudget={handleAddBudget}
//       />
//     </div>
//   );
// };

// export default Budget;

import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/budget.module.css';
import { TRANSACTIONS } from '../mockData';
import LineChart from '../component/mainpage/LineChart';
import BudgetLineChart from '../component/budgetpage/BudgetLineChart';
import { FaCheckCircle } from 'react-icons/fa';
import { CiSquarePlus } from 'react-icons/ci';
import AddBudgetModal from '../component/budgetpage/AddBudgetModal';

const Budget = () => {
  // Initialize budgets with a default budget
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Groceries', budget: 60000, totalSpent: 12000.34 }
  ]);
  const [selectedBudget, setSelectedBudget] = useState(budgets[0]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddBudget = (newBudget) => {
    // Create a new budget object and add it to the budgets array
    const budget = {
      id: budgets.length + 1,
      category: newBudget.category,
      budget: newBudget.amount,
      totalSpent: 0, // Initial total spent is 0
    };
    setBudgets([...budgets, budget]);
  };

  const handleBudgetClick = (budget) => {
    setSelectedBudget(budget);
  };

  const spent = Math.min(selectedBudget.totalSpent, selectedBudget.budget);
  const spentPercentage = selectedBudget.budget ? Math.min((spent / selectedBudget.budget) * 100, 100) : 0;
  const remainingPercentage = 100 - spentPercentage;

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
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '25px', color: '#1F2C73', fontWeight: '600' }}>{budget.category}</div>
                <div style={{ color: '#1F2C73' }}>₦{budget.totalSpent.toFixed(2)}</div>
              </div>
              <div style={{ color: '#1F2C73' }}>Overtime</div>
            </div>
          </div>
        ))}
        <div className={styles.Add} onClick={() => setModalOpen(true)}>
          <div style={{ fontSize: '20px', fontWeight: '600', color: '#1F2C73', marginBottom: '10px' }}>Add new budget</div>
          <div style={{ color: '#2F2CD8' }}>
            <CiSquarePlus />
          </div>
        </div>
      </div>

      <div style={{ width: '70%' }}>
        <div className={styles.header}>{selectedBudget.category}</div>
        <div className={styles.BudgetSecond}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <div style={{ fontSize: '20px', color: '#1F2C73' }}>Spend</div>
            <div style={{ fontSize: '20px', color: '#1F2C73' }}>Budget</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ fontSize: '25px', fontWeight: '700', color: '#1F2C73' }}>₦{spent.toLocaleString()}</div>
            <div style={{ fontSize: '25px', fontWeight: '700', color: '#1F2C73' }}>₦{selectedBudget.budget.toLocaleString()}</div>
          </div>

          <div className={styles.progressBarContainer}>
            <ProgressBar now={spentPercentage} animated style={{ height: '12px', borderRadius: '15px', backgroundColor: '#d3d3d3', overflow: 'hidden', marginBottom: '10px' }}>
              <div className="progress-bar" role="progressbar" style={{ width: `${spentPercentage}%`, backgroundColor: '#2F2CD8', borderRadius: '15px' }}></div>
            </ProgressBar>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1F2C73' }}>
            <div>{`${spentPercentage.toFixed(2)}%`}</div>
            <div>{remainingPercentage.toFixed(2)}%</div>
          </div>
        </div>
       <div className={styles.update}>
         <div>
                   <div style={{fontSize:"20px",  color:"#1F2C73", marginBottom:"10px"}}>Last Month</div>
         <div style={{fontSize:"25px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦60,000</div>         </div>
         <div>
         <div style={{fontSize:"20px", color:"#1F2C73", marginBottom:"10px"}}>Expenses</div>
         <div style={{fontSize:"25px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦50,000</div>
         </div>         <div>
         <div style={{fontSize:"20px", color:"#1F2C73", marginBottom:"10px"}}>Change</div>
         <div style={{fontSize:"25px", fontWeight:"700", color:"#1F2C73", marginBottom:"10px"}}>₦10,000</div>
        
         </div>
       </div>
        <BudgetLineChart />
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

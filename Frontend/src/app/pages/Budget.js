
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
import LoadingSpinner from '../component/LoadingSpinner';
import { MdDeleteOutline } from 'react-icons/md';
import DeleteMemo from '../component/tables/DeleteMemo';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);  // State for delete modal
  const [budgetToDelete, setBudgetToDelete] = useState(null);      
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.user.id);
  const [isFirstFetch, setIsFirstFetch] = useState(true); 
  // Fetch all budgets when component mounts
  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`/budget/${userId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBudgets(response.data);
      if (isFirstFetch && response.data.length > 0) {
        handleBudgetClick(response.data[0]); // Automatically select the first budget on first fetch
        setIsFirstFetch(false); // Update the flag to indicate that the first fetch has occurred
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]); // Run fetchBudgets only once when the component mounts
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
      const response = await axios.get(`budget/${userId}/${budget.id}/progress/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSelectedBudget(response.data); // Set the budget details returned from the API
    } catch (error) {
      console.error('Error fetching budget progress:', error);
    }
  };
  const handleDeleteBudget = async () => {
    try {
      await axios.delete(`/delete-budget/${userId}/${budgetToDelete.id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Update the list by removing the deleted budget
      setBudgets(budgets.filter((budget) => budget.id !== budgetToDelete.id));
      setDeleteModalOpen(false); // Close the modal
      setBudgetToDelete(null); // Reset budget to delete
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  // if (!selectedBudget) {
  //   return <div>
  //     <LoadingSpinner  size={50} message="Processing..."/>
  //   </div>;
  // }

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
          className={`${styles.BudgetFirst} ${selectedBudget && selectedBudget.id === budget.id ? styles.selected : ''}`} 
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
            key={budget.id}
            className={`${styles.BudgetName}${selectedBudget && selectedBudget.id === budget.id ? styles.selected : ''}`}
          >
            <div 
            >
              {/* Correctly display category name */}
              <div style={{ fontSize: '22px',  fontWeight: '600' }}>
                {budget.name}
              </div>
              
              {/* Display the category name under it */}
              <div style={{ fontSize: '16px',  fontWeight: '600' }}>
                ₦{budget.total_amount}
              </div>
            </div>
      
           <div>
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
          <div className={styles.header} >
            <div className={styles.name}>{selectedBudget.name}</div>
            <div
                onClick={() => {
                  setBudgetToDelete(selectedBudget); // Set the selected budget to delete
                  setDeleteModalOpen(true); // Open the delete modal
                }}
                style={{ cursor: 'pointer' }}
                className={styles.name}
              >
                <MdDeleteOutline  />
              </div>
            </div>
            <div className={styles.BudgetSecond}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div style={{ fontSize: '17px', color: '#1F2C73' }}>Spend</div>
                <div style={{ fontSize: '17px', color: '#1F2C73' }}>Budget</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#1F2C73' }}>
                  ₦{selectedBudget.amount_spent || 0}
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#1F2C73' }}>
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
                      backgroundColor: selectedBudget.spent_percentage > 100 ? '#ff0000' : '#2F2CD8', // Red if spent_percentage > 100, otherwise default color
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
         <DeleteMemo
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteBudget}
        transactionId={budgetToDelete?.name}
      />
    </div>
  );
};

export default Budget;

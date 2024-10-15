import React from 'react';

import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard';
import Transaction from './app/pages/Transaction';
import Budget from './app/pages/Budget';
import Register from './app/component/authentication/Register';
import Login from './app/component/authentication/Login';
import Layout from './app/layout/Layout';
import UserProfileForm from './app/pages/UserProfileForm';
import ExpenseModal from './app/component/ExpenseModal';
import Categories from './app/pages/Categories';
import Analytics from './app/pages/Analytics';
import Expenses from './app/pages/Expenses';


const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        
          <Routes>
          <Route path= '/login' element={<Login/>}/>
          <Route path= '/register' element={<Register/>}/>

            <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/categories" element={<Categories/>}/>
            <Route path='/budget' element={<Budget/>}/>
            <Route path='/userprofile' element={<UserProfileForm/>}/>
            <Route path="/analytics" element={<Analytics/>}/>
            <Route path="/expenses" element={<Expenses/>}/>
            
            
            </Route>
          </Routes>
      
      </div>
    </Router>
  );
};

export default App;
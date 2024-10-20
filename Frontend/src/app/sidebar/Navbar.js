// src/components/navbar/Navbar.js
import React, { useState } from 'react';
import styles from '../../styles/navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/slices/authSlices';
import { clearUser } from '../../api/slices/userSlices';
import Dropdown from './Dropdown'; // Import the Dropdown component

const Navbar = ({ selectedItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const first_name = useSelector((state) => state.auth.user.user.first_name);
  const last_name = useSelector((state) => state.auth.user.user.last_name);
  
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate("/login");
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const handleProfileOptionClick = () => {
    navigate("/userprofile");
    setDropdownOpen(false); // Close the dropdown after navigating
  };

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <div className={styles.memo}>{selectedItem}</div>
      </div>
      <div className={styles.placeholder} onClick={handleProfileClick}>
        <img
          src={`https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${first_name}+${last_name}`}
          alt=""
          className={styles.profile}
        />
        {dropdownOpen && (
          <Dropdown 
            onProfileClick={handleProfileOptionClick} 
            onLogoutClick={handleLogout} 
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

// src/components/navbar/Dropdown.js
import React from 'react';
import styles from '../../styles/navbar.module.css';

const Dropdown = ({ onProfileClick, onLogoutClick }) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownItem} onClick={onProfileClick}>
        Profile
      </div>
      <div className={styles.dropdownItem} onClick={onLogoutClick}>
        Logout
      </div>
    </div>
  );
};

export default Dropdown;

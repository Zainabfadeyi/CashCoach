import React, { useState, useEffect, useRef } from 'react';
import { IoIosMore } from 'react-icons/io';
import styles from '../../../styles/table.module.css';

const ActionsDropdown = ({ onView, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className={styles.actionDropdown} ref={dropdownRef}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        <IoIosMore />
      </div>
      {dropdownOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownItem} onClick={onView}>View</div>
          <div className={styles.dropdownItem} onClick={onDelete}>Delete</div>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdown;

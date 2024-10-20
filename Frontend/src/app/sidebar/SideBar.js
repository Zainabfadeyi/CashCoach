
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { SideBarData } from './SideBarData';
import SubMenu from './SubMenu';

const SideBar = ({ onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? '←' : '→'}
      </button>
      <div className={styles.logo}>Cash Coach</div>
      <nav className={styles.navigation}>
        <ul>
          {SideBarData.map((item) => (
            <li key={item.title} className={`${location.pathname === item.path ? styles.active : ''} ${styles.navItem}`}>
              <SubMenu 
                item={item} 
                activeLink={location.pathname} 
                setActiveLink={(path) => {
                  navigate(path);
                  onSelectItem(item.title); // Pass the item title when clicked
                }} 
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;


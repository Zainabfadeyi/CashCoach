// src/components/navbar/Dropdown.js
import React from 'react';
import styles from '../../styles/navbar.module.css';
import { useSelector } from '../../api/hook';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

const Dropdown = ({ onProfileClick, onLogoutClick }) => {
  const username= useSelector((state) => state.auth.user.user.username);
  const email= useSelector((state) => state.auth.user.user.email);
  const firstName = useSelector((state) => state.auth.user?.firstName);
  const lastName = useSelector((state) => state.auth.user?.lastName);
  
  return (
    <div className={styles.dropdown}>
      
      <div style={{marginBottom:"10px", padding:"10px", display:"flex",alignItems:"center", columnGap:"15px",}}>
      <img
          src={`https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${firstName}+${lastName}`}
          alt=""
          className={styles.profile}
        />
      <div>
      <div className={styles.userDetails}>
      <div style={{fontWeight:"700"}}>{username}</div>
        
      </div>
      <div className={styles.userDetails}>
      
      <div style={{fontSize:"15px"}}>{email}</div>
      </div>
      </div>
      </div>

      <div style={{border:"1px solid #f5f5f5 "}}></div>
      <div className={styles.dropdownItem} onClick={onProfileClick}>
      <div><CgProfile /></div>
       <div>Profile</div> 
      </div>
      <div style={{border:"1px solid #f5f5f5 "}}></div>
      <div className={styles.dropdownItemLogout} onClick={onLogoutClick}>
        <div><IoLogOutOutline /></div>
      
        <div>Logout</div>
      
      </div>
    </div>
  );
};

export default Dropdown;

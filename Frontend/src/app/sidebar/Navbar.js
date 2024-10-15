// src/components/navbar/Navbar.js
import React from 'react';
import styles from '../../styles/navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/slices/authSlices';
import { clearUser } from '../../api/slices/userSlices';


const Navbar = ({  selectedItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstName = useSelector((state) => state.auth.user?.firstName);
  const lastName = useSelector((state) => state.auth.user?.lastName);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/userprofile");
  };

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <div className={styles.memo}>{selectedItem}</div>

      </div>
      <div className={styles.placeholder} onClick={handleProfileClick}>
        <img
          src={`https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${firstName}+${lastName}`}
          alt=""
          className={styles.profile}
        />
      </div>
    </div>
  );
};

export default Navbar;

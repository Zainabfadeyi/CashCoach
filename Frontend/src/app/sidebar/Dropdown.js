// src/components/navbar/Dropdown.js
import React, { useEffect, useState } from 'react';
import styles from '../../styles/navbar.module.css';
import { useSelector } from '../../api/hook';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import axios from '../../api/axios'

const Dropdown = ({ onProfileClick, onLogoutClick }) => {
  const username= useSelector((state) => state.auth.user.user.username);
  const email= useSelector((state) => state.auth.user.user.email);
  const first_name = useSelector((state) => state.auth.user.user.first_name);
  const last_name = useSelector((state) => state.auth.user.user.last_name);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const accessToken = useSelector((state) => state.auth.accessToken);
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get('profile/image/', {
        headers: {
          'Authorization': `Bearer ${accessToken}` // If you're using token-based auth
        }
      });
      const imageUrl = response.data.image_url;
      setImagePreviewUrl(`https://cashcoach.onrender.com${response.data.image_url}`);
    } catch (error) {
      console.error('Error fetching profile image:', error);
      // Fallback to default avatar if error or no image exists
    }
  };
  useEffect(() => {
    fetchProfileImage();
  }, []);
  return (
    <div className={styles.dropdown}>
      
      <div style={{marginBottom:"10px", padding:"10px", display:"flex",alignItems:"center", columnGap:"15px",}}>
      <img
         src={imagePreviewUrl || `https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${first_name}+${last_name}`}
          alt=""
          className={styles.profile}
          style={{ width: '39px', height: '39px', borderRadius: '50%' }}
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

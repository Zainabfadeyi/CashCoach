// src/components/navbar/Navbar.js
import React, { useState,useEffect } from 'react';
import styles from '../../styles/navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/slices/authSlices';
import { clearUser } from '../../api/slices/userSlices';
import Dropdown from './Dropdown'; // Import the Dropdown component
import axios from '../../api/axios'
const Navbar = ({ selectedItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const first_name = useSelector((state) => state.auth.user.user.first_name);
  const last_name = useSelector((state) => state.auth.user.user.last_name);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate("/login");
  };
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

  // Fetch profile image on component mount
  useEffect(() => {
    fetchProfileImage();
  }, []);

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
         src={imagePreviewUrl || `https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${first_name}+${last_name}`}
          alt=""
          className={styles.profile}
          style={{ width: '55px', height: '55px', borderRadius: '50%' }}
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

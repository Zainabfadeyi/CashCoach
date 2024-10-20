import React, { useState } from 'react';
import { useSelector } from '../../../api/hook';
import styles from '../../../styles/navbar.module.css';

const ProfilePictureUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false); // Toggle for email form
  const [emailFormData, setEmailFormData] = useState({
    newEmail: '',
    confirmNewEmail: '',
    currentPassword: ''
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const username = useSelector((state) => state.auth.user.user.username);
  const email = useSelector((state) => state.auth.user.user.email);
  const firstName = useSelector((state) => state.auth.user?.firstName);
  const lastName = useSelector((state) => state.auth.user?.lastName);
  
  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result); // Update the image preview URL
      };
      reader.readAsDataURL(file);
      setSelectedImage(file); // Store the selected image file
    }
  };

  // Function to handle image upload (optional if uploading to server)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      // Here, you can handle the image upload logic, such as sending it to the server
      console.log('Image uploaded:', selectedImage);
    }
  };

  const handleEmailFormChange = (e) => {
    const { name, value } = e.target;
    setEmailFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div style={{display: "flex", alignItems: "center", columnGap: "20px"}}>
          <div>
            {/* Conditionally render the uploaded image or a default avatar */}
            <img
              src={imagePreviewUrl 
                    ? imagePreviewUrl 
                    : `https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${firstName}+${lastName}`
              }
              alt="Profile"
              className={styles.profile}
              style={{ width: '70px', height: '70px', borderRadius: '50%' }}
            />
          </div>
          <div>
            <div style={{fontSize:"20px",color:"#1f2c73", fontWeight:"600"}}>{username}</div>
            <div style={{color:"#7184ad", fontSize:"16px"}}>Max file size is 20mb
            </div>
        </div>
        </div>
        <div style={{marginBottom: "30px", marginTop: "30px"}}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <button 
            style={{
              backgroundColor: "blue",
              padding: "15px",
              border: "none",
              color: "white",
              display: "flex",
              justifyContent: "center",
              paddingLeft: "40px",
              paddingRight: "40px",
              borderRadius: "5px"
            }} 
            type="submit">
            Save
          </button>
        </div>
      </form>
      <div className={style.emailWrapper}>
      <label style={{fontSize:"15px", fontWeight:"700"}} className={style.label}>
            Current Email:
          </label>
          <div style={{display:"flex", margin:"10px", columnGap:"50px", alignItems:"center"}}>
          <div style={{marginBottom:"10px"}}>{userProfile.email}</div>
      <button onClick={handleEmailChange} className={style.button}>
        Change Email
      </button>
      </div>


      {/* Change Email Form */}
      {showEmailForm && (
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <header style={{ textAlign: 'center', color: 'red' }}>Change Email</header>
            <form>
              <div className={styles.modalContent}>
                <div>
                  <label htmlFor="newEmail" className={styles.label}>
                    New Email:
                  </label>
                  <input
                    type="email"
                    id="newEmail"
                    name="newEmail"
                    value={emailFormData.newEmail}
                    onChange={handleEmailFormChange}
                    className={styles.passwordinput}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmNewEmail" className={styles.label}>
                    Confirm New Email:
                  </label>
                  <input
                    type="email"
                    id="confirmNewEmail"
                    name="confirmNewEmail"
                    value={emailFormData.confirmNewEmail}
                    onChange={handleEmailFormChange}
                    className={styles.passwordinput}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="currentPassword" className={styles.label}>
                    Current Password:
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={emailFormData.currentPassword}
                    onChange={handleEmailFormChange}
                    className={styles.passwordinput}
                    required
                  />
                </div>
                {emailError && (
                  <p className={styles.error}>
                    {emailError || passwordError}
                  </p>
                )}
              </div>
            </form>
            </div>
        </div>
      )}
      </div>
    
    </div>
  );
};

export default ProfilePictureUpload;

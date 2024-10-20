import React, { useState } from 'react';
import { useSelector } from '../../../api/hook';
import styles from '../../../styles/navbar.module.css';

const ProfilePictureUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false); // Toggle for email form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [emailFormData, setEmailFormData] = useState({
    newEmail: '',
    confirmNewEmail: '',
    currentPassword: ''
  });
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  
  const username = useSelector((state) => state.auth.user.user.username);
  const email = useSelector((state) => state.auth.user.user.email);
  const firstName = useSelector((state) => state.auth.user.user.first_name);
  const lastName = useSelector((state) => state.auth.user.user.last_name);
  
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
  const handleCancelEmailChange = () => {
    setShowEmailForm(false);
    setEmailError('');
    setEmailFormData({
      currentPassword: '',
      newEmail: '',
      confirmNewEmail: '',
    });
  };
  const handleSaveEmail=() =>{
     
  }
  const handleCancelPasswordChange = () => {
    setShowPasswordForm(false);
    setPasswordError('');
    setPasswordFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
  };
  const handleSavePassword =() =>{

  }
  const handlePasswordChange = () => {
    setShowPasswordForm(true);
  };

  const handleEmailFormChange = (e) => {
    const { name, value } = e.target;
    setEmailFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailChange = () => {
    setShowEmailForm(true);
  };
  return (
    <div className={styles.overall}>
    <div style={{display:"flex", width:"100%", columnGap:"20px", marginBottom:"20px"}}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.profileName}>User Profile</div>
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
              borderRadius: "5px",
              marginBottom :"10px"
            }} 
            type="submit">
            Save
          </button>
        </div>
      </form>
      <div className={styles.passandemail}>
      <div className={styles.profileName}>User Profile</div>
      <div className={styles.emailWrapper}>
      <label style={{fontSize:"15px", fontWeight:"700"}} className={styles.label}>
            Current Email:
          </label>
          <div style={{display:"flex", margin:"10px", columnGap:"50px", alignItems:"center"}}>
          <div style={{marginBottom:"10px"}}>{email}</div>
      <button onClick={handleEmailChange} className={styles.button}>
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
            <div className={styles.modalButton}>
          <button onClick={handleCancelEmailChange} className={styles.button}
          style={{marginRight:"8px"}}>
            Cancel
          </button>
          <button onClick={handleSaveEmail} className={styles.button}
          style={{backgroundColor:"red"}}>
            Change Email
          </button>
          </div>
            </div>
        </div>
      )}

      
      </div>
      <div className={styles.passwordWrapper}>
      <label  style={{fontSize:"15px", fontWeight:"700"}} className={styles.label}>
           Password:
          </label>
          <div style={{display:"block"}}>
      <button onClick={handlePasswordChange} className={styles.button}>
        Change Password
      </button>
      </div>
      {showPasswordForm && (
        <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <header style={{textAlign:"center", color:"red"}}>Change Password</header>
          <form>
          <div className={styles.modalContent}>
            <div>
              <label htmlFor="currentPassword" className={styles.label}>
                Current Password:
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className={styles.passwordinput}
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className={styles.label}>
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className={styles.passwordinput}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className={styles.label}>
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className={styles.passwordinput}
                required
              />
            </div>
            {passwordError && (
                <p className={styles.error}>{passwordError}</p>
              )}
              </div>
          </form>
          <div className={styles.modalButton}>
          <button onClick={handleCancelPasswordChange} className={styles.button}
          style={{marginRight:"8px"}}>
            Cancel
          </button>
          <button onClick={handleSavePassword} className={styles.button}
          style={{backgroundColor:"red"}}>
            Change Password
          </button>
          </div>
          </div>
        </div>
      )}
      </div>
      
      </div>
    
    </div>
    <div className={styles.profileField}>
    <div className={styles.profileName}>Personal Information</div>
        <div style={{display:"flex", width:"100%",columnGap:"20px"}}>
    <div style={{width:"100%"}}>
        <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
        <input
          
          id="firstName"
          name="firstName"
          readOnly
          value={firstName}
          style={{ width: '100%', padding: '12px', 
            border:"1px solid #e5e5e5", 
            borderRadius:"10px" ,
            fontSize:"18px",
            marginBottom:"15px"
            
        }}
        />
      </div>

      <div style={{ marginBottom: '15px',width:"100%" }}>
        <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          readOnly
          style={{ width: '100%', 
            padding: '12px', 
            border:"1px solid #e5e5e5" , 
            borderRadius:"10px" ,
            fontSize:"18px",
            marginBottom:"15px"
        }}
        />
      </div>
      </div>
      <div style={{display:"flex", width:"100%",columnGap:"20px"}}>
      <div style={{ marginBottom: '15px' ,width:"100%"}}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          readOnly
          style={{ width: '100%', 
            padding: '8px', 
            border:"1px solid #e5e5e5" ,
             borderRadius:"10px",
             padding: '12px',
             fontSize:"18px"
            }}
        />
      </div>

      <div style={{ marginBottom: '15px', width:"100%" }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          readOnly
          style={{ width: '100%',
             padding: '12px',
              border:"1px solid #e5e5e5",
               borderRadius:"10px",
               fontSize:"18px"
             }}
        />
      </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;

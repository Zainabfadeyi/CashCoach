import React, { useState, useEffect } from 'react';
import { useSelector } from '../../../api/hook';
import styles from '../../../styles/navbar.module.css';
import axios from '../../../api/axios';

const ProfilePictureUpload = () => {

  const [showEmailForm, setShowEmailForm] = useState(false); // Toggle for email form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken); // Assuming the access token is in the state
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  
  
  const username = useSelector((state) => state.auth.user.user.username);
  const email = useSelector((state) => state.auth.user.user.email);
  const firstName = useSelector((state) => state.auth.user.user.first_name);
  const lastName = useSelector((state) => state.auth.user.user.last_name);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
  
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      console.error('No file selected!');
      return;
    }
  
    // Prepare the form data
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      // Send POST request to upload the image
      const response = await axios.post('/upload-profile-image/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',

        },
      });
  
      // Update imagePreviewUrl with the URL from the response (assuming the backend returns the image URL)
      setImagePreviewUrl(response.data.imageUrl);
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
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

  const handleSaveEmail = async () => {
    const { newEmail, confirmNewEmail, currentPassword } = emailFormData;
    
    // Validation (optional)
    if (newEmail !== confirmNewEmail) {
      setEmailError("Emails do not match");
      return;
    }
    
    try {
      // Make API request to change email
      const response = await axios.put('/profile/change-email/', {
        new_email: newEmail,
        confirm_new_email: confirmNewEmail,
        current_password: currentPassword
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Handle success response (e.g., show a message or update the UI)
      console.log('Email changed successfully:', response.data);
      setShowEmailForm(false); // Close the modal on success
    } catch (error) {
      // Handle errors (e.g., show the error message)
      if (error.response) {
        setEmailError(error.response.data.error || 'Failed to change email');
      } else {
        setEmailError('Something went wrong');
      }
    }
  };
  
  

  // Function to handle cancel password change
  const handleCancelPasswordChange = () => {
    setShowPasswordForm(false);
    setPasswordError('');
    setPasswordFormData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  // Function to handle save password
  const handleSavePassword = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordFormData;

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      // API call to change the password
      const response = await axios.post('change-password/', {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Handle success (you might want to close the form or show a success message)
      console.log('Password changed successfully:', response.data);
      setShowPasswordForm(false);
      setPasswordError('');
    } catch (error) {
      // Handle error (e.g., incorrect current password)
      console.error('Error changing password:', error.response.data);
      setPasswordError(error.response?.data?.detail || 'Error changing password.');
    }
  };

  const handlePasswordChange = () => {
    setShowPasswordForm(true);
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={styles.overall}>
    <div style={{display:"flex", width:"100%", columnGap:"20px", marginBottom:"20px"}}>
    <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.profileName}>User Profile</div>
        <div style={{display: "flex", alignItems: "center", columnGap: "20px"}}>
          <div>
            <img
              // src={imagePreviewUrl 
              //       ? imagePreviewUrl 
              //       : `https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${firstName}+${lastName}`
              // }
              src={imagePreviewUrl || `https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${firstName}+${lastName}`}
              alt="Profile"
              className={styles.profile}
              style={{ width: '70px', height: '70px', borderRadius: '50%' }}
            />
          </div>
          <div>
            <div style={{fontSize:"20px",color:"#1f2c73", fontWeight:"600"}}>{username}</div>
            <div style={{color:"#7184ad", fontSize:"16px"}}>Max file size is 20mb</div>
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
                    value={emailFormData.newEmail} // Controlled input
                    onChange={handleEmailFormChange} 
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
                    value={emailFormData.confirmNewEmail} // Controlled input
                    onChange={handleEmailFormChange} 
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
                    value={emailFormData.currentPassword} // Controlled input
                    onChange={handleEmailFormChange} // Handle
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
            <header style={{ textAlign: "center", color: "red" }}>Change Password</header>
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
                    value={passwordFormData.currentPassword}
                    onChange={handlePasswordFormChange}
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
                    value={passwordFormData.newPassword}
                    onChange={handlePasswordFormChange}
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
                    value={passwordFormData.confirmNewPassword}
                    onChange={handlePasswordFormChange}
                    required
                  />
                </div>
                {passwordError && (
                  <p className={styles.error}>{passwordError}</p>
                )}
              </div>
            </form>
            <div className={styles.modalButton}>
              <button onClick={handleCancelPasswordChange} className={styles.button} style={{ marginRight: "8px" }}>
                Cancel
              </button>
              <button onClick={handleSavePassword} className={styles.button} style={{ backgroundColor: "red" }}>
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

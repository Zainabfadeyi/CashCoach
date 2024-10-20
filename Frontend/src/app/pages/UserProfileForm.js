import React, { useState } from 'react';
import styles from '../../styles/navbar.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfilePictureUpload from '../component/userProfile/ProfilePictureUpload';
;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const UserProfileForm = () => {
    // const { changeEmailAPI, changePasswordAPI, deleteAccountAPI } = userFormService();
    const user = useSelector((state) => state.auth.user);

    const [userProfile, setUserProfile] = useState({
        firstname: user?.firstName || '',
        lastname: user?.lastName || '',
        email: user?.email || '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [emailError, setEmailError] = useState('');
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [emailFormData, setEmailFormData] = useState({
        currentPassword: '',
        newEmail: '',
        confirmNewEmail: '',
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handlePasswordChange = () => {
        setShowPasswordForm(true);
    };

    const handlePasswordFormChange = (e) => {
        const { name, value } = e.target;
        setPasswordFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // const handleSavePassword = async () => {
    //     if (!PWD_REGEX.test(passwordFormData.newPassword)) {
    //         setPasswordError('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It should be between 8 and 24 characters.');
    //         return;
    //     }

    //     if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
    //         setPasswordError('New Password and Confirm New Password do not match.');
    //         return;
    //     }

    //     try {
    //         await changePasswordAPI(passwordFormData.currentPassword, passwordFormData.newPassword, passwordFormData.confirmNewPassword);
    //         setShowPasswordForm(false);
    //     } catch (error) {
    //         if (error === 'Current password is incorrect. Please try again.') {
    //             setPasswordError('Current password is incorrect. Please try again.');
    //         } else {
    //             navigate("/login");
    //             setPasswordFormData({
    //                 currentPassword: '',
    //                 newPassword: '',
    //                 confirmNewPassword: '',
    //             });
    //             setShowPasswordForm(false);
    //         }
    //     }
    // };

    const handleEmailChange = () => {
        setShowEmailForm(true);
    };

    const handleEmailFormChange = (e) => {
        const { name, value } = e.target;
        setEmailFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // const handleSaveEmail = async () => {
    //     if (emailFormData.newEmail !== emailFormData.confirmNewEmail) {
    //         setEmailError('New Email and Confirm New Email do not match.');
    //         return;
    //     }

    //     if (!PWD_REGEX.test(emailFormData.currentPassword)) {
    //         setEmailError('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It should be between 8 and 24 characters.');
    //         return;
    //     }

    //     try {
    //         await changeEmailAPI(emailFormData.newEmail, emailFormData.currentPassword);
    //         setUserProfile((prevProfile) => ({
    //             ...prevProfile,
    //             email: emailFormData.newEmail,
    //         }));
    //         setShowEmailForm(false);
    //     } catch (error) {
    //         if (error === 'Current password is incorrect. Please try again.') {
    //             setPasswordError('Current password is incorrect. Please try again.');
    //         } else {
    //             setShowEmailForm(false);
    //             setEmailFormData({
    //                 currentPassword: '',
    //                 newEmail: '',
    //                 confirmNewEmail: '',
    //             });
    //         }
    //     }
    // };

    const handleConfirmDeleteAccount = () => {

    }
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteAccountData, setDeleteAccountData] = useState({
        currentPassword: '',
        reason: '',
    });

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteAccountData({
            currentPassword: '',
            reason: '',
        });
    };

    // const handleConfirmDeleteAccount = async () => {
    //     try {
    //         await deleteAccountAPI(deleteAccountData.currentPassword);
    //         console.log('Account deleted!');
    //         setUserProfile({
    //             firstname: '',
    //             lastname: '',
    //             email: '',
    //         });
    //         navigate("/");
    //         setShowDeleteModal(false);
    //     } catch (error) {
    //         if (error === 'Current password is incorrect. Please try again.') {
    //             setPasswordError('Current password is incorrect. Please try again.');
    //         }
    //     }
    // };

    return (
        <div>
            <div>
                <ProfilePictureUpload/>
            </div>
        <div>
        <div className={styles.deleteWrapper}>
    <div>
      
    
      <button onClick={handleDeleteAccount} className={styles.deletebutton}>
        Delete Account
      </button>
      {showDeleteModal && (
        <div className={styles.modal}>
        <div className={styles.modalContainer}>
        <header style={{textAlign:"center", color:"red"}}>Delete Account</header>
        <div style={{marginBottom:"30px"}}>We'll be sorry to see you go, but thanks for trying Todo!</div>
          <div className={styles.modalContent}>
            <form>
                <div style={{marginBottom:"20px"}}>Deleting your account is permanent. All your data will be wiped out immediately and you won't be able to get it back.</div>
                <div>
                <label htmlFor="reason" className={styles.label}>
                  Reason for Delete (Optional):
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={deleteAccountData.reason}
                  onChange={(e) =>
                    setDeleteAccountData((prevData) => ({
                      ...prevData,
                      reason: e.target.value,
                    }))
                  }
                  className={styles.modaltextinput}
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
                  value={deleteAccountData.currentPassword}
                  onChange={(e) =>
                    setDeleteAccountData((prevData) => ({
                      ...prevData,
                      currentPassword: e.target.value,
                    }))
                  }
                  className={styles.modalinput}
                  required
                />
              </div>
              
            </form>
            <div className={styles.modalButton}>
            <button onClick={handleCloseDeleteModal} className={styles.button}
            style={{marginRight:"8px"}}>
              Cancel
            </button>
            <button
              onClick={handleConfirmDeleteAccount}
              className={styles.button}
              style={{backgroundColor:"red"}}
            >
              Yes, Delete
            </button>
            </div>
          </div>
        </div>
        </div>
      )}
      </div>
      </div>
        </div>
        </div>
    );
};

export default UserProfileForm;
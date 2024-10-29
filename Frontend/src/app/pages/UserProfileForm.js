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
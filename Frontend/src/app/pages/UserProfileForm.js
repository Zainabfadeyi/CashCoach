import React, { useState } from 'react';
import styles from '../../styles/userProfile.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { userFormService } from '../api/userFormService';

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

    const handleCancelPasswordChange = () => {
        setShowPasswordForm(false);
        setPasswordError('');
        setPasswordFormData({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        });
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
            <h2>User Profile</h2>
            <label>
                First Name:
                <input type="text" name="firstname" value={userProfile.firstname} onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastname" value={userProfile.lastname} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={userProfile.email} readOnly />
            </label>
            <button >Change Email</button>
            {showEmailForm && (
                <div>
                    <label>
                        New Email:
                        <input type="email" name="newEmail" onChange={handleEmailFormChange} />
                    </label>
                    <label>
                        Confirm New Email:
                        <input type="email" name="confirmNewEmail" onChange={handleEmailFormChange} />
                    </label>
                    <label>
                        Current Password:
                        <input type="password" name="currentPassword" onChange={handleEmailFormChange} />
                    </label>
                    {emailError && <p>{emailError}</p>}
                    <button >Cancel</button>
                    <button >Change Email</button>
                </div>
            )}
            <label>
                Password:
                <button >Change Password</button>
            </label>
            {showPasswordForm && (
                <div>
                    <label>
                        Current Password:
                        <input type="password" name="currentPassword" onChange={handlePasswordFormChange} />
                    </label>
                    <label>
                        New Password:
                        <input type="password" name="newPassword" onChange={handlePasswordFormChange} />
                    </label>
                    <label>
                        Confirm New Password:
                        <input type="password" name="confirmNewPassword" onChange={handlePasswordFormChange} />
                    </label>
                    {passwordError && <p>{passwordError}</p>}
                    <button onClick={handleCancelPasswordChange}>Cancel</button>
                    <button >Change Password</button>
                </div>
            )}
            <button onClick={handleDeleteAccount}>Delete Account</button>
            {showDeleteModal && (
                <div>
                    <h3>Delete Account</h3>
                    <p>This will immediately delete all of your data including tasks, projects, comments, and more. This can’t be undone.</p>
                    <label>
                        Reason for Delete (Optional):
                        <input type="text" onChange={(e) => setDeleteAccountData((prevData) => ({ ...prevData, reason: e.target.value }))} />
                    </label>
                    <label>
                        Current Password:
                        <input type="password" onChange={(e) => setDeleteAccountData((prevData) => ({ ...prevData, currentPassword: e.target.value }))} required />
                    </label>
                    <button onClick={handleCloseDeleteModal}>Cancel</button>
                    <button >Yes, Delete</button>
                </div>
            )}
        </div>
    );
};

export default UserProfileForm;
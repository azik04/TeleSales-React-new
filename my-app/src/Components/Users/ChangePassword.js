import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode"; 

const ChangePassword = ({ close }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState({});
    const [userId, setUserId] = useState(null);

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const userToken = localStorage.getItem("JWT");
        if (userToken) {
            const decodedToken = jwtDecode(userToken);
            setUserId(decodedToken.unique_name); 
        }
    }, []); 

    const handleSubmit = async () => {
        try {
            console.log(userId)
            const res = await axios.put(`https://localhost:7108/api/User/${userId}/ChangePassword`, {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword,
            });
            console.log('User Updated:', res);
            close();
        } catch (error) {
            console.error('Error creating call:', error.response?.data?.errors);
            setError(error.response?.data?.errors || {});
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Change Password</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="old-password">Old Password</label>
                            <input
                                type="text"
                                id="old-password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter Old Password"
                            />
                            <span className={`errors ${error?.OldPassword?.[0] ? 'visible' : ''}`}>
                                {error?.OldPassword?.[0]}
                            </span>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="new-password">New Password</label>
                            <input
                                type="text"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter New Password"
                            />
                            <span className={`errors ${error?.NewPassword?.[0] ? 'visible' : ''}`}>
                                {error?.NewPassword?.[0]}
                            </span>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="confirm-new-password">Confirm New Password</label>
                            <input
                                type="text"
                                id="confirm-new-password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="Confirm New Password"
                            />
                            <span className={`errors ${error?.ConfirmNewPassword?.[0] ? 'visible' : ''}`}>
                                {error?.ConfirmNewPassword?.[0]}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>Cancel</button>
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;

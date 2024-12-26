import React, { useState, useEffect } from 'react';
import '../style.css'; 
import EditUser from '../Components/Users/EditUser';
import {jwtDecode} from 'jwt-decode';
import ChangePassword from '../Components/Users/ChangePassword';

const Settings = () => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showChangePopup, setShowChangePopup] = useState(false);  
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('JWT');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setSelectedUserId(decoded.unique_name); 
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const handleEdit = () => {
        setShowEditPopup(true);
    };

    const handleChangePassword = () => {  
        setShowChangePopup(true);
    };

    return (
        <section className="content">
            <div className="settings">
                <button
                    className="settings__button settings__button--user"
                    onClick={handleEdit}
                >
                    <i className="fa-solid fa-user settings__icon"></i>
                    <p className="settings__text">User Settings</p>
                </button>
                <button
                    className="settings__button settings__button--user"
                    onClick={handleChangePassword}  
                >
                    <i className="fa-solid fa-lock"></i>
                    <p className="settings__text">Change Password</p>
                </button>
            </div>

            {showEditPopup && (<EditUser close={() => setShowEditPopup(false)} userId={selectedUserId} />)}
            {showChangePopup && (<ChangePassword close={() => setShowChangePopup(false)}/>)}
        </section>
    );
};


export default Settings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ close }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({}); 
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;


    const handleSubmit = async () => {
        try {
            const res = await axios.post(`https://localhost:7108/api/Admin/Admin`, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            console.log('User Create:', res);
            close();
        } catch (error) {
            console.error('Error creating call:', error.response.data.errors);
            setError(error.response.data.errors);
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Create User</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                          <label htmlFor="first-name">First Name</label>
                          <input type="text" id="first-name" onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name"/>
                            <span className={`errors ${error?.FirstName?.[0] ? 'visible' : ''}`}>
                              {error?.FirstName?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                          <label htmlFor="last-name">Last Name</label>
                          <input type="text" id="last-name" onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name"/>
                          <span className={`errors ${error?.LastName?.[0] ? 'visible' : ''}`}>
                             {error?.LastName?.[0]}
                          </span>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="user-email">Email</label>
                            <input
                                type="text"
                                id="user-email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                            />
                            <span className={`errors ${error?.Email?.[0] ? 'visible' : ''}`}>
                                {error?.Email?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label htmlFor="user-email">Password</label>
                            <input
                                type="text"
                                id="user-password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                            />
                            <span className={`errors ${error?.Password?.[0] ? 'visible' : ''}`}>
                                {error?.Password?.[0]}
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

export default EditUser;

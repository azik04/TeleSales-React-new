import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ close, userId }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState({}); 
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`https://localhost:7108/api/User/${userId}`);
                console.log(res);

                if (res.data.data?.fullName) {
                    const nameParts = res.data.data.fullName.split(' ');
                    setFirstName(nameParts[0] || ''); 
                    setLastName(nameParts[1] || '');  
                }
                setEmail(res.data.data?.email || ''); 
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleSubmit = async () => {
        try {
            const res = await axios.put(`https://localhost:7108/api/User/${userId}`, {
                firstName: firstName,
                lastName: lastName,
                email: email,
            });
            console.log('User Updated:', res);
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
                    <h3>Edit User</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                id="first-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter First Name"
                            />
                            <span className={`errors ${error?.FirstName?.[0] ? 'visible' : ''}`}>
                                {error?.FirstName?.[0]}
                            </span>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter Last Name"
                            />
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                            />
                            <span className={`errors ${error?.Email?.[0] ? 'visible' : ''}`}>
                                {error?.Email?.[0]}
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

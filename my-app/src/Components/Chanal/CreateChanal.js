import React, { useState } from 'react';
import axios from 'axios';

const CreateChanal = ({ close }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState(''); 
    const [error, setError] = useState({}); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    const crtChanal = async () => {
        try {
            const res = await axios.post('https://localhost:7108/api/Admin/Kanal', {
                name: name,
                type: parseInt(type, 10) 
            });
            console.log("Channel Created:", res);
            if (res.status === 200) {
                close();
                window.location.reload();
            }
            close();
        } catch (error) {
            console.error('Error creating channel:', error.response?.data?.errors);
            setError(error.response?.data?.errors || {});
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Create Channel</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="channel-name">Channel Name</label>
                            <input 
                                type="text" 
                                id="channel-name" 
                                placeholder="Enter Channel Name" 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <span className={`errors ${error?.Name?.[0] ? 'visible' : ''}`}>
                                {error?.Name?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label htmlFor="status">Conclusion</label>
                            <select 
                                id="status" 
                                onChange={(e) => setType(e.target.value)} 
                            >
                                <option value="">Select Option</option>
                                <option value="0">Debitor</option>
                                <option value="1">Call Center</option>
                                <option value="2" disabled>Yoneltdirme</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>Cancel</button>
                    <button className="submit-btn" onClick={crtChanal}>Submit</button>
                </div>
            </div>
        </section>
    );
};

export default CreateChanal;

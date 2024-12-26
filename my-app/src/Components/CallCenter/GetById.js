import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetById = ({ close, callId }) => {
    const [data, setData] = useState('')

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchCallData = async () => {
            try {
                const response = await axios.get(`https://localhost:7108/api/CallCenter/${callId}`);
                setData(response.data.data)
                console.log(response.data.data)
            } catch (error) {
                console.error('Error GetById call:', error);
            }
        };

        fetchCallData();
    }, [callId]);

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>{data.fullName}</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">
                    
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="voen">VÖEN</label>
                            <input type="text" id="voen" disabled value={data.voen}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="permission-start-date">Application Type</label>
                            <input type="text" id="permissionStartDate" disabled value={data.applicationType}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="permission-start-date">Create At</label>
                            <input type="date-time" disabled id="permissionStartDate" value={data.createAt}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="address">Phone</label>
                            <input type="text" disabled id="address" value={data.phone}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="address">Region</label>
                            <input type="text" disabled id="address" value={data.region}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="phone">Short Content</label>
                            <input type="text" disabled id="phone" value={data.shortContent}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="address">Forwarding</label>
                            <input type="text" disabled id="address" value={data.forwarding}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="address">Excluded By Name</label>
                            <input type="text" disabled id="address" value={data.excludedByName}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="phone">Conclusion</label>
                            <input type="text" disabled id="phone" value={data.conclusion}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="address">fullName</label>
                            <input type="text" disabled id="address" value={data.fullName}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="phone">forwardingTo</label>
                            <input type="text" disabled id="phone" value={data.forwardTo}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="phone">Department</label>
                            <input type="text" disabled id="phone" value={data.department}/>
                        </div>
                    </div>
                    
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="phone">Details Content</label>
                            <textarea type="text" disabled id="phone" value={data.detailsContent}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="phone">Details Content</label>
                            <textarea type="text" disabled id="phone" value={data.addition}/>
                        </div>
                    </div>


                </div>



                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>
                        Cancel
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GetById;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCall = ({ close, callId }) => {
    const [status, setStatus] = useState('');
    const [subject, setSubject] = useState('');
    const [legalName, setLegalName] = useState('');
    const [voen, setVoen] = useState('');
    const [permissionStartDate, setPermissionStartDate] = useState('');
    const [permissionEndDate, setPermissionEndDate] = useState('');

    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const [district, setDistrict] = useState('')

    const [error, setError] = useState({}); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchCallData = async () => {
            try {
                const response = await axios.get(`https://localhost:7108/api/Call/${callId}`);
                const data = response.data.data;
                console.log(response.data.data)
                if (data) {
                    setStatus(data.status);
                    setSubject(data.subject );
                    setLegalName(data.legalName);
                    setVoen(data.voen);
                    setPermissionStartDate(data.permissionStartDate);
                    setInvoiceNumber(data.invoiceNumber);
                    setStreet(data.street);
                    setPhone(data.phone);
                    setDistrict(data.district);
                    setPermissionEndDate(data.permissionEndDate);
                }
            } catch (error) {
                console.error('Error GetById call in EditCall:', error);
                setError(error.response.data.errors);
            }
        };

        fetchCallData();
    }, [callId]);

    const handleSubmit = async () => {
        try {
            const dataToSend = {
                status,
                kanalId: parseInt(callId),
                subject,
                legalName,
                voen,
                permissionStartDate,
                permissionEndDate,
                invoiceNumber,
                street,
                phone,
            };

            const response = await axios.put(`https://localhost:7108/api/Admin/Call/${callId}`, dataToSend);
            if (response.data.success === true) {
                window.location.reload();
                close();
            }
        } catch (error) {
            console.error('Error updating call:', error.response ? error.response.data.errors : error.message);
            setError(error.response.data.errors)
        }
    };


    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Edit Call</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="legal-name">Hüquqi adı</label>
                            <input type="text" id="legalName" value={legalName} onChange={(e) => setLegalName(e.target.value)}/>
                            <span className={`errors ${error?.LegalName?.[0] ? 'visible' : ''}`}>
                                {error?.LegalName?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label htmlFor="entrepreneur-name">Mövzu</label>
                            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                            <span className={`errors ${error?.EntrepreneurName?.[0] ? 'visible' : ''}`}>
                                {error?.EntrepreneurName?.[0]}
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="permission-number">İcazə nömrəsi</label>
                            <input type="text" id="permissionNumber" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)}/>
                            <span className={`errors ${error?.invoiceNumber?.[0] ? 'visible' : ''}`}>
                                {error?.PermissionNumber?.[0]}
                            </span>
                        </div>
                        
                        <div className="input-half">
                            <label htmlFor="voen">VÖEN</label>
                            <input type="text" id="voen" value={voen} onChange={(e) => setVoen(e.target.value)}/>
                            <span className={`errors ${error?.VOEN?.[0] ? 'visible' : ''}`}>
                                {error?.VOEN?.[0]}
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="permission-start-date">İcazənin başlanma tarixi</label>
                            <input type="date" id="permissionStartDate" value={permissionStartDate} onChange={(e) => setPermissionStartDate(e.target.value)}/>
                            <span className={`errors ${error?.PermissionStartDate?.[0] ? 'visible' : ''}`}>
                                {error?.PermissionStartDate?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label htmlFor="permission-start-date">İcazənin bitmə tarixi</label>
                            <input type="date" id="permissionEndDate" value={permissionEndDate} onChange={(e) => setPermissionStartDate(e.target.value)}/>
                            <span className={`errors ${error?.permissionEndDate?.[0] ? 'visible' : ''}`}>
                                {error?.PermissionStartDate?.[0]}
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="address">Kücə</label>
                            <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)}/>
                            <span className={`errors ${error?.Address?.[0] ? 'visible' : ''}`}>
                                {error?.Address?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label htmlFor="address">Rayon</label>
                            <input type="text" id="district" value={district} onChange={(e) => setDistrict(e.target.value)}/>
                            <span className={`errors ${error?.Address?.[0] ? 'visible' : ''}`}>
                                {error?.Address?.[0]}
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="phone">Əlaqə nömrəsi</label>
                            <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            <span className={`errors ${error?.Phone?.[0] ? 'visible' : ''}`}>
                                {error?.Phone?.[0]}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>
                        Cancel
                    </button>
                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EditCall;

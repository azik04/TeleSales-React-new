import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetById = ({ close, callId }) => {
    const [data, setData] = useState('')

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchCallData = async () => {
            try {
                const response = await axios.get(`https://localhost:7108/api/Call/${callId}`);
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
                    <h3>{data.subject}</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="legal-name">Hüquqi adı</label>
                            <input type="text" id="legalName" disabled value={data.legalName}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="entrepreneur-name">Mövzu</label>
                            <input type="text" id="entrepreneurName" disabled value={data.subject}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="permission-number">İcazə nömrəsi</label>
                            <input type="text" id="permissionNumber" disabled value={data.invoiceNumber}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="voen">VÖEN</label>
                            <input type="text" id="voen" disabled value={data.voen}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="permission-start-date">İcazənin başlanma tarixi</label>
                            <input type="date" id="permissionStartDate" disabled value={data.permissionStartDate}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="permission-start-date">İcazənin bitmə tarixi</label>
                            <input type="date" disabled id="permissionStartDate" value={data.permissionEndDate}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="address">Kücə</label>
                            <input type="text" disabled id="address" value={data.street}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="address">Rayon</label>
                            <input type="text" disabled id="address" value={data.district}/>
                        </div>
                        <div className="input-half">
                            <label htmlFor="phone">Total Debt</label>
                            <input type="text" disabled id="phone" value={data.totalDebt}/>
                        </div>
                    </div>
                    <div className="input-group">
                        
                    </div>
                    
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="phone">Əlaqə nömrəsi</label>
                            <input type="text" disabled id="phone" value={data.phone}/>
                        </div>
                    </div>


                    <div className='input-payments'>
                        <div className='input-payments-top'>
                            <div className='input-payments-top-one'>
                                <p>2018</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2019</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2020</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2021</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2022</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2023</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-January</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-February</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-March</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-April</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-May</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-June</p>
                            </div><div className='input-payments-top-one'>
                                <p>2024-July</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-August</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-September</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-October</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-November</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2024-December</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2025-January</p>
                            </div>
                            <div className='input-payments-top-one'>
                                <p>2025-February</p>
                            </div>     
                        </div>
                        <div className='input-payments-top'>
                            <div className='input-payments-top-one'>
                            <p>{data.year2018 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.year2019 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.year2020 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.year2021 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.year2022 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.year2023 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month1_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month2_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month3_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month4_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month5_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month6_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month7_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month8_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month9_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month10_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month11_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month12_2024 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month1_2025 || "-"}</p>
                            </div>
                            <div className='input-payments-top-one'>
                            <p>{data.month2_2025 || "-"}</p>
                            </div>     
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

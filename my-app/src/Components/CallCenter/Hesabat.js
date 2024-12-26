import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const Hesabat = ({ close }) => {

    const { channelId } = useParams();
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;


    const fetchExcel = async () => {
        try {
            const response = await axios.get(`https://localhost:7108/api/CallCenter/ExportExcel?kanalId=${channelId}`, {
                responseType: 'blob',
            });

            const link = document.createElement('a');
            const url = window.URL.createObjectURL(new Blob([response.data]));
            link.href = url;
            link.setAttribute('download', 'report.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.location.reload()
        } catch (error) {
            console.error("Error downloading Excel:", error);
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container-rem">
                <div className="popup-header">
                    <h3>Hesabat</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="hesabat">
                    
                    <button onClick={fetchExcel}>
                        <i className="fa-solid fa-file-excel"></i>
                        <p>as Excel</p>
                    </button>
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>Close</button>
                </div>
            </div>
        </section>
    );
};

export default Hesabat;

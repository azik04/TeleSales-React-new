import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreateCall = ({ close }) => {
    const { channelId } = useParams();
    const [excelFile, setExcelFile] = useState(null)

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    const handleSubmit = async() =>{
        const formData = new FormData();
        formData.append('file', excelFile);
        try {
            const response = await axios.post(`https://localhost:7108/api/Admin/Call/import?kanalId=${channelId}`, formData, {
                headers: {'Content-Type': 'multipart/form-data',},});
                if (response.data.success === true) {
                    window.location.reload();
                    close();
                }
            } catch (error) {
                console.error('Error uploading Excel file:', error.response ? error.response.data : error.message);
            }
    
        }     
    return (
        <section className="popup-overlay">
            <div class="popup-container-rem">
                <div className="popup-header">
                    <h3>Create Call</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">    
                    <div className="input-group">
                        <div className="input-half">
                            <input type="file" id="excel-file" accept=".xlsx, .xls" onChange={(e) => setExcelFile(e.target.files[0])}/>
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

export default CreateCall;

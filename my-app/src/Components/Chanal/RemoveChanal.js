import React from 'react';
import axios from 'axios';

const RemoveChanal = ({ close, id }) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    const removeChannel = async () => {
        try {
            const res = await axios.delete(`https://localhost:7108/api/Admin/Kanal/${id}`);
            console.log("Channel Removed:", res);
            window.location.reload();
            close();  
        } catch (error) {
            console.error("Error deleting channel:", error);
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container-rem">
                <div className="popup-header">
                    <h3>Remove Channel</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">
                    <p>Are you sure you want to delete this channel?</p>
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>No</button>
                    <button className="submit-btn" onClick={removeChannel}>Yes</button>
                </div>
            </div>
        </section>
    );
};

export default RemoveChanal;

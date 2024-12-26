import axios from 'axios';
import React from 'react';
const RemoveCallCenter = ({ close, callId }) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    const remCall = async() => {
        console.log(callId)
        const res = await axios.delete(`https://localhost:7108/api/Admin/CallCenter/${callId}`)
        console.log("Remove Call" , res)
        if(res.status == 200){
            close()
            window.location.reload()
        }
    }
    return (
        <section class="popup-overlay">
            <div class="popup-container-rem">
                <div class="popup-header">
                    <h3>Remove Call</h3>
                    <i class="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div class="popup-content">
                    <p>Are you sure you want to delete this call?</p>
                </div>
                <div class="popup-footer">
                    <button class="cancel-btn" onClick={close}>No</button>
                    <button class="submit-btn" onClick={remCall}>Yes</button>
                </div>
            </div>
        </section>
    )
};

export default RemoveCallCenter;
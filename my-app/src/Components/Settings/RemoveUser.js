import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RemoveUser = ({ close, id }) => {
    const navigate = useNavigate(); 

    const removeUser = async () => {
        try {
            const res = await axios.delete(`https://localhost:7108/api/User/${id}`);
            console.log('User Removed:', res);
            if (res.status == 200) {
                localStorage.removeItem("JWT")
                navigate("/Auth")
                close();
            }
        } 
        catch (error) {
            console.error('Error deleting user:', error);
        }
  };

  return (
    <section className="popup-overlay">
      <div className="popup-container-rem">
        <div className="popup-header">
          <h3>Remove User</h3>
          <i className="fa-solid fa-xmark" onClick={close}></i>
        </div>
        <div className="popup-content">
          <p>Are you sure you want to delete this user?</p>
        </div>
        <div className="popup-footer">
          <button className="cancel-btn" onClick={close}>No</button>
          <button className="submit-btn" onClick={removeUser}>Yes</button>
        </div>
      </div>
    </section>
  );
};

export default RemoveUser;

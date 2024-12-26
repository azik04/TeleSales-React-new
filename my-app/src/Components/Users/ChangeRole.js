import React, { useState } from 'react';
import axios from 'axios';

const ChangeRole = ({ close, id }) => {
  const [role, setRole] = useState(''); // Start with an empty string

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

  const changeUserRole = async () => {
    try {
      // Parse the role, default to 0 if the value is invalid
      const data = role !== '' ? parseInt(role, 10) : 0;
      
      // If it's still NaN, consider it invalid and exit
      if (isNaN(data)) {
        console.error('Invalid role value');
        return;
      }

      console.log('Changing role to:', data);
      const res = await axios.put(`https://localhost:7108/api/Admin/User/${id}/Role?role=${data}`);
      console.log('User role changed:', res.data);
      window.location.reload();
      close();
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  return (
    <section className="popup-overlay">
      <div className="popup-container-rem">
        <div className="popup-header">
          <h3>Change Role</h3>
          <i className="fa-solid fa-xmark" onClick={close}></i>
        </div>
        <div className="popup-content">
          <p>Are you sure you want to change this user's role?</p>
          <label>Region</label>
          <select
            id="Region"
            onChange={(e) => {
              console.log('Selected value:', e.target.value); // Debugging
              setRole(e.target.value); // Set the role as string
            }}
          >
            <option value="">Select a role</option> {/* Default empty option */}
            <option value="0">Operator</option>
            <option value="1">Baş Operator</option>
            <option value="3">Viewer</option>
            <option value="2">Admin</option>
          </select>
        </div>
        <div className="popup-footer">
          <button className="cancel-btn" onClick={close}>No</button>
          <button className="submit-btn" onClick={changeUserRole}>Yes</button>
        </div>
      </div>
    </section>
  );
};

export default ChangeRole;

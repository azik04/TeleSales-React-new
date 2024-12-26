import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RemoveUser from './RemoveUser';
import EditUser from './EditUser';
import ChangeRole from './ChangeRole';

const Viewer = () => {
  const [users, setUsers] = useState([]);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showChangeRolePopup, setShowChangeRolePopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://localhost:7108/api/Admin/User/Viewer');
        console.log(res)
        setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRemove = (id) => {
    setSelectedUserId(id);
    setShowRemovePopup(true);
  };

  const handleEdit = (id) => {
    setSelectedUserId(id);
    setShowEditPopup(true);
  };

  const handleChangeRole = (id) => {
    setSelectedUserId(id);
    setShowChangeRolePopup(true);
  };

  return (
    <>
      <div className="content__table">
        <div className="table__header">
          <div className="table__search">
            <p>Viewer</p>
          </div>
        </div>

        <div className="table__types">
        </div>

        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              <th className="table__cell table__cell--id">#</th>
              <th className="table__cell">Full Name</th>
              <th className="table__cell">Email</th>
              <th className="table__cell">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {users.map(user => (
              <tr className="table__row" key={user.id}>
                <td className="table__cell table__cell--id"><p>{user.id}</p></td>
                <td className="table__cell"><p>{user.fullName}</p></td>
                <td className="table__cell"><p>{user.email}</p></td>
                <td className="table__cell">
                  <div className="table__actions">
                    <button className="table__action table__action--adminedit" onClick={() => handleEdit(user.id)}>
                      <i className="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button className="table__action table__action--adminremove" onClick={() => handleRemove(user.id)}>
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                    <button className="table__action table__action--role" onClick={() => handleChangeRole(user.id)}>
                      <i className="fa-solid fa-ticket"></i> Change Role
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popups */}
      {showRemovePopup && <RemoveUser close={() => setShowRemovePopup(false)} id={selectedUserId} />}
      {showEditPopup && <EditUser close={() => setShowEditPopup(false)} userId={selectedUserId} />}
      {showChangeRolePopup && <ChangeRole close={() => setShowChangeRolePopup(false)} id={selectedUserId} />}
    </>
  );
};

export default Viewer;

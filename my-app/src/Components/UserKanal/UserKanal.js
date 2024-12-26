import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateUserKanal from "./CreateUserKanal";
import RemoveUserKanal from "./RemoveUserKanal";

const UserKanal = ({ close, id }) => {
    const [userTask, setUserTask] = useState([]);
    const [showCreateUserKanal, setShowCreateUserKanal] = useState(false);
    const [showRemoveUserKanal, setShowRemoveUserKanal] = useState(false);
    const [userToRemove, setUserToRemove] = useState(null); 

    useEffect(() => {
        const fetchUserKanal = async () => {
            try {
                const res = await axios.get(`https://localhost:7108/api/Admin/UserKanal/ByKanal?kanalId=${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
                });
                console.log("Fetch Users in Channel", res.data.data);
                setUserTask(res.data.data || []);
            } catch (error) {
                console.error("Error fetching users for channel:", error);
            }
        };

        fetchUserKanal();
    }, [id]);

    const handleRemoveUser = (userId) => {
        console.log("User ID to remove:", userId); 
        setUserToRemove(userId);
        setShowRemoveUserKanal(true);
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Channel Settings</h3>
                    <i className="fa-solid fa-xmark close-icon" onClick={close}></i>
                </div>
                <div className="popup-user-header">
                    <h4>Users in Channel</h4>
                    <button className="add-btn" onClick={() => setShowCreateUserKanal(true)}>Add To Channel</button>
                </div>
                <div className="popup-users">
                    <div className="popup-users-main header">
                        <p>User Name</p>
                        <p>User Email</p>
                        <p>Actions</p>
                    </div>
                    {userTask.map((user, index) => (
                        <div key={index} className="popup-users-main">
                            <p>{user.fullName}</p>
                            <p>{user.email}</p>
                            <button 
                                className="remove-btn"
                                onClick={() => handleRemoveUser(user.id)} 
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>Close</button>
                </div>
            </div>

            {showCreateUserKanal && (
                <CreateUserKanal
                    close={() => setShowCreateUserKanal(false)}
                    kanalId={id}
                />
            )}

{showRemoveUserKanal && userToRemove && (
    <RemoveUserKanal
        close={() => setShowRemoveUserKanal(false)}
        userId={userToRemove} 
        kanalId={id} 
    />
)}
        </section>
    );
};

export default UserKanal;

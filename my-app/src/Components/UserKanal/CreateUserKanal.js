import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateUserKanal = ({ close, kanalId }) => {
    const [userId, setUserId] = useState("");
    const [data, setData] = useState([]);

    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://localhost:7108/api/Admin/User");
                console.log(res.data.data)
                setData(res.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const addToChannel = async () => {
        if (!userId) {
            console.error("No user selected");
            return;
        }
        try {
            const res = await axios.post(`https://localhost:7108/api/Admin/UserKanal`, {
                kanalId : kanalId,
                userId : userId,
            });
            console.log("User added to channel:", res);
            window.location.reload();
            close();
        } catch (error) {
            console.error("Error adding user to channel:", error);
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container-rem">
                <div className="popup-header">
                    <h3>Add User to Channel</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">
                    <select onChange={(e) => setUserId(e.target.value)} value={userId}>
                        <option value="">Select a User</option>
                        {data.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>
                        Cancel
                    </button>
                    <button className="submit-btn" onClick={addToChannel}>
                        Add
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreateUserKanal;

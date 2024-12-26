import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom";

const KanalUser = () => {
    const [taskUser, setTaskUser] = useState([]);
    const [userId, setUserId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("JWT");
        if (userToken) {
            const decodedToken = jwtDecode(userToken);
            setUserId(decodedToken.unique_name);
        }

        const fetchUserKanal = async () => {
            try {
                const res = await axios.get(`https://localhost:7108/api/UserKanal/ByUser?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
                });
                console.log("Fetch Users in Channel", res.data.data);
                setTaskUser(res.data.data || []);
            } catch (error) {
                console.error("Error fetching users for channel:", error);
            }
        };

        if (userId) {
            fetchUserKanal();
        }
    }, [userId]);

    const handleNavigation = (channel) => {
        console.log(channel)
        if (channel.type === "Debitor") {
            navigate(`/Channel/${channel.id}/Calls/Mine`);
        } else if (channel.type === "CallCenter") {
            navigate(`/Channel/${channel.id}/CallCenter/Mine`);
        }
    };

    const isActive = (channelId) => location.pathname.includes(`/Channel/${channelId}`);

    return (
        <div className="sidebar__channels">
            <div className="sidebar__channels-header">
                <p>Channels</p>
            </div>

            {taskUser.map((channel) => (
                <div
                    key={channel.id}
                    className="sidebar__menu-item-wrapper"
                    onClick={() => handleNavigation(channel)}
                >
                    <div
                        className={`sidebar__menu-item ${isActive(channel.id) ? 'active' : ''}`}
                    >
                        <div className="sidebar__menu-item-one">
                            <i className="fa-solid fa-phone-volume"></i>
                            <p>{channel.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanalUser;

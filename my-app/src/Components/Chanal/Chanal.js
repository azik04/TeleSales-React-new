import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CreateChanal from './CreateChanal';
import RemoveChanal from './RemoveChanal';
import {jwtDecode} from 'jwt-decode';
import UserKanal from '../UserKanal/UserKanal';
import EditChanal from './EditChanal';

const Chanal = () => {
    const [data, setData] = useState([]);
    const [isUserKanalOpen, setIsUserKanalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [channelToRemove, setChannelToRemove] = useState(null);
    const [activeGearChannel, setActiveGearChannel] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditChanalOpen, setIsEditChanalOpen] = useState(false);
    const [channelToEdit, setChannelToEdit] = useState(null);

    const [isCreateChanalOpen, setIsCreateChanalOpen] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem("JWT");
        if (!userToken) {
            navigate('/login'); 
        } else {
            try {
                const decodedToken = jwtDecode(userToken);
                console.log('Decoded token:', decodedToken); 
                if (decodedToken.role === "Admin" || decodedToken.role === "Viewer") {
                    setIsAdmin(true);
                }
                   else {
                    setIsAdmin(false); 
                }
            } catch (error) {
                console.error('Invalid token:', error);
                navigate('/login'); 
            }
        }
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7108/api/Kanal', {
                    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` }
                });
                setData(response.data.data || []);
            } catch (error) {
                console.error('Error fetching channels:', error);
                setData([]);
            }
        };

        fetchData();
    }, []);

    const handleChannelNavigation = (channel) => {
        console.log('Channel object received:', channel);
        
        if (channel.type === "Debitor") {
            if (isAdmin === true) {
                console.log('Navigating to admin Debitor route');
                navigate(`/Channel/${channel.id}/Calls/NotExcluded`);
            } else if(isAdmin === false) {
                console.log('Navigating to non-admin Debitor route');
                navigate(`/Channel/${channel.id}/Calls/Mine`);
            }
        } else if (channel.type === "CallCenter") {
            if (isAdmin) {
                console.log('Navigating to admin CallCenter route');
                navigate(`/Channel/${channel.id}/CallCenter`);
            } else {
                console.log('Navigating to non-admin CallCenter route');
                navigate(`/Channel/${channel.id}/CallCenter/Mine`);
            }
        } else {
            console.error('Unknown channel type:', channel.type);
        }
    };
    

    return (
        <div className="sidebar__channels">
            <div className="sidebar__channels-header">
                <p>Channels Admin</p>
                {isAdmin && (
                    <button className="sidebar__add-channel-btn" onClick={() => setIsCreateChanalOpen(true)}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                )}
            </div>

            {data.map((channel) => (
                <div key={channel.id} className="sidebar__menu-item-wrapper">
                    <div
                        className={`sidebar__menu-item ${location.pathname.includes(`/Channel/${channel.id}`) ? 'active' : ''}`}
                        onClick={() => handleChannelNavigation(channel)}
                    >
                        <div className="sidebar__menu-item-one">
                            <i className="fa-solid fa-phone-volume"></i>
                            <p>{channel.name}</p>
                        </div>
                        <div className="sidebar__menu-item-one">
                            {isAdmin && (
                                <i
                                    className={`fa-solid fa-gear ${activeGearChannel === channel.id ? 'gear-spin' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveGearChannel(prev => (prev === channel.id ? null : channel.id));
                                    }}
                                ></i>
                            )}
                        </div>
                    </div>
                    {activeGearChannel === channel.id && (
                        <div className="gear-div">
                            <button className="gear-div__button" onClick={(e) => { e.stopPropagation(); setIsRemoveModalOpen(true); setChannelToRemove(channel.id); }}>Remove Channel</button>
                            <button className="gear-div__button" onClick={(e) => { e.stopPropagation(); setIsUserKanalOpen(true); setChannelToRemove(channel.id); }}>Channel Settings</button>
                            <button className="gear-div__button" onClick={(e) => { e.stopPropagation(); setIsEditChanalOpen(true); setChannelToEdit(channel.id); }}>Channel Priority</button>
                        </div>
                    )}
                </div>
            ))}

            {isCreateChanalOpen && <CreateChanal close={() => setIsCreateChanalOpen(false)} />}
            {isUserKanalOpen && <UserKanal close={() => setIsUserKanalOpen(false)} id={channelToRemove} />}
            {isRemoveModalOpen && <RemoveChanal close={() => setIsRemoveModalOpen(false)} id={channelToRemove} />}
            {isEditChanalOpen && <EditChanal close={() => setIsEditChanalOpen(false)} kanalId={channelToEdit} />}
        </div>
    );
};

export default Chanal;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Chanal from '../Chanal/Chanal';
import KanalsUser from "../UserKanal/KanalsUser";
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem("JWT");
        const decodedToken = jwtDecode(userToken);
        if (decodedToken.role === "Admin" || decodedToken.role === "Viewer") {
            setIsAdmin(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('JWT');
        navigate('/Auth');
    };

    const isActive = (path) => location.pathname === path; 


    return (
        <header className="sidebar">
            <div className="sidebar__menu">
                {isAdmin && (
                    <a
                        href="/Admin"
                        className={`sidebar__menu-item ${isActive('/Admin') ? 'active' : ''}`}
                    >
                        <div className="sidebar__menu-item-one">
                            <i className="fa-solid fa-users"></i>
                            <p>Admin</p>
                        </div>
                    </a>
                )}
                <a
                    href="/Settings"
                    className={`sidebar__menu-item ${isActive('/Settings') ? 'active' : ''}`}
                >
                    <div className="sidebar__menu-item-one">
                        <i className="fa-solid fa-gear"></i>
                        <p>Settings</p>
                    </div>
                </a>
                <button
                    className={`sidebar__menu-item ${isActive('/Auth') ? 'active' : ''}`}
                    onClick={handleLogout}
                >
                    <div className="sidebar__menu-item-one">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <p>Log Out</p>
                    </div>
                </button>
            </div>

            
            {isAdmin && <Chanal key={location.pathname} />}
            <KanalsUser />
        </header>
    );
};

export default Header;

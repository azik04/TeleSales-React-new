import React, { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate , Outlet } from 'react-router-dom';

const PrivateRotes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("JWT");

    if (!token) {
      navigate("/Auth");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const { exp } = decoded;

      const currentTime = Date.now() / 1000; 
      if (exp < currentTime) {
        localStorage.removeItem("JWT");
        navigate("/Auth");
        return;
      }

    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("JWT");
      navigate("/Auth");
    }
  }, [navigate]);

  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default PrivateRotes;

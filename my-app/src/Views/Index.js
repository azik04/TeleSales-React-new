import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const Home = () => {
  const [fullName, setFullName] = useState("");
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("JWT");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.unique_name;

          const response = await axios.get(`https://localhost:7108/api/User/${userId}`);
          setFullName(response.data.data.fullName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="content">
      <div className="index-page">
        <h3 className="index__heading">
          Welcome back, <span className="index__brand">{fullName}!</span>
        </h3>
      </div>
    </section>
  );
};

export default Home;

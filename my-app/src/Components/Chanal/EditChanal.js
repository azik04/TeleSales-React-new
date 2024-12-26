import React, { useEffect, useState } from "react";
import axios from "axios";

const EditChanal = ({ close, kanalId }) => {
    const [channel, setChannel] = useState(null);
    const [priority, setPriority] = useState("");
    const [name, setName] = useState("");

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchKanal = async () => {
            try {
                const res = await axios.get(`https://localhost:7108/api/Kanal/${kanalId}`);
                console.log("Fetched Channel", res.data.data);
                setChannel(res.data.data);

                // Convert priority string to corresponding value
                const priorityMap = { "Aşagı": "0", "Orta": "1", "Yuksək": "2", "Ekstra": "3" };
                setPriority(priorityMap[res.data.data.priority] || "0"); // Default to "0" if no match
                
                setName(res.data.data.name);
            } catch (error) {
                console.error("Error fetching channel:", error);
            }
        };

        fetchKanal();
    }, [kanalId]);

    const handlePriorityChange = async () => {
        try {
            console.log("Name", name);
            const res = await axios.put(
                `https://localhost:7108/api/Admin/Kanal/${kanalId}`,
                {
                    priority: parseInt(priority, 10), // Send numeric priority value
                    name: name,
                }
            );
            console.log("Priority updated successfully", res.data);
            close();
        } catch (error) {
            console.error("Error updating channel priority:", error);
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Channel Settings</h3>
                    <i className="fa-solid fa-xmark close-icon" onClick={close}></i>
                </div>
                <div className="popup-content">
                    {channel ? (
                        <>
                            <p>Channel Name: {channel.name}</p>
                            <label>
                                Priority:
                                <select
                                    value={priority} // Use the numeric priority value
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="0">Aşagı</option>
                                    <option value="1">Orta</option>
                                    <option value="2">Yuksək</option>
                                    <option value="3">Ekstra</option>
                                </select>
                            </label>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>No</button>
                    <button className="submit-btn" onClick={handlePriorityChange}>Yes</button>
                </div>
            </div>
        </section>
    );
};

export default EditChanal;

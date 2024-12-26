import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';

const RandomCallTabs = ({ close }) => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [userId, setUserId] = useState(null);
  const [note, setNote] = useState("");
  const [conclusion, setConclusion] = useState(0); 
  const [nextCall, setNextCall] = useState("");
  const [randomCall, setRandomCall] = useState(null);
  const [error, setError] = useState("");
  const [errorData, setErrorData] = useState("");

  const { channelId } = useParams();

  useEffect(() => {
    const userToken = localStorage.getItem("JWT");
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      setUserId(decodedToken.unique_name);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchRandomCalls = async () => {
        try {
          const response = await axios.get(`https://localhost:7108/api/Call/Random?kanalId=${channelId}`);
          setData(response.data.data);
          console.log(response.data.data)
        } catch (err) {
          console.error("Error fetching random calls:", err);
        }
      };
      fetchRandomCalls();
    }
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const formattedNextCall = nextCall ? new Date(nextCall).toISOString() : null;
      console.log(conclusion)
      console.log('Formatted Conclusion:', parseInt(conclusion, 10)); // Убедитесь, что это не NaN
      console.log(conclusion)
      const response = await axios.put(
        `https://localhost:7108/api/Call/Exclude/${randomCall.id}`,
        {
          excludedBy: userId,
          note,
          conclusion: parseInt(conclusion, 10),
          nextCall: formattedNextCall,
        }
      );
      if (response.status === 200) {
        close();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating call:', error.response?.data?.errors || error.message);
      console.error('Error creating call:', error.response|| error.message);

      setError(error.response?.data?.errors || {});
      setErrorData(error.response?.data || {})
  }
  };

  const handleConclusionChange = (e) => {
    const selectedConclusion = e.target.value;
    setConclusion(selectedConclusion);
    setRandomCall((prevState) => ({
      ...prevState,
      conclusion: selectedConclusion,
    }));
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    setRandomCall((prevState) => ({
      ...prevState,
      note: e.target.value,
    }));
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    setRandomCall(data[index]);
  };
  
  return (
    <section className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Random Calls</h3>
          <i className="fa-solid fa-xmark" onClick={close}></i>
        </div>
        <div className="popup-content">
          <div className="tabs">
            {data.map((call, index) => (
              <div
                key={call.id}
                className={`tab ${activeTab === index ? "active" : ""}`}
                onClick={() => handleTabClick(index)}
              >
                {call.subject}
              </div>
            ))}
          </div>

          <div className="tab-content">
            {data.length > 0 && randomCall && (
              <>
                <div className="input-group">
                  <div className="input-half">
                    <label htmlFor="legal-name">Hüquqi adı</label>
                    <input type="text" id="legalName" disabled value={randomCall.legalName} />
                  </div>
                  <div className="input-half">
                    <label htmlFor="entrepreneur-name">Mövzu</label>
                    <input type="text" id="entrepreneurName" disabled value={randomCall.subject} />
                  </div>
                  <div className="input-half">
                    <label htmlFor="permission-number">İcazə nömrəsi</label>
                    <input type="text" id="permissionNumber" disabled value={randomCall.invoiceNumber} />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-half">
                    <label htmlFor="voen">VÖEN</label>
                    <input type="text" id="voen" disabled value={randomCall.voen} />
                  </div>
                  <div className="input-half">
                    <label htmlFor="permission-start-date">İcazənin başlanma tarixi</label>
                    <input type="date" id="permissionStartDate" disabled value={randomCall.permissionStartDate} />
                  </div>
                  <div className="input-half">
                    <label htmlFor="permission-end-date">İcazənin bitmə tarixi</label>
                    <input type="date" id="permissionEndDate" disabled value={randomCall.permissionEndDate} />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-half">
                    <label htmlFor="voen">Rayon</label>
                    <input type="text" id="voen" disabled value={randomCall.district} />
                  </div>
                  <div className="input-half">
                    <label htmlFor="permission-start-date">Adress</label>
                    <input type="text" id="permissionStartDate" disabled value={randomCall.street} />
                  </div>
                  <div className="input-half">
                    <label htmlFor="permission-end-date">Total Debt</label>
                    <input type="text" id="permissionEndDate" disabled value={randomCall.totalDebt} />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-half">
                    <label htmlFor="status">Status</label>
                    <input type="text" id="permissionEndDate" disabled value={randomCall.status} />
                  </div>
                  <div className="input-half">
                    <label htmlFor="status">Status</label>
                    <input type="text" id="permissionEndDate" disabled value={randomCall.conclusion} />
                  </div>
                  <div className="input-half">
                    <label htmlFor="status">Conclusion</label>
                    <select value={conclusion} onChange={(e) => setConclusion(Number(e.target.value))}>
                      <option value="" disabled>Select Option</option>
                      <option value={0}>Razılaşdı</option>
                      <option value={1}>Imtina Etdi</option>
                      <option value={2}>Nömrə Səhvdir</option>
                      <option value={3}>Zəng Çatmır</option>
                      <option value={4}>Yenidən Zəng</option>
                    </select>
                    <span className={`errors ${error?.Conclusion?.[0] ? 'visible' : ''}`}>
                      {error?.LastName?.[0]}
                    </span>
                  </div>
                  {conclusion === 4 && (
                    <div className="input-half">
                      <label htmlFor="next-call">Next Call</label>
                      <input type="datetime-local" id="next-call" value={nextCall} onChange={(e) => setNextCall(e.target.value)} />
                      <span className={`errors ${error?.NextCall?.[0] ? 'visible' : ''}`}>
                        {error?.NextCall?.[0]}
                      </span>
                    </div>
                    
                )}
                </div>
                <div className="input-group">
                  <div className="input-half">
                    <label htmlFor="contact-details">Əlaqə məlumatları</label>
                    <input type="text" id="contact-details" value={randomCall?.phone || ""} disabled />
                  </div> 
                </div>
                
                <div className="input-group">
                  <div className="input-half">
                    <label htmlFor="note">Qeyd</label>
                    <textarea id="note" value={note}  onChange={(e) => { setNote(e.target.value);  setRandomCall((prevState) => ({...prevState, note: e.target.value,}));}}></textarea>                      
                    <span className={`errors ${errorData ? 'visible' : ''}`}>
  {typeof errorData === "object" 
    ? JSON.stringify(errorData, null, 2) // Render the errorData as a JSON string if it's an object
    : errorData || "No errors occurred."}  {/* Display errorData or a default message if empty */}
</span>
                  </div>
                </div>
                <div className="input-payments">
                  <div className="input-payments-top">
                    {["2018", "2019", "2020", "2021", "2022", "2023", "2024-January", "2024-February", "2024-March", "2024-April", "2024-May", "2024-June", "2024-July", "2024-August", "2024-September", "2024-October", "2024-November", "2024-December", "2025-January", "2025-February"].map((year, idx) => (
                      <div className="input-payments-top-one" key={idx}><p>{year}</p></div>
                    ))}
                  </div>
                  <div className="input-payments-top">
                    {["year2018", "year2019", "year2020", "year2021", "year2022", "year2023", "month1_2024", "month2_2024", "month3_2024", "month4_2024", "month5_2024", "month6_2024", "month7_2024", "month8_2024", "month9_2024", "month10_2024", "month11_2024", "month12_2024", "month1_2025", "month2_2025"].map((year, idx) => (
                      <div className="input-payments-top-one" key={idx}><p>{randomCall[year] || "-"}</p></div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="popup-footer">
          <button className="cancel-btn" onClick={close}>Cancel</button>
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </section>
  );
};

export default RandomCallTabs;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const CreateCallCenter = ({ close }) => {
    const { channelId } = useParams();
    const [viewMode, setViewMode] = useState('manual');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [region, setRegion] = useState('');
    const [voen, setVoen] = useState('');
    const [phone, setPhone] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [shortContent, setShortContent] = useState('');
    const [detailsContent, setDetailsContent] = useState('');
    const [forwarding, setForwarding] = useState(false);
    const [administration, setAdministration] = useState('');
    const [department, setDepartment] = useState('');
    const [forwardTo, setForwardTo] = useState('');
    const [conclusion, setConclusion] = useState('');
    const [addition, setAddition] = useState('');
    const [excelFile, setExcelFile] = useState(null);
    const [userId, setUserId] = useState(null);
    
    const [error, setError] = useState({});
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('JWT')}`;

     useEffect(() => {
        const userToken = localStorage.getItem("JWT");
        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          setUserId(decodedToken.unique_name);
        }
      }, []);
    const handleSubmit = async () => {
        if (viewMode === 'manual') {
            try {
                const dataToSend = {
                    firstName,
                    kanalId: channelId ? parseInt(channelId, 10) : 0,
                    region: region ? parseInt(region, 10) : 0,
                    lastName,
                    applicationType: applicationType ? parseInt(applicationType, 10) : 0,
                    detailsContent,
                    shortContent,
                    forwarding,
                    administration: administration ? parseInt(administration, 10) : 0,
                    department: department ? parseInt(department, 10) : 0,
                    forwardTo: forwardTo,
                    conclusion,
                    addition,
                    voen : voen ? parseInt(voen) : 0,
                    excludedBy: userId,
                    phone
                };
                console.log(forwardTo)

                console.log(dataToSend)
                const response = await axios.post(`https://localhost:7108/api/CallCenter?kanalId=${channelId}`, dataToSend);
                if (response.data.success === true) {
                    window.location.reload();
                    close();
                }
            } catch (error) {
                console.error('Error creating call:', error.response?.data?.errors || error.message);
                console.error('Error creating call:', error.response|| error.message);

                setError(error.response?.data?.errors || {});
            }
        } else if (viewMode === 'excel') {
            if (excelFile) {
                const formData = new FormData();
                formData.append('file', excelFile);
                try {
                    const response = await axios.post(
                        `https://localhost:7108/api/Call/import?kanalId=${channelId}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
                    if (response.data.success === true) {
                        window.location.reload();
                        close();
                    }
                } catch (error) {
                    console.error('Error uploading Excel file:', error.response?.data || error.message);
                }
            } else {
                alert('Please upload an Excel file');
            }
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Create Call</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-actions">
                    <button className={viewMode === 'manual' ? 'active' : ''} onClick={() => setViewMode('manual')}>Manually</button>
                    <button className={viewMode === 'excel' ? 'active' : ''} onClick={() => setViewMode('excel')}>By Excel</button>
                </div>
                <div className="popup-content">
                    {viewMode === 'manual' ? (
                        <>
                            <div className="input-group">
                                <div className="input-half">
                                    <label>First Name</label>
                                    <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                                    <span className={`errors ${error?.FirstName?.[0] ? 'visible' : ''}`}>
                                        {error?.FirstName?.[0]}
                                    </span>
                                </div>
                                <div className="input-half">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                                    <span className={`errors ${error?.LastName?.[0] ? 'visible' : ''}`}>
                                        {error?.LastName?.[0]}
                                    </span>
                                </div>
                                <div className="input-half">
                                    <label>Region</label>
                                    <select id="Region" value={region} onChange={(e) => setRegion(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="0">Xetai</option>
                                        <option value="1">Nəsimi</option>
                                        <option value="2">Nərimanov</option>
                                    </select>
                                    <span className={`errors ${error?.Region?.[0] ? 'visible' : ''}`}>
                                        {error?.Region?.[0]}
                                    </span>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-half">
                                    <label>VOEN</label>
                                    <input type="number" placeholder="VOEN" onChange={(e) => setVoen(e.target.value)}/>
                                    <span className={`errors ${error?.VOEN?.[0] ? 'visible' : ''}`}>
                                        {error?.VOEN?.[0]}
                                    </span>
                                </div>
                                <div className="input-half">
                                    <label>Phone</label>
                                    <input type="text"  placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                                    <span className={`errors ${error?.Phone?.[0] ? 'visible' : ''}`}>
                                        {error?.Phone?.[0]}
                                    </span>
                                </div>
                                <div className="input-half">
                                    <label>Application Type</label>
                                    <select id="ApplicationType" onChange={(e) => setApplicationType(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="0">Məlumat</option>
                                        <option value="1">Müraciət</option>
                                        <option value="2">Şikayət Vətəndaş</option>
                                        <option value="3">Şikayət Sahibkar</option>
                                        <option value="4">Yönləndirmə</option>
                                        <option value="5">Təkrar Müraciət</option>
                                        <option value="6">Təkrar Şikayət</option>
                                    </select>
                                    <span className={`errors ${error?.ApplicationType?.[0] ? 'visible' : ''}`}>
                                        {error?.ApplicationType?.[0]}
                                    </span>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-half">
                                    <label>Short Content</label>
                                    <input type="text" placeholder="Short Content" onChange={(e) => setShortContent(e.target.value)}/>
                                    <span className={`errors ${error?.ShortContent?.[0] ? 'visible' : ''}`}>
                                        {error?.ShortContent?.[0]}
                                    </span>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-half">
                                    <label>Details Content</label>
                                    <textarea placeholder="Details Content" onChange={(e) => setDetailsContent(e.target.value)}  />
                                    <span className={`errors ${error?.DetailsContent?.[0] ? 'visible' : ''}`}>
                                        {error?.DetailsContent?.[0]}
                                    </span>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-half">
                                    <label>Conclusion</label>
                                    <textarea placeholder="Conclusion" onChange={(e) => setConclusion(e.target.value)}/>
                                    <span className={`errors ${error?.Conclusion?.[0] ? 'visible' : ''}`}>
                                        {error?.Conclusion?.[0]}
                                    </span>
                                </div>
                                <div className="input-half">
                                    <label>Addition</label>
                                    <textarea placeholder="Addition" onChange={(e) => setAddition(e.target.value)} />
                                    <span className={`errors ${error?.Addition?.[0] ? 'visible' : ''}`}>
                                        {error?.Addition?.[0]}
                                    </span>
                                </div>
                            </div>

                            <div className="input-group">
    <div className="input-half">
        <label>Forwarding</label>
        <input
            type="checkbox"
            checked={forwarding}
            onChange={(e) => setForwarding(e.target.checked)}
        />
    </div>
</div>

{forwarding && (
    <div className="input-group">
        <div className="input-half">
            <label>Administration</label>
            <select id="Departmen" onChange={(e) => setDepartment(e.target.value)}>
                                        <option value="" >Seçin</option>
                                        <option value="0">Reklam fəaliyyətinin tənzimlənməsi şöbəsi Aparat</option>
                                        <option value="1">Daxili nəzarət və audit şöbəsi Aparat</option>
                                        <option value="2">Hüquq şöbəsi Aparat</option>
                                        <option value="3">Media və kommunikasiya şöbəsi Aparat</option>
                                        <option value="4">Çağrı Mərkəzil Aparat</option>
                                        <option value="5">İnsan resursları və sənədlərlə iş şöbəsi Aparat</option>
                                        <option value="6">Maliyyə şöbəsi Aparat</option>
                                        <option value="7">İnformasiya texnologiyaları şöbəsi Aparat</option>
                                        <option value="8">Satın almalar və təminat şöbəsi Aparat</option>
                                        <option value="9">İxtisaslaşmış reklam yayıcılarıilə iş şöbəsi Aparat</option>
                                        <option value="10">Reklam layihələrinin tərtibi və estetik ekspertizası şöbəsi Aparat</option>
                                        <option value="11">Strateji planlaşdırma və təhlil şöbəsi Aparat</option>
                                        <option value="12">İcazə və razılaşdırma şöbəsi Bakı</option>
                                        <option value="13">Reklam fəaliyyətinin monitorinqi şöbəsi Bakı</option>
                                        <option value="14">Reklam fəaliyyətinin təhlili və estetik nəzarət şöbəsi Bakı</option>
                                        <option value="15">Reklam qurğularının quraşdırılması və sökülməsi şöbəsi Bakı</option>
                                        <option value="16">İnzibati işlər şöbəsi Bakı</option>
                                        <option value="17">İcazə və razılaşdırma şöbəsi Sumqayıt</option>
                                        <option value="18">Reklam fəaliyyətinin monitorinqi şöbəsi Sumqayıt</option>
                                        <option value="19">Ümumi işlər şöbəsi Sumqayıt</option>
                                    </select>
                                    <span className={`errors ${error?.Department?.[0] ? 'visible' : ''}`}>
                                        {error?.Department?.[0]}
                                    </span>
                                </div>
          
                                <div className="input-half">
                                    <label>Forward To</label>
                                    <input type="text" placeholder="Forward To" onChange={(e) => setForwardTo(e.target.value)}/>
                                </div>
                            </div>
                        )}
                         
                        </>
                    ) : (
                        <div className="input-group">
                            <label>Upload Excel File</label>
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={(e) => setExcelFile(e.target.files[0])}
                            />
                        </div>
                    )}
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>
                        Cancel
                    </button>
                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreateCallCenter;

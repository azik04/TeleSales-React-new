import React, { useEffect, useState } from 'react';
import CreateCall from './CreateCall';
import RemoveCall from './RemoveCall';
import Hesabat from './Hesabat';  
import EditCall from './EditCall';  
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Add Link import here
import { useNavigate, useLocation } from 'react-router-dom';

const Search = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCreateCall, setShowCreateCall] = useState(false);
  const [showRemoveCall, setShowRemoveCall] = useState(false);
  const [showRandomCall, setShowRandomCall] = useState(false);  
  const [showEditCall, setShowEditCall] = useState(false);  
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation()
  
  const [callId, setCallId] = useState(null); 
  const [userNames, setUserNames] = useState({}); // Store user names by userId
  const { channelId } = useParams();
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

  // Extract query from the URL
  const query = new URLSearchParams(location.search).get('query') || '';

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/Channel/${channelId}/Calls/Search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCreateCallClick = () => {
    setShowCreateCall(true);
  };

  const handleRemoveCallClick = () => {
    setShowRemoveCall(true);
  };

  const handleRandomCallClick = () => {
    setShowRandomCall(true);  
  };

  const handleEditCallClick = () => {
    setShowEditCall(true);  
  };

  const closeEditCall = () => {
    setShowEditCall(false);
  };

  const closeCreateCall = () => {
    setShowCreateCall(false);
  };

  const closeRemoveCall = () => {
    setShowRemoveCall(false);
  };

  const closeRandomCall = () => {
    setShowRandomCall(false);  
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    if (isNaN(date)) {
      console.error('Invalid date:', dateTimeString);
      return 'Invalid Date'; // Return a fallback value if the date is invalid
    }
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    return formattedDate.replace(',', '');
  };

  const fetchData = async (pageNumber, pageSize) => {
    try {
      const response = await axios.get(`https://localhost:7108/api/Call/Search?query=${encodeURIComponent(query)}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const result = response.data.data;
      setData(result.items || []);
      setHasNextPage(result.hasNextPage);
      setHasPreviousPage(result.hasPreviousPage);
      setTotalPages(Math.ceil(result.totalCount / pageSize));

      const userIds = result.items.map(item => item.userId);
      fetchUserNames(userIds);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  const fetchUserNames = async (userIds) => {
    try {
      const responses = await Promise.all(userIds.map(userId => axios.get(`https://localhost:7108/api/User/${userId}`)));
      console.log(responses)
      const users = responses.map(response => response.data.data);
      const userNames = users.reduce((acc, user) => {
        acc[user.id] = user.fullName; // Assuming the response contains `id` and `name`
        return acc;
      }, {});
      setUserNames(userNames);
    } catch (error) {
      console.error('Error fetching user names:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="content__table">
      <div className="table__header">
        <div className="table__search">
          <i className="table__search-icon fa-solid fa-magnifying-glass"></i>
            <input
            type="text"
            className="table__search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className='table__types'>
        <Link to={`/Channel/${channelId}/Calls/NotExcluded`}>Not Excluded</Link>
        <Link to={`/Channel/${channelId}/Calls/Excluded`}>Excluded</Link>
      </div>

      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            <th className="table__cell table__cell--id">#</th>
            <th className="table__cell">Hüquqi adı</th>
            <th className="table__cell">VÖEN</th>
            <th className="table__cell">Statusu</th>
            <th className="table__cell">Nömrəsi</th>
            <th className="table__cell">Başlanma tarixi</th>
            <th className="table__cell">Sahibkarın adı</th>
            <th className="table__cell">Ünvan</th>
            <th className="table__cell">Əlaqə məlumatları</th>
            <th className="table__cell">User</th>
            <td className="table__cell"><p>Conclusion</p></td>
            <td className="table__cell"><p>StatusUpdate</p></td>
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map(item => (
            <tr className="table__row" key={item.id}>
              <td className="table__cell table__cell--id"><p>{item.id}</p></td>
              <td className="table__cell"><p>{item.legalName}</p></td>
              <td className="table__cell"><p>{item.voen}</p></td>
              <td className="table__cell"><p>{item.status}</p></td>
              <td className="table__cell"><p>{item.permissionNumber}</p></td>
              <td className="table__cell"><p>{item.permissionStartDate}</p></td>
              <td className="table__cell"><p>{item.entrepreneurName}</p></td>
              <td className="table__cell"><p>{item.address}</p></td>
              <td className="table__cell"><p>{item.phone}</p></td>
              <td className="table__cell"><p>{userNames[item.userId]}</p></td>
              <td className="table__cell"><p>{item.conclusion}</p></td>

              <td className="table__cell">
                <p>{item.lastStatusUpdate ? formatDateTime(item.lastStatusUpdate) : 'No date available'}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table__footer">
        <div className="table__footer-info">
          <p>{(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, data.length)} of {totalPages * pageSize}</p>
        </div>

        <div className="table__pagination">
          <p className="table__pagination-rows">Rows per page:
            <button onClick={() => handlePageSizeChange(10)} className={pageSize === 10 ? 'active' : ''}>10</button>
            <button onClick={() => handlePageSizeChange(25)} className={pageSize === 25 ? 'active' : ''}>25</button>
            <button onClick={() => handlePageSizeChange(50)} className={pageSize === 50 ? 'active' : ''}>50</button>
            <button onClick={() => handlePageSizeChange(100)} className={pageSize === 100 ? 'active' : ''}>100</button>
          </p>

          <button disabled={!hasPreviousPage} onClick={handlePreviousPage} className="table__pagination-button">
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button disabled={!hasNextPage} onClick={handleNextPage} className="table__pagination-button">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>

      {showCreateCall && <CreateCall close={closeCreateCall} />}
      {showRemoveCall && <RemoveCall close={closeRemoveCall} />}
      {showRandomCall && <Hesabat close={closeRandomCall} />}
      {showEditCall && <EditCall close={closeEditCall} />}
    </div>
  );
};

export default Search;

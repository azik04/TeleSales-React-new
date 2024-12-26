import React, { useEffect, useState } from 'react';
import CreateCall from './CreateCallCenter';
import RemoveCall from './RandomCall';
import RandomCall from './RemoveCallCenter';  
import GetById from './GetById';
import EditCall from './EditCallCenter';  
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const CallCenterMine = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCreateCall, setShowCreateCall] = useState(false);
  const [showRemoveCall, setShowRemoveCall] = useState(false);
  const [showRandomCall, setShowRandomCall] = useState(false);  
  const [showGetById, setShowGetById] = useState(false);
  const [showEditCall, setShowEditCall] = useState(false);  
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const [callId, setCallId] = useState(null); 
  const { channelId } = useParams();

  const [isAdmin, setIsAdmin] = useState(false);
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

 
   useEffect(() => {
     const userToken = localStorage.getItem("JWT");
     if (userToken) {
       const decodedToken = jwtDecode(userToken);
       setUserId(decodedToken.unique_name);
     }
     if (userToken.role === "BaşOperator") {
        setIsAdmin(true)
      }
   }, []);


    useEffect(() => {
    const fetchData = async (pageNumber, pageSize) => {
      try {
        const response = await axios.get(`https://localhost:7108/api/CallCenter/User/${userId}/Kanal/${channelId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);

        const result = response.data.data;
        setData(result.items || []);
        setHasNextPage(result.hasNextPage);
        setHasPreviousPage(result.hasPreviousPage);
        setTotalPages(Math.ceil(result.totalCount / pageSize));
      } catch (error) {
        console.error('Error fetching channel data:', error);
        setData([]);
      }
    };
  
    if (userId) fetchData(currentPage, pageSize);
  }, [userId, currentPage, pageSize]);

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
            <p>Call Center</p>
        </div>
        {!isAdmin && (

        <div className="table__actions">
          <button className="table__action table__action--create" onClick={() => setShowCreateCall(true)}>
            <i className="fa-solid fa-plus"></i> New Call
          </button>
        </div>
      )}
      </div>

      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            <th className="table__cell table__cell--id">#</th>
            <th className="table__cell">fullName</th>
            <th className="table__cell">VÖEN</th>
            <th className="table__cell">applicationType</th>
            <th className="table__cell">region</th>
            <th className="table__cell">phone</th>
            <th className="table__cell">shortContent</th>
            <th className="table__cell">excludedByName</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map(item => (
            <tr className="table__row" key={item.id} onClick={() => {
              setCallId(item.id);
              setShowGetById(true);
            }}>
              <td className="table__cell table__cell--id"><p>{item.id}</p></td>
              <td className="table__cell"><p>{item.fullName}</p></td>
              <td className="table__cell"><p>{item.voen}</p></td>
              <td className="table__cell"><p>{item.applicationType}</p></td>
              <td className="table__cell"><p>{item.region}</p></td>
              <td className="table__cell"><p>{item.phone}</p></td>
              <td className="table__cell"><p>{item.shortContent}</p></td>
              <td className="table__cell"><p>{item.excludedByName}</p></td>
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
            <button onClick={() => handlePageSizeChange(15)} className={pageSize === 15 ? 'active' : ''}>15</button>
            <button onClick={() => handlePageSizeChange(25)} className={pageSize === 25 ? 'active' : ''}>25</button>
            <button onClick={() => handlePageSizeChange(50)} className={pageSize === 50 ? 'active' : ''}>50</button>
            <button onClick={() => handlePageSizeChange(100)} className={pageSize === 100 ? 'active' : ''}>100</button>
          </p>

          <div className="table__pagination-controls">
            <button className="table__pagination-button" onClick={handlePreviousPage} disabled={!hasPreviousPage}>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <p>{currentPage}/{totalPages}</p>
            <button className="table__pagination-button" onClick={handleNextPage} disabled={!hasNextPage}>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>

      {showGetById && <GetById close={() => setShowGetById(false)} callId={callId} />}
      {showCreateCall && <CreateCall close={() => setShowCreateCall(false)} />}
      {showRemoveCall && <RemoveCall close={() => setShowRemoveCall(false)} callId={callId} />}
      {showEditCall && <EditCall close={() => setShowEditCall(false)} callId={callId} />}
      {showRandomCall && <RandomCall close={() => setShowRandomCall(false)} />} 
    </div>
  );
};

export default CallCenterMine;
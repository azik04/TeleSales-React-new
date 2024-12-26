import React, { useEffect, useState } from 'react';
import CreateCall from './CreateCall';
import RemoveCall from './RemoveCall';
import Hesabat from './Hesabat';  
import EditCall from './EditCall';  
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import GetByIdDetails from './GetByIdDetails';
import { jwtDecode } from "jwt-decode";

const ExcludedCall = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCreateCall, setShowCreateCall] = useState(false);
  const [showRemoveCall, setShowRemoveCall] = useState(false);
  const [showHesabatCall, setShowHesabatCall] = useState(false);  
  const [showEditCall, setShowEditCall] = useState(false);  
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [showGetById, setShowGetById] = useState(false);
  

  const [callId, setCallId] = useState(null); 
  const { channelId } = useParams();

  const[isAdmin, setIsAdmin] = useState(false);
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

  useEffect(() => {
    const userToken = localStorage.getItem("JWT");
      const decodedToken = jwtDecode(userToken);
      if (decodedToken.role == "Admin") {
        setIsAdmin(true)
      }
    });  


  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    if (isNaN(date)) {
      console.error('Invalid date:', dateTimeString);
      return 'Invalid Date';
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

  useEffect(() => {
    const fetchData = async (pageNumber, pageSize) => {
      try {
        const response = await axios.get(`https://localhost:7108/api/Call/Excluded?kanalId=${channelId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
        const result = response.data.data;
        console.log(result);
        setData(result.items || []);
        setHasNextPage(result.hasNextPage);
        setHasPreviousPage(result.hasPreviousPage);
        setTotalPages(Math.ceil(result.totalCount / pageSize));
  
       
      } catch (error) {
        console.error('Error fetching channel data:', error);
        setData([]);
      }
    };
  
    if (channelId) fetchData(currentPage, pageSize);
  }, [channelId, currentPage, pageSize]);

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
          <p>Debitor Kanal</p>
        </div>
        <div className="table__actions">
          <button className="table__action table__action--create"  onClick={() => setShowCreateCall(true)}          >
            <i className="fa-solid fa-plus"></i> New Call
          </button>
          <button className="table__action table__action--get" onClick={() => setShowHesabatCall(true)}>
            <i className="fa-solid fa-file-import"></i> Hesabat
          </button>
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
            <th className="table__cell">Nömrəsi</th>
            <th className="table__cell">Başlanma tarixi</th>
            <th className="table__cell">Sahibkarın adı</th>
            <th className="table__cell">User</th>
            <td className="table__cell">Conclusion</td>
            <td className="table__cell">StatusUpdate</td>
            {isAdmin && (
            <th className="table__cell call-action">Actions</th> 
            )}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map(item => (
            <tr className="table__row" key={item.id} onClick={() => { setCallId(item.id); setShowGetById(true);}}>
              <td className="table__cell table__cell--id"><p>{item.id}</p></td>
              <td className="table__cell"><p>{item.legalName}</p></td>
              <td className="table__cell"><p>{item.voen}</p></td>
              <td className="table__cell"><p>{item.invoiceNumber}</p></td>
              <td className="table__cell"><p>{item.permissionStartDate}</p></td>
              <td className="table__cell"><p>{item.district}</p></td>
              <td className="table__cell"><p>{item.excludedByName}</p></td>
              <td className="table__cell"><p>{item.conclusion}</p></td>

              <td className="table__cell">
                <p>{item.lastStatusUpdate ? formatDateTime(item.lastStatusUpdate) : 'No date available'}</p>
              </td>
              {isAdmin && (
                <td className="table__cell call-action">
                  <button
                    onClick={() => {
                      setCallId(item.id);
                      setShowEditCall(true);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => {
                      setCallId(item.id);
                      setShowRemoveCall(true);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              )}
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

      {showGetById && <GetByIdDetails close={() => setShowGetById(false)} callId={callId} />}
      {showCreateCall && <CreateCall close={() => setShowCreateCall(false)} />}
      {showRemoveCall && <RemoveCall close={() => setShowRemoveCall(false)}  />}
      {showHesabatCall && <Hesabat  close={() => setShowHesabatCall(false)} />}
      {showEditCall && <EditCall close={() => setShowEditCall(false)} callId={callId} />}
    </div>
  );
};

export default ExcludedCall;

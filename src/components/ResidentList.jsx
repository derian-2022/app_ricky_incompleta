import React, { useState } from 'react'

 const [residents, setResidents] = useState()
 



 const ResidentList = ({ residents }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [residentsPerPage] = useState(10);


     // Get current residents
  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
        <ul>
        {currentResidents.map(resident => (
          <li key={resident.id}>{resident.name}</li>
        ))}
      </ul>
      <Pagination
        residentsPerPage={residentsPerPage}
        totalResidents={residents.length}
        paginate={paginate}
      />
    </div>
  )
}


const Pagination = ({ residentsPerPage, totalResidents, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalResidents / residentsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
export default ResidentList
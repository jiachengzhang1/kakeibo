import React from "react";

import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginationList = pageNumbers.map((number) => {
    return (
      <li
        className={`page-item ${currentPage === number ? "disabled" : ""}`}
        key={`pagination-${number}`}
      >
        <a onClick={() => setCurrentPage(number)} className="page-link">
          {number}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &laquo;
          </a>
        </li>
        {paginationList}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            onClick={() => setCurrentPage(currentPage + 1)}
            className="page-link"
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

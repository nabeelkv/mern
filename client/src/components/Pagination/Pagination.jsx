import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = ({ currentPage, numberOfPages, q }) => {
  currentPage = Number(currentPage);
  return (
    <nav id="pagination">
     <ul className="pagination">
      {
        !q ?
        <>
          {currentPage > 1 && <li><Link to={`/posts?page=${currentPage-1}`}><button className="selected">{'<'}</button></Link></li>}
          <li><button>({`${currentPage} / ${numberOfPages}`})</button></li>
          {currentPage < numberOfPages && <li><Link to={`/posts?page=${currentPage+1}`}><button className="selected">{'>'}</button></Link></li>}
        </>
        :
        <>
          {currentPage > 1 && <li><Link to={`/posts/search?q=${q}&page=${currentPage-1}`}><button className="selected">{'<'}</button></Link></li>}
          <li><button>({`${currentPage} / ${numberOfPages}`})</button></li>
          {currentPage < numberOfPages && <li><Link to={`/posts/search?q=${q}&page=${currentPage+1}`}><button className="selected">{'>'}</button></Link></li>}
        </>
      }
     </ul>
    </nav>
  )
}

export default Pagination;
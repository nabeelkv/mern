import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = () => {
  return (
    <nav id="pagination">
     <ul className="pagination">
        <li><button>{'<'}</button></li>
        <li><button className="selected">1</button></li>
        <li><Link to={`?page=1`}><button>2</button></Link></li>
        <li><button>3</button></li>
        <li>...</li>
        <li><button>5</button></li>
        <li><button>{'>'}</button></li>
     </ul>
    </nav>
  )
}

export default Pagination;
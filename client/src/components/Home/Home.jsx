import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from '../Table/Table.jsx'

const Home = () => {
  const posts = useSelector(store => store.postReducers);
  
  return (
    <div>
	  <p> &nbsp; <Link to='/new'><button>+ Add new post</button></Link></p>
      <Table posts = {posts} />
    </div>
  )
}

export default Home;
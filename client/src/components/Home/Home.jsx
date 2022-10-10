import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { getPosts, getPostsBySearch } from '../../actions/postActions.js';
import Pagination from '../Pagination/Pagination.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import Table from '../Table/Table.jsx'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const posts = useSelector(store => store.postReducers);
  console.log('store',posts);

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const dispatch = useDispatch();
  
  const searchPosts = () => {
    if(searchTerm.trim()) {
       dispatch(getPostsBySearch(searchTerm));
       navigate(`/posts/search?searchQuery=${searchTerm ||  'none'}`);
    } else {
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchPosts();
    }
  }

  useEffect(() => {
    if(!searchQuery) {
      dispatch(getPosts());
    } else {
      searchPosts();
    }
  }, [dispatch]);

  
  return (
    <div>
	   <div className='table-options'>
      <Link to='/create'><button>+ Add new post</button></Link>

      <div className="search-form">
       <input type="text" name="searchQuery" onKeyDown={handleKeyPress} onChange={(e) => setSearchTerm(e.target.value)} defaultValue={searchTerm} />
       <button onClick={searchPosts}>Search</button>
      </div>

     </div>
      <Table posts = {posts} />
      <Pagination />
    </div>
  )
}

export default Home;
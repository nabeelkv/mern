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
  const { posts, isLoading, numberOfPages } = useSelector(store => store.postReducers);
  const store = useSelector(store => store.postReducers);
  // console.log('store',store);

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const q = query.get('q');
  const [searchTerm, setSearchTerm] = useState(q);
  const dispatch = useDispatch();
  
  const searchPosts = () => {
    if(searchTerm?.trim()) {
       dispatch(getPostsBySearch(searchTerm, page));
       navigate(`/posts/search?q=${searchTerm ||  'none'}&page=${page}`);
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
    if(!q) {
      dispatch(getPosts(page));
    } else {
      searchPosts();
    }
  }, [dispatch, page, q]);

  
  return (
    <div>
	   <div className='table-options'>
      <Link to='/create'><button>+ Add new post</button></Link>

      <div className="search-form">
       <input type="text" name="q" onKeyDown={handleKeyPress} onChange={(e) => setSearchTerm(e.target.value)} defaultValue={searchTerm} />
       <button onClick={searchPosts}>Search</button>
      </div>

     </div>
      <Table posts={posts} isLoading={isLoading} />
      {posts.length > 0 && <Pagination currentPage={page} numberOfPages={numberOfPages} q={q} />}
    </div>  
  )
}

export default Home;
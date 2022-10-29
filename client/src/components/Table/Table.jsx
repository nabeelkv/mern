import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';

import '../Table/Table.css';
import TableItem from '../TableItem/TableItem';

const Table = () => {
  const { posts, isLoading } = useSelector(store => store.postReducers);
  // console.log(posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(!posts.length && !isLoading) return <div className='empty-posts'>No posts</div>;

   return (
      <>
      <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Creator</th>
                <th scope="col">Message</th>
                <th scope="col">Response</th>
                <th scope="col">Comments</th>
                <th scope="col">Manage</th>
              </tr>
            </thead>
            <tbody>
              { isLoading ? <tr className='loading'><td>Loading...</td></tr>
              :
              posts.map((post, index) => {
                 return <TableItem key={post._id} index={index} post={post} /> 
                })
             }
            </tbody>
          </table>
          </>
    )
  }
  
  export default Table;

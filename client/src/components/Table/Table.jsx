import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/postActions';

import '../Table/Table.css';

const Table = ({ posts }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

   return (
      <>
      <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Creator</th>
                <th scope="col">Message</th>
               {user?.result._id && <th scope="col">Manage</th>}
              </tr>
            </thead>
            <tbody>
              { posts?.length > 0 
              ? 
                posts.map((post, index) => {
                 const { _id, name, creator, message, selectedFile } = post;
                 return (<tr key={_id}>
                    <th scope="row">{index+1}</th>
                    <td><img src={selectedFile} width={100} /></td>
                    <td className='link'>{name}</td>
                    <td>{message}</td>
                    { user?.result._id === creator &&
                      <td>
                       <span className='edit'>Edit</span> &nbsp; - 
                       &nbsp;
                       <span className='delete' onClick={() => dispatch(deletePost(_id))}>Delete</span>
                      </td>
                    }
                </tr>) 
                })
              :
              <tr className='loading'><td>Loading...</td></tr>
             }
            </tbody>
          </table>
          </>
    )
  }
  
  export default Table;

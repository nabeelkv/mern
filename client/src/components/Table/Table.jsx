import React from 'react';
import '../Table/Table.css';

const Table = ({ posts }) => {
    return (
      <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Creator</th>
                <th scope="col">Message</th>
                <th scope="col">Manage</th>
              </tr>
            </thead>
            <tbody>
              { posts.length > 0 
              ? 
                posts.map((post, index) => {
                 const { _id, creator, message, selectedFile } = post;
                 return (<tr key={_id}>
                    <th scope="row">{index+1}</th>
                    <td><img src={selectedFile} width={100} /></td>
                    <td className='link'>{creator}</td>
                    <td>{message}</td>
                    <td><span className='edit'>Edit</span> &nbsp; - &nbsp; <span className='delete'>Delete</span></td>
                </tr>) 
                })
              :
              <tr className='loading'><td>Loading...</td></tr>
             }
            </tbody>
          </table>
    )
  }
  
  export default Table;
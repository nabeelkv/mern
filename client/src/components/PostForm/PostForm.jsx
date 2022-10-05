import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../actions/postActions';
import './PostForm.css';

const initialPostData = { creator: '', message: '', selectedFile: '' }

const PostForm = () => {
  const [postData, setPostData] = useState(initialPostData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    navigate('/');
  }

  return (
    <div className='post-form-container'>
     <form className='post-form' method='POST' onSubmit={handleSubmit}>

      <label htmlFor="creator">Creator</label>
      <input id="creator" type="text" name="creator" onChange={(e) => setPostData({...postData, creator: e.target.value})}/>

      {/* <label htmlFor="title">Title</label>
      <input id="title" type="text" name="title" onChange={(e) => setPostData({...postData, title: e.target.value})}/> */}

      <label htmlFor="image">Image</label>
      <input id="image" type="text" name="image" onChange={(e) => setPostData({...postData, selectedFile: e.target.value})}/>

      <label htmlFor="message">Post Message</label>
      <textarea id="message" rows={6} onChange={(e) => setPostData({...postData, message: e.target.value})}></textarea>
     
      <button type='submit'>Submit</button>

     </form>
    </div>
  )
}

export default PostForm;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../actions/postActions';
import './PostForm.css';

 //1
const initialPostData = { name: '', message: '', selectedFile: '' }

const PostForm = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [postData, setPostData] = useState(initialPostData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ ...postData, name: user?.result?.name })); //2 //dispatch(createPost(postData));
    navigate('/');
  }

  if(!user?.result?.name) {
     return <div className='post-form' style={{textAlign: 'center', color: 'red'}}>Login to make a post!</div>
  }

  return (
    <div className='post-form-container'>
     <form className='post-form' method='POST' onSubmit={handleSubmit}>
     
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
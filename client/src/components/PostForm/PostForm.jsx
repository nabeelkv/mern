import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getPost, updatePost } from '../../actions/postActions';
import './PostForm.css';

const PostForm = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { post, posts, isLoading } = useSelector((store) => store.postReducers);
  const [postData, setPostData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEditMode) {
      dispatch(updatePost(id, { ...postData, message: postData.message, selectedFile: postData.selectedFile }, navigate)); //2 //dispatch(createPost(postData));
      console.log(id, { ...postData, message: postData.selectedFile, selectedFile: postData.selectedFile });
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate)); //2 //dispatch(createPost(postData));
    }
  }

  useEffect(() => {
    if(id) dispatch(getPost(id)).then(res => {

       setPostData(res);
       setIsEditMode(true)

    });

    
    
  }, [id]);


  if(!user?.result?.name) {
     return <div className='post-form' style={{textAlign: 'center', color: 'red'}}>Login to make a post!</div>
  }
  
  if(isEditMode) {
    if(isLoading) {
      return <div className='loading-post'>Loading post...</div>
    } else {
      if(!post) return <div className='loading-post'>No post with this id!</div>;
    }
  }

  return (
    <div className='post-form-container'>
     <form className='post-form' method='POST' onSubmit={handleSubmit}>
     
      <label htmlFor="image">Image</label>
      <input id="image" type="text" name="selectedFile" onChange={(e) => setPostData({...postData, selectedFile: e.target.value})} defaultValue={postData?.selectedFile}/>

      <label htmlFor="message">Post Message</label>
      <textarea id="message" name="message" rows={6} onChange={(e) => setPostData({...postData, message: e.target.value})} defaultValue={postData?.message}></textarea>
     
      <button type='submit'>Submit</button>

     </form>
    </div>
  )
}

export default PostForm;
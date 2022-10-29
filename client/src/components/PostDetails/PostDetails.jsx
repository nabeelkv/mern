import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment";

import { getPost, getPostsBySearch } from '../../actions/postActions';
import './PostDetails.css';
import CommentSection from '../CommentSection/CommentSection';

const PostDetails = () => {
  const {post, posts, isLoading } = useSelector((store) => store.postReducers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id))
  }, [id]);
 
  //recommended posts
  useEffect(() => {
    if(posts) {
      dispatch(getPostsBySearch(post?.name));
    }
  }, [post]);
  
  if(isLoading) return <div className='loading-post'>Loading post...</div>

  if(!post) return <div className='loading-post'>No post with this id!</div>;

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  const openPost = (id) => navigate(`/view/${id}`);

  return (
    <div className='post-details'>
     <div className='post-details'>
        <img src={post.selectedFile} alt={post.name}/>
        <h2>{post.message}</h2>
        <span className='post-date'>{moment(post.createdAt).fromNow() + ' - by '}</span>
        <span>{post.name}</span><hr/>
     </div>
     <CommentSection post={post} />
     <hr/>
     <h3 className='recommended-posts'>You might also like</h3>
     {recommendedPosts.length && <div>
      {recommendedPosts.map((post) => {
        return <li className='link' key={post._id} onClick={() => openPost(post._id)}>{post.message}</li>
      })}
     </div>}
    </div>
  )
}

export default PostDetails;
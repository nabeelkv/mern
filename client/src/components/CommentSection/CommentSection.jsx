import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/postActions';

import './CommentSection.css';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const commentsRef = useRef()

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));
    setComments(newComment);
    setComment('');
    commentsRef.current.scrollIntoView({ behaviour: 'smooth' });
  }

  return (
    <div className='comment-section'>
      <div className='comments-container'>
        {comments.map((comment, i) => {
          return <div key={i}>{comment}</div>
        })}
         <div style={{marginTop:'100px'}} ref={commentsRef}/>
        </div>
      {user?.result?.name && <div className='comment-form'>
         <label htmlFor="comment">Write a comment</label>
         <textarea id="comment" name="comment" rows={6} onChange={(e) => setComment(e.target.value)}></textarea>
         <button disabled={!comment && true} onClick={handleClick}>Add comment</button>
      </div>}
    </div>
  )
}

export default CommentSection;
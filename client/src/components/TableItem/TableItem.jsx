import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likePost, deletePost } from '../../actions/postActions';

const TableItem = ({ post, index }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { _id, name, creator, message, selectedFile, likes, comments } = post;
  // const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.result?._id;

  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
    navigate('/');
  }

  const handleEditPost = (id) => {
   navigate(`/edit/${id}`);
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          {/* <ThumbUpAltIcon fontSize="small" /> */}
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          {/* <ThumbUpAltOutlined fontSize="small" /> */}
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        {/* <ThumbUpAltOutlined fontSize="small" /> */}
        &nbsp;Like
      </>
    );
  };

  const viewPost = (id) => {
    navigate(`/view/${id}`);
  }

  return (<tr>
    <th scope="row">{index+1}</th>
    <td><img src={selectedFile} width={100} /></td>
    <td>{name}</td>
    <td className='link' onClick={() => viewPost(_id)}>{message}</td>
    {user ? <td className='link' onClick={handleLike}><Likes/></td> : <td><Likes/></td>}
    <td>{comments.length}</td>
    { user?.result._id === creator &&
      <td>
       <span className='edit' onClick={() => handleEditPost(_id)}>Edit</span> &nbsp; - 
       &nbsp;
       <span className='delete' onClick={() => handleDeletePost(_id)}>Delete</span>
      </td>
    }
</tr>)
}

export default TableItem;
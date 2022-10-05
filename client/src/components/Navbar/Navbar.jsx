import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <header className="navbar">
      <h1 className="logo"><Link to='/'>MERN</Link></h1>
      <nav>
        <li>Home</li>
        <li>Profile</li>
        <li>Messages</li>
        <li>Groups</li>
      </nav>
      <div className="navbar-actions">
      { user ? (
       <>
         <li><div className="avatar-circular">{user.result.name.charAt(0).toUpperCase()}</div></li>
         <li>{user.result.name} <span className='logout-link' onClick={logout}>(Logout)</span></li>
       </>) : (<Link to='/auth'>Login</Link>) }
	 </div>
	</header>
  )
}

export default Navbar;
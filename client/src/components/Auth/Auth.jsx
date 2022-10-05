import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../../actions/authActions';

const initialState = {
  name: '', email: '', password: '', confirmPassword: ''
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleAuthFormSubmit = (e) => {
    e.preventDefault();

    if(isSignUp) {
       dispatch(signup(formData, navigate));
    } else {
       dispatch(signin(formData, navigate));
    }
  }

  const switchAuthMode = () => { 
    setIsSignUp(!isSignUp);
    handleShowPassword(false);
  }

  //Google Authentication
  const onGoogleAuthSuccess = async (response) => {
   const token = response?.credential;  //jwt token 
   const result = jwt_decode(response?.credential); //decode jwt to get user info

   console.log(result);
   
   try {
     dispatch({ type: 'AUTH', data: { result, token } });
     navigate('/');
   } catch (error) {
     console.log(error);
   }

  console.log(response);

  }

  const onGoogleAuthFailed = async (error) => {
    console.log(`Google auth failed: ${error}`);
  }

  useEffect(() => {
   if(localStorage.getItem('profile') !== null) {
      navigate('/');
   }
  },[navigate])

  return (
    <div className='authentication'>
     {/* <p style={{color:'red', textAlign: 'center'}}>The login failed!</p> */}
     <form className='auth-form' method='POST'>
      {isSignUp && 
        <>
         <label htmlFor="name">Full Name</label>
         <input type="text" name="name" onChange={handleInputChange}/>
        </>
      }
      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={handleInputChange}/>
      <label htmlFor="password">Password &nbsp; [ <span className='auth-link' onClick={handleShowPassword}>{showPassword ? 'hide' : 'show'}</span> ]</label>
      <input type={showPassword ? 'text' : 'password'} name="password" onChange={handleInputChange}/>
      {isSignUp && 
        <>
         <label htmlFor="confirm">Confirm Password</label>
         <input type="password" name="confirmPassword" onChange={handleInputChange}/>
        </>
      }
      <button type='submit' onClick={handleAuthFormSubmit}>{isSignUp ? 'Sign up' : 'Sign in'}</button>

      <GoogleLogin 
        onSuccess={onGoogleAuthSuccess}
        onError={onGoogleAuthFailed}
      /><br/>

      <div className='auth-link' onClick={switchAuthMode}>
       {isSignUp ? 'Back to Login' : 'Create an Account'}
      </div>
     </form>
    </div>
  )
}

export default Auth;
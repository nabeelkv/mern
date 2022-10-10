import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { signup, signin, googlesignin } from '../../actions/authActions';

const initialState = {
  name: '', email: '', password: '', confirmPassword: ''
}

const Auth = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null); 
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
       dispatch(signup(formData, navigate)).then(res => setErrorMessage(res));;
    } else {
       dispatch(signin(formData, navigate)).then(res => setErrorMessage(res));
    }
  }

  const switchAuthMode = () => { 
    setErrorMessage(null);
    setIsSignUp(!isSignUp);
    handleShowPassword(false);
  }

  //Google Authentication
  const onGoogleAuthSuccess = async (response) => {
   const token = response?.credential;  //jwt token 
   const result = jwt_decode(token); //decode jwt to get user info
   const googleData = { email: result.email, password: result.sub, name: result.name }
   console.log(result.sub);
   
   try {
     dispatch(googlesignin(googleData, navigate));
   } catch (error) {
     console.log(error);
   }

  console.log(response);

  }

  const onGoogleAuthFailed = async (error) => {
    console.log(`Google auth failed: ${error}`);
  }

  return (
    <div className='authentication'>
     {errorMessage && <p className='auth-error'>{errorMessage}</p>}
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
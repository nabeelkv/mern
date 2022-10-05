import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { getPosts } from './actions/postActions';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostForm from './components/PostForm/PostForm';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(store => store); 
  console.log('store',posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId='605125197515-4ckdqbvphpsla881as82hoghs9drrk3v.apps.googleusercontent.com'>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/new' exact element={<PostForm />} />
        <Route path='/auth' exact element={<Auth />} />
      </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App;
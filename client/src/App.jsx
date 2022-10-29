import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostForm from './components/PostForm/PostForm';

import './App.css';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  
  return (
    <GoogleOAuthProvider clientId='605125197515-4ckdqbvphpsla881as82hoghs9drrk3v.apps.googleusercontent.com'>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Navigate to='/posts'/>} />
        <Route path='/posts' exact element={<Home />} />
        <Route path='/posts/search' exact element={<Home />} />
        <Route path='/create' exact element={<PostForm />} />
        <Route path='/edit/:id' exact element={<PostForm />} />
        <Route path='/view/:id' exact element={<PostDetails />} />
        <Route path='/auth' exact element={!user ? <Auth /> : <Navigate to='/posts'/>} />
      </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App;
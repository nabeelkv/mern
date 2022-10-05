import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
 if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
   }
    return req;
});

//Post
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);

//Authentication
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
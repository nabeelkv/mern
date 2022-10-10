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
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery || 'none' }`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

//Authentication
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
//Google authentication
export const googleSignIn = (googleData) => API.post('/user/googlesignin', googleData);
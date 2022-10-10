import { FETCH_ALL, CREATE, DELETE, FETCH_BY_SEARCH } from '../constants/actionTypes';
import * as api from '../api';

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });

    } catch (error) {
        
        console.log(error);

    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        
        const { data } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });

    } catch (error) {
        
        console.log(error);

    }
}

export const createPost = (post) => async (dispatch) => {

    try {
        
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        
        console.log(error);

    }
}

export const deletePost = (id) => async (dispatch) => {

    try {
        
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        
        console.log(error);

    }
}
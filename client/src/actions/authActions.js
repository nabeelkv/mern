import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

//Action Creators
export const signin = (formData, navigate) => async (dispatch) => {
    try {
        
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');

    } catch (error) {
        
        // console.log(error);
        return error?.response?.data?.message;

    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      navigate('/');

    } catch (error) {
        
        console.log(error);
        return error?.response?.data?.message;

    }
}

// Google Authentication
export const googlesignin = (googleData, navigate) => async (dispatch) => {
    try {
        
        const { data } = await api.googleSignIn(googleData);
        dispatch({ type: AUTH, data });
        navigate('/');

    } catch (error) {
        
        console.log(error);
        return error?.response?.data?.message;

    }
}
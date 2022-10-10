import { FETCH_ALL, CREATE, DELETE, FETCH_BY_SEARCH } from '../constants/actionTypes';

const postReducers = (posts = [], action) => {    //posts === state here
     switch (action.type) {
        case FETCH_ALL:
         return action.payload;
        case FETCH_BY_SEARCH:
         return action.payload; 
        case CREATE:
         return [action.payload, ...posts];  
        case DELETE:
         return posts.filter((post) => post._id !== action.payload); 
        default:
            return posts;
     }
}

export default postReducers;
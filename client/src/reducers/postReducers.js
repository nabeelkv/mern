import { FETCH_ALL, CREATE } from '../constants/actionTypes';

const postReducers = (posts = [], action) => {    //posts === state here
     switch (action.type) {
        case FETCH_ALL:
         return action.payload; 
        case CREATE:
         return [action.payload, ...posts]; 
        default:
            return posts;
     }
}

export default postReducers;
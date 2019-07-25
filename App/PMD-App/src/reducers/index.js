//ACTIONS
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions';
//INITIAL STATE 
const initialState = {
    data: []
}
export const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_START: 
        return {
            ...state,
            error: '',
            fetchingData: true,
            loggedIn: false
        }
        case LOGIN_SUCCESS: 
        return {
            ...state,
            error: '',   
            fetchingData: false,
            loggedIn: true,
        }
        case LOGIN_FAILURE:
        return {
            ...state,
            error: '',
            fetchingData: false,
            loggedIn: false
        }
        default: return state;
    }
}




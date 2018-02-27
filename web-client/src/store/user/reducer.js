import { USER } from './types';

/*** INITIAL STATE ***/
const initialState = {
    id: '',
    username: '',
    email: '',
    socket: false,
    isCreating: false,
    isUpdating: false,
    isConnecting: false
}

/*** REDUCER ***/
/*
const user = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                isCreating: true
            }

        case LOGIN_USER_REQUEST:
            return {
                ...state,
                isUpdating: true
            }

        case CONNECT_USER_REQUEST:
            return {
                ...state,
                isConnecting: true
            }

        case LOGIN_USER:
        case CREATE_USER:
            const { _id, username, email } = action.payload;
            return {
                ...state,
                id: _id,
                username,
                email,
                isCreating: false,
                isUpdating: false
            }

        case CONNECT_USER:
            const {} = action.payload;
            return {
                ...state,
                connected: true
            }

        default:
            return state
    }
}
*/

const user = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case USER:
            return { 
                ...state, 
                user: {
                    ...state.user, 
                    ...action.payload
                } 
            }

        default:
            return state
    }
}


export default user;
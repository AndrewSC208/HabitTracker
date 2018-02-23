import {
    CREATE_USER_REQUEST,
    CREATE_USER,
    LOGIN_USER_REQUEST,
    LOGIN_USER
} from './types';

/*** INITIAL STATE ***/
const initialState = {
    id: '',
    username: '',
    email: '',
    isCreating: false,
    isUpdating: false,
    isReading: false,
    isDeleteing: false
}

/*** REDUCER ***/
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

        default:
            return state
    }
}

export default user;
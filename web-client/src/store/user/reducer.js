import { CREATE_USER_REQUEST, CREATE_USER } from './types';
/*** INITIAL STATE ***/
const initialState = {
    id: '',
    username: '',
    email: '',
    xAuth: '',
    isCreating: false,
    isReading: false,
    isUpdating: false,
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

        case CREATE_USER:
            const { _id, username, email } = action.payload;
            return {
                ...state,
                id: _id,
                username,
                email,
                isCreating: !state.isCreating
            }

        default:
            return state
    }
}

export default user;
import { USER, SOCKET } from './types';

/*** INITIAL STATE ***/
const initialState = {
    _id: '',
    username: '',
    email: '',
    socket: 'disconnected',
    isUpdating: false,
    isConnecting: false
}

/*** REDUCER ***/
const user = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER:
            return { ...state, ...payload }

        case SOCKET:
            return { ...state, socket: payload }

        default:
            return state
    }
}

export default user;
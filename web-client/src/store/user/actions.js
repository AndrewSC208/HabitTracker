import { connectWs } from '../../modules/socket';
import { USER, SOCKET } from './types';

/*** ACTIONS ***/
export const setUser = (payload) => {
    return {
        type: USER,
        payload
    }
}

export const setSocket = (payload) => {
    return {
        type: SOCKET,
        payload
    }
}

/*** ASYNC ACTIONS ***/
export const createUserReq = (payload) => {
    const { username, password, email } = payload;
    // TODO: move urls to config/env files
    const url = `http://localhost:4112/api/users`;
    const msg = { username, email, password };

    return dispatch => {
        dispatch(setUser({ isUpdating: true }));

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(msg),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(payload => payload.json())
        .then(payload => {
            if (payload.error_code) {
                // TODO: handle error properly
                console.error('Error', payload.error_msg)
            }

            const user = {
                ...payload,
                isUpdating: false
            }
            
            dispatch(setUser(user));
        })
        // TODO: handle error properly
        .catch(error => console.error('Error:', error))
    }
}

export const loginUserReq = (payload) => {
    const url = `http://localhost:4112/api/users/login`;
    const { email, password} = payload;
    const msg = { email, password };

    return dispatch => {
        dispatch(setUser({ isUpdating: true }))

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(msg),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(payload => payload.json())
        .then(payload => {
            if (payload.error_code) {
                // TODO: handle error properly
                console.error('Error', payload.error_msg)
            }

            // TODO: save jwt to local storage

            const user = { ...payload, isUpdating: false }

            dispatch(setUser(user))
            dispatch(connectUser())
        })
        // TODO: handle error properly
        .catch(error => console.error('Error:', error))
    }
}

export const connectUser = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { user } = state;

        connectWs(user)
            .then(socket => {
                const { evt } = socket;
                dispatch(setSocket(evt));
            })
            // TODO: handle error properly
            .catch(err => console.log(err));
    }
}

import * as Ws from '../../modules/socket';
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
/**
 * dispatch this function to create a user
 * {
 *  username: '',
 *  password: '',
 *  email: ''
 * }
 */
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
/**
 * dispatch this function to login
 * {
 *  password: '',
 *  email: ''
 * }
 */
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
            
            // route to loadin page

            // connect to socket
            Ws.connect(user)
                .then(socket => {
                    dispatch(setSocket(socket));
                })
                .catch(error => console.log(error));

            // load user

            // route to dashboard

        })
        // TODO: handle error properly
        .catch(error => console.error('Error:', error))
    }
}


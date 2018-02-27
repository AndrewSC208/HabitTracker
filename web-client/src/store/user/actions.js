import { initWs } from '../../modules/socket';

import { 
    CREATE_USER_REQUEST, 
    CREATE_USER,
    LOGIN_USER_REQUEST,
    LOGIN_USER,
    CONNECT_USER_REQUEST,
    CONNECT_USER,
    USER } from './types';

/*** ACTIONS ***/
// 

export const createUserReq = (payload) => {
    const { username, password, email } = payload;
    // TODO: move urls to config/env files
    const url = `http://localhost:4112/api/users`;
    const msg = { username, email, password };

    return dispatch => {
        dispatch({
            type: USER,
            payload: {
                isCreating: true
            }
        });

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
            
            dispatch({
                type: USER,
                payload
            });
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
        dispatch({
            type: LOGIN_USER_REQUEST
        });

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

            dispatch({
                type: LOGIN_USER,
                payload
            });

            // now that the user has an auth token
            // I need to new up the ws socket with user info
            // export instance of ws so the whole app can use it.
            
        })
        // TODO: handle error properly
        .catch(error => console.error('Error:', error))
    }
}

//export const createUser = (payload) => {
//     return dispatch => {
//         dispatch({
//             type: CREATE_USER_REQUEST,
//             payload
//         })

//         dispatch({
//             type: CREATE_USER,
//             payload
//         })
//     }
// }

// export const loginUser = (payload) => {
//     return dispatch => {
//         dispatch({
//             type: LOGIN_USER_REQUEST,
//         })

//         dispatch({
//             type: LOGIN_USER,
//             payload
//         })
//     }
// }

// export const connectUser = (payload) => {
//     return dispatch => {
//         dispatch({
//             type: CONNECT_USER_REQUEST,
//         })

//         dispatch({
//             type: CONNECT_USER,
//             payload
//         })
//     }
// }

export const connectUserRequest = (payload) => {
    const {id, email} = payload;

    return dispatch => {
        dispatch({
            CONNECT_USER_REQUEST
        });

        return initWs(id, email).then(conn => {
            console.log('connection and user')
        })
        .catch(err => {
            console.log('SOMETHING HAPPEND: ', err);
        })
    }
}
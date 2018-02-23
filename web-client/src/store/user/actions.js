import { 
    CREATE_USER_REQUEST, 
    CREATE_USER,
    LOGIN_USER_REQUEST,
    LOGIN_USER } from './types';

/*** ACTIONS ***/
export const createUser = (payload) => {
    return dispatch => {
        dispatch({
            type: CREATE_USER_REQUEST,
            payload
        })

        dispatch({
            type: CREATE_USER,
            payload
        })
    }
}

export const createUserReq = (payload) => {
    const { username, password, email } = payload;
    // TODO: move urls to config/env files
    const url = `http://localhost:4112/api/users`;
    const msg = { username, email, password };

    return dispatch => {
        dispatch({
            type: CREATE_USER_REQUEST
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
                type: CREATE_USER,
                payload
            });
        })
        // TODO: handle error properly
        .catch(error => console.error('Error:', error))
    }
}

export const loginUser = (payload) => {
    return dispatch => {
        dispatch({
            type: LOGIN_USER_REQUEST,
        })

        dispatch({
            type: LOGIN_USER,
            payload
        })
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
        })
        // TODO: handle error properly
        .catch(error => console.error('Error:', error))
    }

}
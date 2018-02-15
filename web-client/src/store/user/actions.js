import { CREATE_USER_REQUEST, CREATE_USER } from './types';
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
    const url = `http://localhost:4112/api/users`;
    const msg = {
        username,
        email,
        password
    }

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
                // todo: handle error properly
                console.error('Error', payload.error_msg)
            }
            
            dispatch({
                type: CREATE_USER,
                payload
            });
        })
        // todo: handle error properly
        .catch(error => console.error('Error:', error))
    }
}
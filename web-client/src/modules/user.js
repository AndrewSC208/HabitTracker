/*** ACTION TYPES ***/
export const CREATE_USER_REQUEST = 'user/CREATE_REQUEST'
export const CREATE_USER = 'user/CREATE'

export const READ__USER_REQUEST = 'user/READ_REQUEST'
export const READ_USER = 'user/READ'

export const UPDATE__USER_REQUEST = 'user/UPDATE_REQUEST'
export const UPDATE_USER = 'user/UPDATE'

export const DELETE__USER_REQUEST = 'user/DELETE_REQUEST'
export const DELETE_USER = 'user/DELETE'
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
export default (state = initialState, action) => {
    const { type } = action;

    switch(type) {
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
            type: CREATE_USER_REQUEST,
            payload
        });

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(msg),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error_code) {
                // todo: handle error properly
                console.error('Error', res.error_msg)
            }
            // api success: update user in store
            dispatch({
                type: CREATE_USER,
                res
            });
        })
        // todo: handle error properly
        .catch(error => console.error('Error:', error))
    }
}
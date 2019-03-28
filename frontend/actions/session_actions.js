import * as SessionUtils from '../util/session_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const removeUser = () => ({
    type: REMOVE_USER,
});

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const login = user => dispatch => {
    debugger;
    return SessionUtils.login(user).then(user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
};

export const signup = user => dispatch => (
    SessionUtils.signup(user).then(user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
    SessionUtils.logout().then(() => dispatch(removeUser()),
    errors => dispatch(receiveErrors(errors.responseJSON)))
);


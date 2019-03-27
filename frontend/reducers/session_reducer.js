import {RECEIVE_USER, REMOVE_USER} from '../actions/session_actions';

const sessionReducer = (state = { id: null }, action) => {
    Object.freeze(state)
    switch (action.type) {
        case (RECEIVE_USER):
            return Object.assign({}, state, { id: action.user.id });
        case (REMOVE_USER):
            return Object.assign({}, state, { id: null});
        default:
            return state;
    }
}

export default sessionReducer;
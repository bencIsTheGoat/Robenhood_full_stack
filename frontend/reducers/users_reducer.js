import { RECEIVE_USER } from '../actions/session_actions';
import { RECEIVE_SHARES_DATA } from '../actions/session_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_USER):
            return Object.assign({}, state, {[action.user.id]: action.user});
        case (RECEIVE_SHARES_DATA):
            return Object.assign({}, state, {shares: action.numShares})
        default:
            return state;
    }
}

export default usersReducer;
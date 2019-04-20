import { STARTLOAD, STOPLOAD } from '../actions/ui_actions';

const uiReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (STARTLOAD):
            return true
        case (STOPLOAD):
            return false;
        default:
            return state;
    }
}

export default uiReducer;
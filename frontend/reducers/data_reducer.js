import { RECEIVE_DATA} from '../actions/company_actions';

const dataReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_DATA):
            return Object.assign({}, state, { [action.ticker]: action.data })
        default:
            return state;
    }
}

export default dataReducer;
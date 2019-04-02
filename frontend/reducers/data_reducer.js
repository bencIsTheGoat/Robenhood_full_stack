import { RECEIVE_DATA, RECEIVE_PORT_DATA} from '../actions/company_actions';

const dataReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_DATA):
            return Object.assign({}, state, { [action.ticker]: action.data })
        case (RECEIVE_PORT_DATA):
            return Object.assign({}, state, { portData: action.data})
        default:
            return state;
    }
}

export default dataReducer;
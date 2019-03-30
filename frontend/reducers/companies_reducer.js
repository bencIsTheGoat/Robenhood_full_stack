import { RECEIVE_COMPANY, RECEIVE_DATA, RECEIVE_USER_STOCK_DATA } from '../actions/company_actions';

const companiesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_COMPANY):
            return Object.assign({}, state, { [action.company.id]: action.company});
        case (RECEIVE_DATA):
            return Object.assign({}, state, { data: action.data})
        case (RECEIVE_USER_STOCK_DATA):
            let newState = { 
                [action.company.id]: {
                    company: action.company,
                    data: action.data
            }}
            return Object.assign({}, state, newState);
        default:
            return state;
    }
}

export default companiesReducer;
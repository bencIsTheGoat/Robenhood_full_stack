import { RECEIVE_COMPANY, RECEIVE_RECENT_STOCK_DATA, RECEIVE_USER_STOCK_DATA, RECEIVE_COMPANIES } from '../actions/company_actions';

const companiesReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_COMPANY):
            return Object.assign({}, state, { [action.company.id]: action.company});
        case (RECEIVE_COMPANIES):
            return action.companies
        case (RECEIVE_USER_STOCK_DATA):
            let newState = { 
                [action.company.id]: {
                    company: action.company,
                    data: action.data
            }}
            return Object.assign({}, state, newState);
        case (RECEIVE_RECENT_STOCK_DATA):
            return Object.assign({}, state, { recentData: action.recentData })
        default:
            return state;
    }
}

export default companiesReducer;
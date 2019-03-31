import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import companiesReducer from './companies_reducer';
import transactionsReducer from './transactions_reducer';
import dataReducer from './data_reducer';


const entitiesReducer = combineReducers({
    users: usersReducer,
    companies: companiesReducer,
    transactions: transactionsReducer,
    data: dataReducer
});

export default entitiesReducer;
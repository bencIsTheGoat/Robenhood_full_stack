import { RECEIVE_TRANSACTIONS, RECEIVE_TRANSACTION } from '../actions/transaction_actions';

const transactionsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_TRANSACTIONS):
            return action.transactions;
        case (RECEIVE_TRANSACTION):
            return Object.assign({}, state, {[action.transaction.id]: action.transaction});
        default:
            return state;
    }
};

export default transactionsReducer;
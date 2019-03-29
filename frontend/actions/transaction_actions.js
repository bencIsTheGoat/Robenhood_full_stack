import * as TransUtils from '../util/transaction_api_util';
import { RECEIVE_ERRORS, receiveErrors } from './session_actions';

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';

export const receiveTransaction = transaction => ({
    type: RECEIVE_TRANSACTION,
    transaction
});

export const receiveTransactions = transactions => ({
    type: RECEIVE_TRANSACTIONS,
    transactions
});

export const fetchTransactions = () => dispatch => (
    TransUtils.fetchTransactions().then(transactions => dispatch(receiveTransactions(transactions)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const createTransaction = transaction => dispatch (
    TransUtils.createTransaction(transaction).then(transaction => dispatch(receiveTransaction(transaction)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
);


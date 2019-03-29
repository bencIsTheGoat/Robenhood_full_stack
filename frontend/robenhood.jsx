import React from 'react';
import ReactDOM from 'react-dom';
import * as TransUtils from './actions/transaction_actions';
import * as CompUtils from './actions/company_actions';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
                },
                session: { id: window.currentUser.id }
            };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    // TEST
    window.createTransaction = TransUtils.createTransaction;
    window.fetchTransactions = TransUtils.fetchTransactions;
    window.fetchCompany = CompUtils.fetchCompany;
    window.createCompany = CompUtils.createCompany;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // TEST

    ReactDOM.render(<Root store={ store } />, root)
})
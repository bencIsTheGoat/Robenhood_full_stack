import React from 'react';
import ReactDOM from 'react-dom';
import * as Utils from './actions/session_actions';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const store = configureStore();
    // TEST
    window.login = Utils.login;
    window.signup = Utils.signup;
    window.logout = Utils.logout;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // TEST

    ReactDOM.render(<Root store={ store } />, root)
})
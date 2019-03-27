import React from 'react';
import ReactDOM from 'react-dom';
import * as Utils from './util/session_api_util';
import configureStore from './store/store';

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

    ReactDOM.render(<h1>Robenhood</h1>, root)
})
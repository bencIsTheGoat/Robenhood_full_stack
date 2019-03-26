import React from 'react';
import ReactDOM from 'react-dom';
import * as Utils from './util/session_api_util'

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    // TEST
    window.login = Utils.login
    window.signup = Utils.signup
    window.logout = Utils.logout
    // TEST

    ReactDOM.render(<h1>Robenhood</h1>, root)
})
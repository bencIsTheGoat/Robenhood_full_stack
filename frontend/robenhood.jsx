import React from 'react';
import ReactDOM from 'react-dom';
import * as SessUtils from './actions/session_actions';
import * as NewsUtils from './actions/news_actions';
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
    window.fetchNews = NewsUtils.fetchPortfolioNews;
    window.login = SessUtils.login;
    window.logout = SessUtils.logout;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // TEST

    ReactDOM.render(<Root store={ store } />, root)
})
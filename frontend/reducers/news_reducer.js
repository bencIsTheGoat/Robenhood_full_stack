import { RECEIVE_PORTFOLIO_NEWS, RECEIVE_COMPANY_NEWS } from '../actions/news_actions';

export const newsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_PORTFOLIO_NEWS || RECEIVE_COMPANY_NEWS):
            return Object.assign({}, state, action.news)
        default:
            return state
    }
}

export default newsReducer;
import { RECEIVE_WATCHLIST, RECEIVE_WATCHLIST_ITEM, REMOVE_WATCHLIST_ITEM} from '../actions/watchlist_actions';

export const watchlistReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_WATCHLIST):
            return action.index;
        case (RECEIVE_WATCHLIST_ITEM):
            return Object.assign({}, state, {[action.item.id]: action.item});
        case (REMOVE_WATCHLIST_ITEM):
            let newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}

export default watchlistReducer;

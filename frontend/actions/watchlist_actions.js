import * as WatchUtils from '../util/watchlist_api_util';
import { receiveErrors } from './session_actions';
export const RECEIVE_WATCHLIST = 'RECEIVE_WATCHLISTS';
export const RECEIVE_WATCHLIST_ITEM = 'RECEIVE_WATCHLIST_ITEM';
export const REMOVE_WATCHLIST_ITEM = 'REMOVE_WATCHLIST_ITEM';

export const receiveWatchlist = (index) => ({
    type: RECEIVE_WATCHLIST,
    index
});

export const receiveWatchlistItem = (item) => ({
    type: RECEIVE_WATCHLIST_ITEM,
    item
});

export const removeWatchListItem = (id) => ({
    type: REMOVE_WATCHLIST_ITEM,
    id
})

export const fetchWatchlistIndex = () => dispatch => (
    WatchUtils.fetchWatchListIndex().then(index => dispatch(receiveWatchlist(index),
    errors => dispatch(receiveErrors(errors))))
);

export const createWatchlistItem = (item) => dispatch => (
    WatchUtils.createWatchListItem(item).then(item => dispatch(receiveWatchlistItem(item),
    errors => dispatch(receiveErrors(errors))))
);

export const deleteWatchlistItem = (id) => dispatch => (
    WatchUtils.deleteWatchListItem(id).then(id => dispatch(removeWatchListItem(id),
    errors => dispatch(receiveErrors(errors))))
);
import { connect } from 'react-redux';
import { fetchWatchListIndex } from '../../actions/watchlist_actions';
import Watchlist from './watchlist_component';

const msp = state => ({
    items: state.entities.watchlists
});

const mdp = dispatch => ({
    fetchWatchListIndex: () => dispatch(fetchWatchListIndex())
});

export default connect(msp, mdp)(Watchlist)
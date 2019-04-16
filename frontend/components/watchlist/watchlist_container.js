import { connect } from 'react-redux';
import { fetchWatchlistIndex } from '../../actions/watchlist_actions';
import Watchlist from './watchlist_component';

const msp = state => ({
    items: state.entities.watchlists
});

const mdp = dispatch => ({
    fetchWatchlistIndex: () => dispatch(fetchWatchlistIndex())
});

export default connect(msp, mdp)(Watchlist)
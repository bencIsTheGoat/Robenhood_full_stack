import { connect } from 'react-redux';
import StockShow from './stock_show';
import {withRouter} from 'react-router-dom';
import { createWatchlistItem, deleteWatchlistItem, fetchWatchlistIndex } from '../../actions/watchlist_actions';
import { fetchCompanies } from '../../actions/company_actions';

const msp = (state, ownProps) => {
    return {ticker: ownProps.match.params.ticker,
    watchlistItems: state.entities.watchlists,
    currentUser: state.session.id,
    companies: state.entities.companies}
}

const mdp = dispatch => {
    return {createWatchlistItem: (data) => dispatch(createWatchlistItem(data)),
    deleteWatchlistItem: (id) => dispatch(deleteWatchlistItem(id)),
    fetchCompanies: () => dispatch(fetchCompanies()),
    fetchWatchlistIndex: () => dispatch(fetchWatchlistIndex())}
}

export default withRouter(connect(msp, mdp)(StockShow));


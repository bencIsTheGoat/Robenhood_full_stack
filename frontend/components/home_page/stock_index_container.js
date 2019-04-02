import { fetchCompanies, getRecentStockData } from '../../actions/company_actions';
import { connect } from 'react-redux';
import StockIndex from './stock_index';

const msp = state => ({
    companies: state.entities.companies,
    numShares: state.entities.users.shares,
    prices: state.entities.companies.recentData
});

const mdp = dispatch => ({
    fetchCompanies: () => dispatch(fetchCompanies()),
    getRecentStockData: (ticker, time) => dispatch(getRecentStockData(ticker, time))
});

export default connect(msp, mdp)(StockIndex);
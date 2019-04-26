import { getStockData, fetchCompany, createCompany } from '../../actions/company_actions';
import { startLoad, stopLoad } from '../../actions/ui_actions';
import { connect } from 'react-redux';
import HomePage from './home_page';
import { logout } from '../../actions/session_actions';

const msp = state => ({
    user: state.entities.users[state.session.id]
});

const mdp = dispatch => ({
    getStockData: (ticker, time) => dispatch(getStockData(ticker, time)),
    fetchCompany: (company) => dispatch(fetchCompany(company)),
    createCompany: (company) => dispatch(createCompany(company)),
    startload: () => dispatch(startLoad()),
    stopLoad: () => dispatch(stopLoad()),
    logout: () => dispatch(logout())

});

export default connect(msp, mdp)(HomePage);
import { getStockData, fetchCompany, createCompany } from '../../actions/company_actions';
import { fetchTransactions } from '../../actions/transaction_actions';
import { connect } from 'react-redux';
import Graph from './graph_component';

const msp = state => ({
    user: state.entities.users[state.session.id],
    data: state.entities.companies.data,
    transactions: state.entities.transactions
});

const mdp = dispatch => ({
    getStockData: (ticker, time) => dispatch(getStockData(ticker, time)),
    fetchCompany: (id) => dispatch(fetchCompany(id)),
    createCompany: (company) => dispatch(createCompany(company)),
    fetchTransactions: () => dispatch(fetchTransactions())

});

export default connect(msp, mdp)(Graph);
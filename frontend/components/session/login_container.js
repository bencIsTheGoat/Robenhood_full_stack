import { connect } from 'react-redux';
import LoginForm from './login_form';
import { login, clearErrors } from '../../actions/session_actions';
import { fetchTransactions } from '../../actions/transaction_actions';
import { fetchCompanies } from '../../actions/company_actions';

const msp = (state, ownProps) => ({
    errors: state.errors.session,
    transactions: state.entities.transactions
});

const mdp = dispatch => ({
    login: (user) => {
        return dispatch(login(user))
    },
    clearErrors: () => dispatch(clearErrors()),
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchCompanies: () => dispatch(fetchCompanies())
});

export default connect(msp, mdp)(LoginForm);
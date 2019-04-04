import { connect } from 'react-redux';
import Form from './form';
import { createTransaction } from '../../actions/transaction_actions';
import { createCompany } from '../../actions/company_actions';


const msp = (state) => {
    return {userId: state.session.id}
};

const mdp = dispatch => ({
    createCompany: (info) => dispatch(createCompany(info)),
    createTransaction: (info) => dispatch(createTransaction(info)),
    fetchCompanies: () => dispatch(fetchCompanies())
})


export default connect(msp, mdp)(Form)


import { connect } from 'react-redux';
import Form from './form';
import { startLoad, stopLoad } from '../../actions/ui_actions';
import { createTransaction } from '../../actions/transaction_actions';
import { createCompany } from '../../actions/company_actions';


const msp = (state) => {
    return {userId: state.session.id}
};

const mdp = dispatch => ({
    createCompany: (info) => dispatch(createCompany(info)),
    createTransaction: (info) => dispatch(createTransaction(info)),
    fetchCompanies: () => dispatch(fetchCompanies()),
    startLoad: () => dispatch(startLoad()),
    stopLoad: () => dispatch(stopLoad())
})


export default connect(msp, mdp)(Form)


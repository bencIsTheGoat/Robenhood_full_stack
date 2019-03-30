import { connect } from 'react-redux';
import LoginForm from './login_form';
import { login, clearErrors } from '../../actions/session_actions';

const msp = (state, ownProps) => ({
    errors: state.errors.session
});

const mdp = dispatch => ({
    login: (user) => {
        debugger
        return dispatch(login(user))
    },
    clearErrors: () => dispatch(clearErrors())
});

export default connect(msp, mdp)(LoginForm);
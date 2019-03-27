import { connect } from 'react-redux';
import SignupForm from './signup_form';
import {signup} from '../../actions/session_actions';

const msp = (state, ownProps) => ({
    errors: state.errors.session
});

const mdp = dispatch => ({
    signup: (user) => dispatch(signup(user))
});

export default connect(msp, mdp)(SignupForm);
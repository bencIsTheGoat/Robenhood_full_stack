import Account from './account';
import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';

const msp = state => ({
    users: state.entities.users,
    userId: state.session.id
});

const mdp = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(msp, mdp)(Account);
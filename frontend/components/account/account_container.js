import Account from './account';
import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import { startLoad, stopLoad } from '../../actions/ui_actions';

const msp = state => ({
    users: state.entities.users,
    userId: state.session.id
});

const mdp = dispatch => ({
    logout: () => dispatch(logout()),
    startLoad: () => dispatch(startLoad()),
    stopLoad: () => dispatch(stopLoad())
})

export default connect(msp, mdp)(Account);
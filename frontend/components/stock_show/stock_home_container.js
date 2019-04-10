import {connect} from 'react-redux';
import StockHome from './stock_home';
import { logout } from '../../actions/session_actions';

const mdp = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(null, mdp)(StockHome);
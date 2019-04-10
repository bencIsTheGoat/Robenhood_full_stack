import Account from './account';
import {connect} from 'react-redux';

const msp = state => ({
    users: state.entities.users,
    userId: state.session.id
});

export default connect(msp, null)(Account);
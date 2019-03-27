import { connect } from 'react-redux';
import Home from './home_component';

const msp = state => ({
    user: state.entities.users[state.session.id]
});

const mdp = dispatch => ({
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    logout: () => dispatch(logout())
});

export default connect(msp, mdp)(Home);
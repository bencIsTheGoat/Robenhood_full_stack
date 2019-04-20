import { connect } from 'react-redux';
import {startLoad, stopLoad } from '../../actions/ui_actions';
import LoadingAnimation from './loading';

const msp = state => ({
    loading: state.ui
});

const mdp = dispatch => ({
    startLoad: () => dispatch(startLoad()),
    stopLoad: () => dispatch(stopLoad())
});

export default connect(msp, mdp)(LoadingAnimation)
import React from 'react';
import GraphContainer from './graph_container';
import NewsContainer from './news_container';
import StockIndexContainer from './stock_index_container';
import Auto from './search';
import WatchlistContainer from '../watchlist/watchlist_container';
import {withRouter, Link} from 'react-router-dom';
import {logout} from '../../actions/session_actions';
import {connect} from 'react-redux';

const mdp = dispatch => ({
    logout: () => dispatch(logout())
})

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleHome = this.handleHome.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout().then(() => this.props.history.push('/'))
    }

    handleHome (e) {
        e.preventDefault();
        this.props.history.push('/home');
    }

    render () {
        return (
            <div>
                <div className='robenhood-header'>
                    <h2 className='robenhood-h2' onClick={this.handleHome}>
                        <i className="fas fa-feather-alt"></i>
                        robenhood
                    </h2>
                    <div className='account-links'>
                        <div className='account'>
                            <Link to='/account'>
                                Account
                            </Link>
                        </div>
                        <button onClick={this.handleLogout} id='logout-button'>
                            Logout
                        </button>
                        <span className='links'>
                            Checkout my
                                <div>
                                <a href="https://www.linkedin.com/in/ben-cutler-783447b5/" id='linkedin'>
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://github.com/bcutler94" id='github'>
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>
                        </span>
                    </div>
                </div>
                <div className='home-page-div'>
                    <Auto />
                    <GraphContainer />
                    <NewsContainer />
                    <StockIndexContainer />
                    <WatchlistContainer />
                </div>
            </div>
        )
    }

}

export default withRouter(connect(null, mdp)(HomePage));
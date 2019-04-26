import React from 'react';
import GraphContainer from './graph_container';
import NewsContainer from './news_container';
import StockIndexContainer from './stock_index_container';
import Auto from './search';
import {withRouter, Link} from 'react-router-dom';

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
                        <div className='nav-links'>
                            <div className='account'>
                                <Link to='/home'>
                                    Home
                                </Link>
                            </div>
                            <div className='account'>
                                <Link to='/account'>
                                    Account
                                </Link>
                            </div>
                            <button onClick={this.handleLogout} id='logout-button'>
                                Logout
                            </button>
                        </div>
                        <span className='links'>
                            Checkout my
                                <div>
                                <a href="https://bencutler.dev/" id='site'>
                                    <i class="fas fa-globe-americas"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/ben-cutler-783447b5/" id='linkedin'>
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="https://github.com/bcutler94" id='github'>
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="https://angel.co/ben-cutler-1?al_content=view+your+profile&al_source=transaction_feed%2Fnetwork_sidebar">
                                    <i class="fab fa-angellist"></i>

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
                </div>
            </div>
        )
    }

}

export default withRouter(HomePage);
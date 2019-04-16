import { withRouter } from 'react-router-dom';
import Auto from '../home_page/search';
import StockShowContainer from './stock_container';
import React from 'react';
import {Link} from 'react-router-dom';


class StockHome extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout().then(() => this.props.history.push('/'))
    }

    render () {
        return (
            <div className='stock-show'>
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
                        <a href="https://www.linkedin.com/in/ben-cutler-783447b5/" id='linkedin'>
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/bcutler94" id='github'>
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </span>
                    
    
                <Auto props={this.props.history.location}/>
                <StockShowContainer />
            </div>
        )
    }
}

export default withRouter(StockHome);

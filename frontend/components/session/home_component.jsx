import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    logged_in () {
        this.props.user.id !== null
    }

    handleClick (e) {
        e.preventDefault();
        this.props.history.push('/signup');
    }

    render () {
        return (<div className='home-div'>
            <h1>Invest Commission-Free</h1>
            <br/>
            <p>Invest in stocks, ETFs, options, and cryptocurrencies, all commission-free, right from your phone or desktop.</p>
            {/* Button to Sign Up */}
            <div className='signup-div'>
                <button onClick={this.handleClick}>
                    Sign Up
                </button>
            </div>

            {/* Link to Log In */}
            <div className='login-div'>
                <Link to='/login' className=''>
                    Login
                </Link>
            </div>
        </div>
        )
    }

}

export default withRouter(Home);
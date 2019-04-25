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
            <div className='nav-container'>
                {/* Link to Log In */}
                <h2 className='robenhood-h2'>
                    <i className="fas fa-feather-alt"></i>
                    robenhood
                </h2>
                <div className='button-container'>
                    <div className='login-div'>
                        <Link to='/login' className=''>
                            Login
                        </Link>
                    </div>

                    {/* Button to Sign Up */}
                    <div className='signup-div'>
                        <button onClick={this.handleClick}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
            <div className='body-text-img'>
                <div className='login-text'>
                    <h1>Invest <br/>Commission-Free</h1>
                    <p>Invest in stocks, ETFs, options, <br/>and cryptocurrencies, all commission-free,<br/>right from your phone or desktop.</p> 
                </div>
                <div className='img'>
                    <img src='/assets/phone_images-7840ce35b41e034c6cd343a97aab2ede84882c31f67a44da6bda9d325b58ce9c.png' alt="two phones displaying stock info"/>
                </div>
            </div>
           
            <span class='links'>
                Checkout my
                <div>
                    <a href="https://bencutler.dev/" id='site'>Site</a>
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
        )
    }

}

export default withRouter(Home);
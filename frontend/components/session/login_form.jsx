import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../../app/assets/images/login_background.png'

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.login(this.state).then(() => this.props.history.push('/'));
    }

    handleChange (type) {
        return (e) => {
            this.setState( { [type]: e.target.value } )
        };
    }

    renderErrors () {
        // include symbol in error list
        return (<ul>
            {this.props.errors.map((error, i) => {
                return(
                    <li key={i} className='error-li'>
                        {error}
                    </li>
                );
            })}
        </ul>)
    }

    render () {
        return (
            <div className='login-form-div'>
                {/* <img src="/assets/login_background-700d662356e95aa2caae79b2bfccf62e30b546786b2dc49aa9c383d5a2d4250a.png" alt="background"/> */}
                <form onSubmit={this.handleSubmit} className='form-div'>
                <h2>Welcome to Robenhood</h2>
                    <label>Email or Username</label>
                        <input 
                            type="text" 
                            onChange={this.handleChange('email')}/>
                    <label>Password</label>
                        <input 
                            type="password"
                            onChange={this.handleChange('password')}/>
                    <Link to='/'>
                        Forgot your username/password?
                    </Link>
                    {this.renderErrors()}
                    <button>Sign In</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
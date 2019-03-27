import React from 'react';
import { Link } from 'react-router-dom';

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
                <h2>Welcome to Robenhood</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Email or Username
                        <input 
                            type="text" 
                            onChange={this.handleChange('email')}/>
                    </label>
                    <br/>
                    <label>Password
                        <input 
                            type="password"
                            onChange={this.handleChange('password')}/>
                    </label>
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
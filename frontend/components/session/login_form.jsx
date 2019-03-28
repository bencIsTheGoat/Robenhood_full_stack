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

    componentWillUnmount () {
        this.props.clearErrors();
    }

    renderErrors () {
        // include symbol in error list
        if (this.props.errors !== undefined) {
            return (<ul>
                {this.props.errors.map((error, i) => {
                    return(
                        <li key={i} className='error-li'>
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </li>
                    );
                })}
            </ul>)
        }
    }

    render() {
    }
    
    render () {
        return (
            <div className='login-page'>
                <div className='background-image'>
                    <img src = {window.backgroundImage}/>;
                </div>
                <div className='login-form-div'>
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
                        <div className='errors-ul'>
                            {this.renderErrors()}
                        </div>
                        <button>Sign In</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
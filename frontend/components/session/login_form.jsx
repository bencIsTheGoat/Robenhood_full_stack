import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.demoUser = this.demoUser.bind(this);
        this.forgotInfo = this.forgotInfo.bind(this);
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

    demoUser (e) {
        e.preventDefault();
        this.props.login({email: 'demo@robenhood.com', password: 'robenhood'}).then(() => this.props.history.push('/'))
    }

    forgotInfo (e) {
        e.preventDefault()
        this.props.history.push('/')
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
                        <div className='login-button-div'>
                            <button onClick={this.forgotInfo} className='link-button'>
                                Forgot your username/password?
                            </button>
                            <p className='link-p'>
                                or
                            </p>
                            <button onClick={this.demoUser} className='link-button'>
                                Try Out a Demo Session!
                            </button>
                        </div>
                        <div className='errors-ul'>
                            {this.renderErrors()}
                        </div>
                        <button className='signin'>Sign In</button>

                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
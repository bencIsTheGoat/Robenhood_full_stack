import React from 'react';

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
        this.props.login(this.state).then(() => this.props.history.push('/home'));
    }

    handleChange (type) {
        return (e) => {
            this.setState( { [type]: e.target.value } );
        };
    }

    componentWillUnmount () {
        this.props.clearErrors();
    }

    renderErrors () {
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
            </ul>);
        }
    }

    demoUser (e) {
        e.preventDefault();
        this.props.login({email: 'anna@gmail.com', password: '123456'}).then(() => this.props.history.push('/home'));
    }

    forgotInfo (e) {
        e.preventDefault();
        this.props.history.push('/signup');
    }
    
    render () {
        return (
            <div className='login-page'>
                <div className='background-image'>
                    <img src = {window.backgroundImage}/>
                </div>
                <div className='login-form-div'>
                    <form className='form-div'>
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
                        </div>
                        <div className='errors-ul'>
                            {this.renderErrors()}
                        </div>
                        <div className='login-demo-buttons'>
                            <button className='signin' onClick={this.handleSubmit}>Sign In</button>
                            <button onClick={this.demoUser} className='signin'>
                                Try Demo Session
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
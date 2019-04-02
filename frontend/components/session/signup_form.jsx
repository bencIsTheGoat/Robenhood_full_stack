import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

class SignupForm extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = {first_name: '', last_name: '', email: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.signup(this.state).then(() => this.props.history.push('/home'))
       
    }

    handleChange (type) {
        return (e) => (
            this.setState({ [type]: e.target.value})
        );
    }

    componentWillUnmount () {
        this.props.clearErrors();
        this.props.history.push('/home');
    }

    renderErrors (type) {
        // include symbol in error list
        if (this.props.errors[type] !== undefined) {
            let arr = type.split('_').join(' ');
            return (
                <ul>
                    <li className='error-li'>
                        <i className="fas fa-exclamation-circle"></i>
                        {arr + ' ' + this.props.errors[type]}
                    </li>
            </ul>)
        }
    }

    render () {
        return (
            <div className='total'>
                <h2 className='robenhood-h2'>
                        <i className="fas fa-feather-alt"></i>
                        robenhood
                </h2>
                <div className='signup'>
                    <div className='headers-div'>
                        <h1>Make Your Money Move</h1>
                        <h2>Robenhood lets you invest in companies you love, commission-free.</h2>
                    </div>
                    <form className='login-form'>
                        <div className='names-div'>
                            <div className='first-name-div'>
                                <input 
                                    type="text" 
                                    placeholder='First name'
                                    value={this.state.first_name}
                                    onChange={this.handleChange('first_name')}/>
                                    <div className='errors-ul'>
                                        {this.renderErrors('first_name')}
                                    </div>
                            </div>
                            <div className='last-name-div'>
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    value={this.state.last_name}
                                    onChange={this.handleChange('last_name')} />
                                <div className='errors-ul'>
                                    {this.renderErrors('last_name')}
                                </div>
                            </div>
                        </div>
                        <div className='info-div'>
                            <div className='email-div'>
                                <input
                                    type="text"
                                    placeholder="Email address"
                                    value={this.state.email}
                                    onChange={this.handleChange('email')} />
                                <div className='errors-ul'>
                                    {this.renderErrors('email')}
                                </div>
                            </div>
                            <div className='password-div'>
                                <input
                                    type="password"
                                    placeholder="Password (min. 6 characters)"
                                    value={this.state.password}
                                    onChange={this.handleChange('password')} />
                                <div className='errors-ul'>
                                    {this.renderErrors('password')}
                                </div>
                            </div>
                        </div>
                        <button onClick={this.handleSubmit}>Continue</button>
                        <div className='login-link'>
                            <p className='form-link-p'>Already Started? <Link to='/login'>Log in to complete your application.</Link></p>
                        </div> 
                        <div className='login-disclosure'>
                            <p className='form-p1'>All investments involve risk and the past performance of a security, or financial product does not guarantee future results or gainz. Keep in mind that while diversification may help spread risk it does not assure you a yatch, or protect against loss, in a down market. There is always the potential of losing money when you invest in securities, or other financial products. Investors should consider their investment objectives and risks carefully before investing. </p>
                            <p className='form-p2'>All securities and investments are offered to self-directed customers by Robenhood Financial, LLC, member <a href="http://www.finra.org/">FINRA</a> and <a href="https://www.sipc.org/">SIPC</a>. Additional information about your broker can be found by clicking here. Robenhood Financial, LLC is a wholly owned subsidiary of Cutler Industries, Inc.</p>
                            <p className='form-p3'>Check the background of Robenhood Financial LLC and Robenhood Securities, LLC on <a href="https://brokercheck.finra.org/">FINRA’s BrokerCheck</a>.</p>
                            <p>© 2019 Robenhood. All rights reserved.</p>
                        </div>
                    </form>
                </div>
            </div>

        );
    }



}

export default SignupForm;
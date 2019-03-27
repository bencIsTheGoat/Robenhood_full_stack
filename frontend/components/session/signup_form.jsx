import React from 'react';
import { Link, Route } from 'react-router-dom';

class SignupForm extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = {first_name: '', last_name: '', email: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.signup(this.state).then(() => this.props.history.push('/'));
    }

    handleChange (type) {
        return (e) => (
            this.setState({ [type]: e.target.value})
        );
    }

    renderErrors (type) {
        // include symbol in error list
        if (this.props.errors[type] !== undefined) {
            return (<ul>
                <li>{this.props.errors[type]}</li>
            </ul>)
        }
    }

    render () {
        // <Route path='/' component={() => { window.location = 'http://www.finra.org/'; return null; }} />
        return (
            <div className='login'>
                <h1>Make Your Money Move</h1>
                <h2>Robenhood lets you invest in companies you love, commission-free.</h2>
                <form onSubmit={this.handleSubmit} className='login-form'>
                    <input 
                        type="text" 
                        placeholder='First name'
                        value={this.state.first_name}
                        onChange={this.handleChange('first_name')}/>
                    {this.renderErrors('first_name')}
                    <input
                        type="text"
                        placeholder="Last name"
                        value={this.state.last_name}
                        onChange={this.handleChange('last_name')} />
                    {this.renderErrors('last_name')}
                    <input
                        type="text"
                        placeholder="Email address"
                        value={this.state.email}
                        onChange={this.handleChange('email')} />
                    {this.renderErrors('email')}
                    <input
                        type="password"
                        placeholder="Password (min. 6 characters)"
                        value={this.state.password}
                        onChange={this.handleChange('password')} />
                    {this.renderErrors('password')}
                    <button>Continue</button>
                    <br/>
                    <p className='form-link-p'>Already Started? <Link to='/login'>Log in to complete your application.</Link></p>
                    <p className='form-p'>All investments involve risk and the past performance of a security, or financial product does not guarantee future results or gainz. Keep in mind that while diversification may help spread risk it does not assure you a yatch, or protect against loss, in a down market. There is always the potential of losing money when you invest in securities, or other financial products. Investors should consider their investment objectives and risks carefully before investing. </p>
                    <br/>
                    <p className='form-p'>All securities and investments are offered to self-directed customers by Robenhood Financial, LLC, member <a href="http://www.finra.org/">FINRA</a> and <a href="https://www.sipc.org/">SIPC</a>. Additional information about your broker can be found by clicking here. Robenhood Financial, LLC is a wholly owned subsidiary of Cutler Industries, Inc.</p>
                    <p className='form-p'>Check the background of Robenhood Financial LLC and Robenhood Securities, LLC on <a href="https://brokercheck.finra.org/">FINRA’s BrokerCheck</a>.</p>
                    <p>© 2019 Robenhood. All rights reserved.</p>
                </form>
            </div>

        );
    }



}

export default SignupForm;
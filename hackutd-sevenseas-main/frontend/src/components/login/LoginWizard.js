import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login, register, setUser } from '../../hook';
import '../../css/login/loginwizard.css';
export class LoginField extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className='login-field'>
                <div className='login-field-header'>{this.props.name}</div>
                <input id={this.props.id} type={this.props.type} className='login-field-textfield' placeholder={this.props.defaultValue}></input>
            </div>
        );
    }
}
export default class LoginWizard extends Component {
    constructor() {
        super();
        this.state = { status: '' };
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <div id='login-wizard'>
                <div id='login-title'>Login</div>
                <div id='login-status'>{this.state.status}</div>
                <LoginField id='login-username' type='text' name='Username' defaultValue='Enter your Username...' />
                <LoginField id='login-password' type='password' name='Password' defaultValue='Enter your Password...' />
                <div id='login-buttons'>
                    <div id='login-button' className='wizard-button' onClick={() => this.handleLogin(document.getElementById('login-username').value, document.getElementById('login-password').value) }>Login</div>
                    <div id='register-button' className='wizard-button' onClick={() => this.handleRegister(document.getElementById('login-username').value, document.getElementById('login-password').value) }>Register</div>
                </div>
            </div>
        );
    }
    async handleLogin(username, password) {
        if (username === '' || password === '') {
            this.setState({ status: 'Please enter a valid username and password...' });
            return;
        }
        let data = await login(username, password);
        if (!data) {
            this.setState({ status: 'Connection error. Please try again later...' });
            return;
        }
        data = data.data;
        if (data.result !== 0) {
            switch (data.result) {
                case -1:
                    this.setState({ status: 'Invalid password...' });
                    break;
                case -2:
                    this.setState({ status: 'Username does not exist...' });
                    break;
                default:
                    this.setState({ status: 'Unexpected error...' });
                    break;
            }
        } else {
            setUser({ username: data.username, password: data.password, scripts: data.scripts });
            this.setState({ status: '', redirect: '/account' });
        }
    }
    async handleRegister(username, password) {
        if (username === '' || password === '') {
            this.setState({ status: 'Please enter a valid username and password...' });
            return;
        }
        let data = await register(username, password);
        if (!data) {
            this.setState({ status: 'Connection error. Please try again later...' });
            return;
        }
        data = data.data;
        if (data.result !== 0) {
            switch (data.result) {
                case -1:
                    this.setState({ status: 'Username already exists...' })
                    break;
                default:
                    this.setState({ status: 'Unexpected error...' })
                    break;
            }
        } else {
            data = data.data;
            setUser({ username: data.username, password: data.password, scripts: data.scripts });
            this.setState({ status: '', redirect: '/account' });
        }
    }
}
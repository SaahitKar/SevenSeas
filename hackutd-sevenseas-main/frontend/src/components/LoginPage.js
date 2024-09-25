import { Component } from 'react';
import LoginWizard from './login/LoginWizard';
export default class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div id='login-page'>
                <LoginWizard />
            </div>
        );
    }
}
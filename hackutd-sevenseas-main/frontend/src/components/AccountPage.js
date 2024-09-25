import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, logout } from '../hook';
import '../css/accountpage.css';
export class AccountScript extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/editor',
                state: this.state.data
            }} />;
        }
        return (
            <div className='account-script' onClick={() =>
                this.setState({
                    redirect: '/editor', data: {
                        name: this.props.name,
                        description: this.props.desc,
                        code: this.props.code,
                        log: this.props.log
                    }
                })
            }>
                <div className='account-script-name'>{this.props.name}</div>
                <div className='account-script-description'>{this.props.desc}</div>
            </div>
        )
    }
}
export default class AccountPage extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        if (!getUser()) {
            return <Redirect to='/login' />;
        }
        if (this.state.redirect) {
            if (this.state.data) {
                return <Redirect to={{
                    pathname: '/editor',
                    state: this.state.data
                }} />;
            } else {
                return <Redirect to={this.state.redirect} />;
            }
        }
        const scripts = [];
        for (let key of getUser().scripts) {
            scripts.push(<AccountScript key={key.name} name={key.name} desc={key.description} code={key.code} log={key.log} />);
        }
        return (
            <div id='account-page'>
                <div id='account-info'>
                    <div id='account-title'>Account Information</div>
                    <div className='account-field-title'>Username</div>
                    <div className='account-field'>{getUser().username}</div>
                    <div id='scripts-title' className='account-field-title' onClick={() => {
                        this.setState({
                            redirect: '/editor', data: {
                                name: 'new_script',
                                description: 'A completely new simulation algorithm.',
                                code: '',
                                log: ''
                            }
                        });
                    }}>Scripts</div>
                    <div id='account-scripts'>
                        {scripts}
                    </div>
                    <div id='account-logout' onClick={() => {
                        logout();
                        this.setState({});
                    } }>LOGOUT</div>
                </div>
            </div>
        );
    }
}
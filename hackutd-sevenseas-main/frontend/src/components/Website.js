import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationBar from './core/NavigationBar';
import Footer from './core/Footer';
import HomePage from './HomePage';
import DocumentationPage from './DocumentationPage';
import LoginPage from './LoginPage';
import AccountPage from './AccountPage';
import EditorPage from './EditorPage';
import '../css/website.css';
export default class Website extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div id='website'>
                <NavigationBar />
                <Switch>
                    <Route path='/editor' render={ (props) => <EditorPage {...props} /> }/>
                    <Route path='/account'><AccountPage /></Route>
                    <Route path='/login'><LoginPage /></Route>
                    <Route path='/documentation'><DocumentationPage /></Route>
                    <Route path='/'><HomePage /></Route>
                </Switch>
                <Footer />
            </div>
        );
    }
}
import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/core/navigationbar.css';
export default class NavigationBar extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div id='navigation'>
                <ul id='nav-bar'>
                    <Link to='/'><li id='nav-home' className='nav-item'>Home<div className='nav-underline'></div></li></Link>
                    <Link to='/documentation'><li id='nav-docs' className='nav-item'>Docs<div className='nav-underline'></div></li></Link>
                    <Link to='/account'><li id='nav-profile' className='nav-item'>Account<div className='nav-underline'></div></li></Link>
                </ul>
            </div>
        );
    }
}
import { Component } from 'react';
import '../css/homepage.css';
import SuccessStep from './home/SuccessStep';
export default class HomePage extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div id='home-page'>
                <div id='home-welcome'>Trading Docks</div>
                <div id='home-mission'><span className='text-highlight-0'>Trading Docks</span> is a fully-functional, <span className='text-highlight-0'>FREE</span> stock-trading simulator designed to reduce the anxiety and frustration that comes with classical day trading. Our aim is to provide stock traders, new and experienced alike, a tool to safely simulate days on the market. Using a custom-built algorithm framework, you'll be able to craft and modify your own stock-trading algorithms and log the results for analysis down the line.</div>
                <div id='success-steps'>
                    <SuccessStep title='Step 1' desc='Log-in to our customized account database, where you can access or create scripts and manage account data.'/>
                    <SuccessStep title='Step 2' desc='Create and manage your algorithms with our completely custom, powerful and intuitive language designed for new traders.'/>
                    <SuccessStep title='Step 3' desc='Record and analyze your trading algorithm to get insight about the current marketflow.'/>
                </div>
            </div>
        );
    }
}
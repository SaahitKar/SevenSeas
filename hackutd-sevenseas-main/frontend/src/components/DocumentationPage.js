import { Component } from 'react';
import '../css/documentationpage.css';
export class DocumentationEntry extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className='doc-entry'>
                <div className='doc-entry-title'>{this.props.title}</div>
                <div className='doc-entry-desc'>{this.props.desc}</div>
                <div className='doc-entry-example'>{this.props.example}</div>
            </div>
        );
    }
}
export default class DocumentationPage extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div id='documentation-page'>
                <div id='documentation'>
                    <div id='documentation-title'>Documentation</div>
                    <div id='doc-entries'>
                        <DocumentationEntry title='Buy Stocks' desc='To buy a stock, use the buy command. The buy command will require a stock ID, shares to buy, price modifier and market stat.' example='buy AAPL 12 + 140 MACD'/>
                        <DocumentationEntry title='Sell Stocks' desc='To sell a stock, use the sell command. The sell command will require a stock ID, shares to sell, price modifier and market stat.' example='sell AAPL 4 - 140 MACD' />
                        <DocumentationEntry title='Wait' desc='Pausing your algorithm in between transactions can be very advantageous. To pause your program, use the wait command and git it a pause duration.' example='wait 60'/>
                        <DocumentationEntry title='Stop' desc='You may want to stop your algorithm from continuing in order to take some time to analyze your data when you reach a stopping point. To do so, use the kill command.' example='kill - 50'/>
                    </div>
                </div>
            </div>
        );
    }
}
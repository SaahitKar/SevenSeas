import { Component } from 'react';
import '../../css/home/successstep.css';
export default class SuccessStep extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className='success-step'>
                <div className='success-step-title'>{this.props.title}</div>
                <div className='success-step-desc'>{this.props.desc}</div>
            </div>
        );
    }
}
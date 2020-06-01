import React, { Component } from 'react';
import './Law.css'

export default class Law extends Component {
    static displayName = Law.name;

    constructor(props) {
        super(props);
        this.state = {
            Laws: (props === undefined ? [] : props.ActiveLaw.state.Laws)
        };
    }

    render() {
        return (
            <div id="LAWS" className='page-header'>
                <h1>ACTIVE LAWS</h1>
                <ul className='activeLaws'>
                    {this.state.Laws.map(item =>
                        <li key={item.key}>{item.key}:  <i className={item.icon}></i> : {item.impact}</li>
                    )}
                </ul>
            </div>
        );
}
}
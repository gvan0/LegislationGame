import React, { Component } from 'react';
import Issue from './Issue.js';

export default class BlueCard extends Issue {
    static displayName = BlueCard.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
          
            <div className="col-md-4">
                <div className="card-container">
                    <div className="card item" data-name="card-1">
                        <div className="box blue">
                            <p className="draw-a-card white-text">
                                CARD {this.props.Issue.state.issue}
                            </p>
                        </div>
                        <div className="card-inner white icon">
                            <i className={this.props.Issue.state.icon}></i>
                            <p className="card-title ">
                                {this.props.Issue.state.score > 0 ? "►" :
                                 this.props.Issue.state.score < 0 ? "◄" : "O"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
       
    );
    }
}
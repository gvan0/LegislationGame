import React from 'react';
import Issue from './Issue.js';

export default class RedCard extends Issue {
    static displayName = RedCard.name;

    render() {
        return (
            <div className="col-md-2">
                <div className="card-container">
                    <div className="card item" data-name="card-1">
                        <div className="box white">
                            <p className="draw-a-card">
                                CARD {this.props.Issue.state.issue}</p>
                        </div>
                        <div className="card-inner red icon">
                            <i className={this.props.Issue.state.icon}></i>
                            <p className="card-title white-text  ">
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
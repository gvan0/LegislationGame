import React from 'react';
import Issue from './Issue.js';
import './Cards.css';

export default class RedCard extends Issue {
    static displayName = RedCard.name;

    render() {
        return (
            <div className="col-md-2">
                <div className="card-container">
                    <div className="card item" data-name="card-1">
                        <div className="box red">
                            <p className="draw-a-card white-text">
                                {this.scoreString()} {this.issueString()}
                            </p>
                            <p className="draw-a-card white-text float-right" onClick={this.props.onDiscard}> X </p>
                        </div>
                        <div className="card-inner white icon">
                            <i className={this.iconOptions(this.props.issue)}></i>
                            <p className="card-title">
                                {this.scoreString()}
                            </p>
                        </div>
                        <div className="box red bottom">
                            <p className="draw-a-card white-text">
                                {this.scoreString()} {this.issueString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
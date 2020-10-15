import React from 'react';
import Issue from './Issue.js';

export default class RedCard extends Issue {
    static displayName = RedCard.name;

    render() {
        return (
            <div className="col-md-2">
                <div className="card-container">
                    <div className="card item" data-name="card-1">
                        <div className="box white" onClick={this.props.onDiscard}>
                            <p className="draw-a-card">
                                CARD {this.props.issue}
                            </p>
                        </div>
                        <div className="card-inner red icon">
                            <i className={this.iconOptions(this.props.issue)}></i>
                            <p className="card-title white-text">
                                {this.scoreString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
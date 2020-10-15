import React from 'react';
import Issue from './Issue.js';

export default class BlueCard extends Issue {
    static displayName = BlueCard.name;

    render() {
        return (
            <div className="col-md-2">
                <div className="card-container">
                    <div className="card item" data-name="card-1">
                        <div className="box blue">
                            <p className="draw-a-card white-text">
                                CARD {this.props.issue}
                            </p>
                        </div>
                        <div className="card-inner white icon">
                            <i className={this.iconOptions(this.props.issue)}></i>
                            <p className="card-title">
                                {this.scoreString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
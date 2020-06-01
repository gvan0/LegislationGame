import React, { Component } from 'react';

export default class RedCard extends Component {
    static displayName = RedCard.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-2">
                <div className="card-container">
                    <div className="card item" data-name="card-1">
                        <div className="box white">
                            <p className="draw-a-card">
                                CARD {this.props.cardInfo.key}</p>
                        </div>
                        <div className="card-inner red icon">
                        <i className={this.props.cardInfo.icon}></i>
                            <p className="card-title white-text  ">
                                {this.props.cardInfo.impact}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
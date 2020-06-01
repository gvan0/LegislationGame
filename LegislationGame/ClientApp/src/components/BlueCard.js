import React, { Component } from 'react';

export default class BlueCard extends Component {
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
                                CARD {this.props.cardInfo.key}
                            </p>
                        </div>
                        <div className="card-inner white icon">
                            <i className={this.props.cardInfo.icon}></i>
                            <p className="card-title ">
                            {this.props.cardInfo.impact}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
       
    );
    }
}
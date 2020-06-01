import React, { Component } from 'react';

export default class Parameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blueDeckSize: props.blueDeckSize,
            playerCount: props.playerCount,
            billSize: props.billSize,
            handSize: props.handSize
        };
    }

    render() {
        return (
            <form className="form-compact hidden" method="POST">
                <div className="form-group">
                    <label for="blueDeckSize">Blue Deck Size: {this.state.blueDeckSize}</label>
                    <input type="range" className="form-control" value={this.state.blueDeckSize}
                        min="5" max="20" step="1" id="blueDeckSize" />
                </div>
                <div className="form-group">
                    <label for="playerCount">Player Count: {this.state.playerCount}</label>
                    <input type="range" className="form-control" value={this.state.playerCount}
                        min="1" max="10" step="1" id="playerCount" />
                </div>
                <div className="form-group">
                    <label for="billSize">Bill Size: {this.state.billSize}</label>
                    <input type="range" className="form-control" value={this.state.billSize}
                        min="2" max="6" step="1" name="billSize" id="billSize" />
                </div>
                <div className="form-group">
                    <label for="handSize">Hand Size: {this.state.handSize}</label>
                    <input type="range" className="form-control" value={this.state.handSize}
                        min="1" max="{this.state.blueDeckSize}" step="1" id="handSize" />
                </div>
                <button type="button" className="btn btn-primary disabled">RESTART</button>
            </form>
            );
    }
}
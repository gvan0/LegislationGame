import React, { Component } from 'react';

export default class Parameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCode: "",
            blueDeckSize: props.blueDeckSize,
            billSize: props.billSize,
            handSize: props.handSize
        };
        this.changeBlueSize = this.changeBlueSize.bind(this);
        this.changeBillSize = this.changeBillSize.bind(this);
        this.changeHandSize = this.changeHandSize.bind(this);
        this.changeGameCode = this.changeGameCode.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    changeBlueSize(event) {
        this.setState({ blueDeckSize: event.target.value });
    }
    changeBillSize(event) {
        this.setState({ billSize: event.target.value });
    }
    changeHandSize(event) {
        this.setState({ handSize: event.target.value });
    }
    changeGameCode(event) {
        this.setState({ gameCode: event.target.value });
    }

    joinGame() {
        this.props.onInitGame(this);
    }

    render() {
        return (
            <form className="form-compact" method="POST">
                <div className="form-group">
                    <label htmlFor="userName">User Name:</label>
                    <input type="text" className="form-control" value="" id="userName" />
                    <label htmlFor="gameCode">Game Code:</label>
                    <input type="text" className="form-control" value={this.state.gameCode} id="gameCode" onChange={this.changeGameCode} />
                </div>
                <div className="form-group">
                    <label htmlFor="blueDeckSize">Blue Deck Size: {this.state.blueDeckSize}</label>
                    <input type="range" className="form-control" value={this.state.blueDeckSize}
                        min="4" max="45" step="1" id="blueDeckSize" onChange={this.changeBlueSize} />
                </div>
                <div className="form-group">
                    <label htmlFor="billSize">Bill Size: {this.state.billSize}</label>
                    <input type="range" className="form-control" value={this.state.billSize}
                        min="1" max={this.state.blueDeckSize} step="1" name="billSize" id="billSize" onChange={this.changeBillSize} />
                </div>
                <div className="form-group">
                    <label htmlFor="handSize">Hand Size: {this.state.handSize}</label>
                    <input type="range" className="form-control" value={this.state.handSize}
                        min="1" max={this.state.blueDeckSize} step="1" id="handSize" onChange={this.changeHandSize} />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.joinGame}>START</button>
            </form>
            );
    }
}
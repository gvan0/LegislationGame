import React, { Component } from 'react';
import axios from "axios";

export class Host extends Component {
    static displayName = Host.name;

    constructor(props) {
        super(props);
        this.state = {
            game_code: "",
            game_pass: "",
            deck_size: 8,
            bill_size: 2,
            hand_size: 3
        };
        this.changeDeckSize = this.changeDeckSize.bind(this);
        this.changeBillSize = this.changeBillSize.bind(this);
        this.changeHandSize = this.changehand_size.bind(this);
        this.changeGameCode = this.changeGameCode.bind(this);
        this.changeGamePass = this.changeGamePass.bind(this);
        this.createGame = this.createGame.bind(this);
    }

    changeDeckSize(event) {
        this.setState({
            deck_size: event.target.value,
            bill_size: Math.min(this.state.bill_size, event.target.value),
            hand_size: Math.min(this.state.hand_size, event.target.value)
        });
    }
    changeBillSize(event) {
        this.setState({ bill_size: event.target.value });
    }
    changehand_size(event) {
        this.setState({ hand_size: event.target.value });
    }
    changeGameCode(event) {
        this.setState({ game_code: event.target.value });
    }
    changeGamePass(event) {
        this.setState({ game_pass: event.target.value });
    }

    createGame() {
        axios.post('api/Game', {
            name: this.state.game_code,
            password: this.state.game_pass,
            deck_size: parseInt(this.state.deck_size),
            bill_size: parseInt(this.state.bill_size),
            hand_size: parseInt(this.state.hand_size)
        }).then( function (response) {
            alert("Game ready");
        })
        .catch(function (error) {
            console.log(error.toJSON());
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <form className="col-12 col-sm-8 col-lg-6" method="POST">
                        <div className="form-group">
                            <label htmlFor="gameCode">Game Code</label>
                            <input type="text" className="form-control" value={this.state.game_code} id="gameCode" onChange={this.changeGameCode} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameCode">Game Password (leave blank for no password)</label>
                            <input type="password" className="form-control" value={this.state.game_pass} id="gameCode" onChange={this.changeGamePass} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="deck_size">Issue Count: {this.state.deck_size}</label>
                            <input type="range" className="form-control" value={this.state.deck_size}
                                min="4" max="44" step="1" id="deck_size" onChange={this.changeDeckSize} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bill_size">Bill Size: {this.state.bill_size}</label>
                            <input type="range" className="form-control" value={this.state.bill_size}
                                min="1" max={this.state.deck_size} step="1" name="bill_size" id="bill_size" onChange={this.changeBillSize} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hand_size">Hand Size: {this.state.hand_size}</label>
                            <input type="range" className="form-control" value={this.state.hand_size}
                                min="1" max={this.state.deck_size} step="1" id="hand_size" onChange={this.changeHandSize} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.createGame}>START</button>
                    </form>
                </div>
            </div>
        );
    }
}
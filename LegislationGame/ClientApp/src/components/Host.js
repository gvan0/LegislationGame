import React, { Component } from 'react';
import axios from "axios";

export class Host extends Component {
    constructor(props) {
        super(props);
        if (props.gameCode === undefined || props.gameCode === "") {
            this.state = {
                gameCode: "",
                deck_size: 8,
                bill_size: 2,
                hand_size: 4
            };
        } else {
            this.state = {
                gameCode: this.props.gameCode,
                deck_size: this.props.deck_size,
                bill_size: this.props.bill_size,
                hand_size: this.props.hand_size
            }
        }
        this.changeBlueSize = this.changeBlueSize.bind(this);
        this.changebill_size = this.changebill_size.bind(this);
        this.changehand_size = this.changehand_size.bind(this);
        this.changeGameCode = this.changeGameCode.bind(this);
        this.createGame = this.createGame.bind(this);
    }

    changeBlueSize(event) {
        this.setState({ deck_size: event.target.value });
    }
    changebill_size(event) {
        this.setState({ bill_size: event.target.value });
    }
    changehand_size(event) {
        this.setState({ hand_size: event.target.value });
    }
    changeGameCode(event) {
        this.setState({ gameCode: event.target.value });
    }

    createGame() {
        axios.post('api/Game', {
            name: this.state.gameCode,
            deck_size: parseInt(this.state.deck_size),
            bill_size: parseInt(this.state.bill_size),
            hand_size: parseInt(this.state.hand_size)
        }).then( function (response) {
            alert(response.data);
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
                            <label htmlFor="gameCode">Game Code:</label>
                            <input type="text" className="form-control" value={this.state.gameCode} id="gameCode" onChange={this.changeGameCode} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="deck_size">Blue Deck Size: {this.state.deck_size}</label>
                            <input type="range" className="form-control" value={this.state.deck_size}
                                min="4" max="45" step="1" id="deck_size" onChange={this.changeBlueSize} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bill_size">Bill Size: {this.state.bill_size}</label>
                            <input type="range" className="form-control" value={this.state.bill_size}
                                min="1" max={this.state.deck_size} step="1" name="bill_size" id="bill_size" onChange={this.changebill_size} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hand_size">Hand Size: {this.state.hand_size}</label>
                            <input type="range" className="form-control" value={this.state.hand_size}
                                min="1" max={this.state.deck_size} step="1" id="hand_size" onChange={this.changehand_size} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.createGame}>START</button>
                    </form>
                </div>
            </div>
        );
    }
}
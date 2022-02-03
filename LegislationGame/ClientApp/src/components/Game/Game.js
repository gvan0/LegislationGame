import React, { Component } from 'react';
import Law from '../Law.js';
import Bill from '../Bill.js';
import Player from '../Player.js';
import Issue from '../Issues/Issue.js';
import Login from './Forms/Login.js';
import MessageBox from '../MessageBox.js'
import axios from 'axios';
import './Game.css';

export class Game extends Component {
    static displayName = Game.name;

    constructor(props) {
        super(props);
        this.state = {
            init: false
        };
        this.blankSlate = this.blankSlate.bind(this);
        this.handlePassage = this.handlePassage.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.logProposal = this.logProposal.bind(this);
    }

    blankSlate(size) {
        var blankLaw = [];
        for (var x = 0; x < size; x++) {
            var iss = new Issue({ issue: x + 1, score: 0 });
            blankLaw.push(iss);
        }
        return blankLaw;
    }

    logProposal(bill) {
        this.setState({ bill_id: bill.billID})
    }

    handlePassage(Slate) {
        var newLaw = this.state.MyLaw;
        for (var pb_law = 0; pb_law < Slate.length; pb_law++) {
            newLaw[pb_law].score += Slate[pb_law].score;
        }
        this.setState({ MyLaw: newLaw });
    }

    joinGame(user, game) {
        axios.get("api/Game/" + game)
        .then(response => {
            const newGame = response.data;
            //const newParams =  {
            //    gameCode: newGame.name,
            //    deck_size: newGame.deck_size,
            //    bill_size: newGame.bill_size,
            //    hand_size: newGame.hand_size
            //};
            this.setState({
                init: true,
                game_id: game,
                user_id: user,
                Game: newGame
            });
            alert("Game loaded: " + newGame.name);
        })
        .catch(function (error) {
            if (error.response.status === 404) {
                alert("Game not found. Please try again.");
            } else 
                alert("Something went wrong: Game.js\n" + error.message);
        });
    }

    render() {
        if (!this.state.init) {
            return (
                <Login onInitGame={this.joinGame} game_id={this.props.match.params.id}> </Login>
            );
        } else {
            var Game = this.state.Game;
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9 col-xs-10"><Bill onPassLaw={this.handlePassage} onPropose={this.logProposal} deckSize={Game.deck_size}
                            minSize={Game.bill_size} bill_id={Game.last_bill}></Bill></div>
                        <div className="col-md-3 col-xs-2"><Law game_id={this.state.game_id} ActiveLaw={Game.law} ></Law></div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 col-xs-12"><Player game_id={this.state.game_id} user_id={this.state.user_id}></Player></div>
                        <div className="col-md-3 col-xs-12"><MessageBox game_id={this.state.game_id}></MessageBox></div>
                    </div>
                </div>
            );
        }
    }
}
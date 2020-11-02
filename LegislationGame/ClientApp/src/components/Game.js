import React, { Component } from 'react';
import Law from './Law.js';
import Bill from './Bill.js';
import Player from './Player.js';
import Issue from './Issue.js';
import Login from './Login.js';
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
    }

    blankSlate(size) {
        var blankLaw = [];
        for (var x = 0; x < size; x++) {
            var iss = new Issue({ issue: x + 1, score: 0 });
            blankLaw.push(iss);
        }
        return blankLaw;
    }

    handlePassage(Slate) {
        var newLaw = this.state.MyLaw;
        for (var pb_law = 0; pb_law < Slate.length; pb_law++) {
            newLaw[pb_law].score += Slate[pb_law].score;
        }
        this.setState({ MyLaw: newLaw });

        /*var goalsPassed = 0;
        var phand = this.state.MyPlayer.state.redCards;
        for (var y = 0; y < this.state.MyParams.state.hand_size; y++) {
            var searchLaw2 = this.state.MyLaw.state.Laws.find(item => item.state.issue === phand[y].state.issue);
            if (searchLaw2 !== undefined) {
                if(phand[y].scoreAlign(searchLaw2.state.score))
                    goalsPassed++;
            }
        }
        if (goalsPassed >= this.state.MyParams.state.hand_size)
            alert(this.state.MyPlayer.state.name + " wins!");*/

        /*var MyNewPlayer = this.state.MyPlayer;
        MyNewPlayer.state = { name: MyNewPlayer.state.name, redCards: MyNewPlayer.state.redCards, money: MyNewPlayer.state.money + 1 };
        this.setState({ MyPlayer: MyNewPlayer });*/
    }

    joinGame(user, game) {
        axios.get("api/Game/" + game)
        .then(response => {
            const newGame = response.data;
            const newParams =  {
                gameCode: newGame.name,
                deck_size: newGame.deck_size,
                bill_size: newGame.bill_size,
                hand_size: newGame.hand_size
            };
            this.setState({
                init: true,
                MyParams: newParams,
                MyLaw: newGame.law,
                game_id: game,
                user_id: user,
                bill_id: newGame.last_bill
            });
            alert("Game loaded: " + newGame.name);
        })
        .catch(function (error) {
            if (error.response.status === 404) {
                alert("Game not found. Please check your spelling.");
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
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9 col-xs-10"><Bill onPassLaw={this.handlePassage} deckSize={this.state.MyParams.deck_size} minSize={this.state.MyParams.bill_size} bill_id={this.state.bill_id}></Bill></div>
                        <div className="col-md-3 col-xs-2"><Law game_id={this.state.game_id} ActiveLaw={this.state.MyLaw} ></Law></div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 col-xs-10"><Player game_id={this.state.game_id} user_id={this.state.user_id}></Player></div>
                    </div>
                </div>
            );
        }
    }
}
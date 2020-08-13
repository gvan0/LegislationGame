import React, { Component } from 'react';
import Law from './Law.js';
import Bill from './Bill.js';
import Player from './Player.js';
import Issue from './Issue.js';
import BlueCard from './BlueCard.js';
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
        this.handleVote = this.handleVote.bind(this);
        this.replaceCard = this.replaceCard.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    replaceCard(issue, score) {
        var newBill = this.state.MyBill;
        var newCards = newBill.state.blueCards;
        var repIssue = new BlueCard({ issue, score });
        newCards[issue-1] = repIssue;
        newBill.setState({blueCards: newCards});
        this.state.MyBill.setState({ MyBill: newBill });
    }

    blankSlate(size) {
        var blankLaw = [];
        for (var x = 0; x < size; x++) {
            var iss = new Issue({ issue: x + 1, score: 0 });
            blankLaw[x] = iss;
        }
        return blankLaw;
    }

    handleVote(Slate) {
        this.setState({ MyBill: Slate });
        if (Slate.state.Ayes + Slate.state.Nays < this.state.playerCount)
            return;

        if (Slate.state.Ayes > Slate.state.Nays) {
            //var searchLaw = undefined;
            var newLaw = this.state.MyLaw;
            var PassedBill = Slate.state.blueCards;
            for (var pb_law = 0; pb_law < PassedBill.length; pb_law++) {
                var searchLaw1 = newLaw.state.Laws.find(item => item.state.issue === PassedBill[pb_law].state.issue);

                if (searchLaw1 === undefined)
                    newLaw.state.Laws[newLaw.state.Laws.length] = PassedBill[pb_law];
                else {
                    searchLaw1 = new Issue({ issue: searchLaw1.state.issue, score: searchLaw1.state.score + PassedBill[pb_law].state.score });
                    for (var z = 0; z < newLaw.state.Laws.length; z++) {
                        if (newLaw.state.Laws[z].state.issue === PassedBill[pb_law].state.issue) {
                            newLaw.state.Laws[z] = searchLaw1;
                            break;
                        }

                    }
                }
            }
            this.setState({ MyLaw: newLaw });

            var goalsPassed = 0;
            var phand = this.state.MyPlayer.state.redCards;
            for (var y = 0; y < this.state.MyParams.state.hand_size; y++) {
                var searchLaw2 = this.state.MyLaw.state.Laws.find(item => item.state.issue === phand[y].state.issue);
                if (searchLaw2 !== undefined) {
                    if(phand[y].scoreAlign(searchLaw2.state.score))
                        goalsPassed++;
                }
            }
            if (goalsPassed >= this.state.MyParams.state.hand_size)
                alert(this.state.MyPlayer.state.name + " wins!");

        }

        Slate.setState({ proposed: false, Ayes: 0, Nays: 0, blueCards: Slate.blankSlate(this.state.MyParams.state.deck_size) });

        this.setState({ MyBill: Slate });

        var MyNewPlayer = this.state.MyPlayer;
        MyNewPlayer.state = { name: MyNewPlayer.state.name, redCards: MyNewPlayer.state.redCards, money: MyNewPlayer.state.money + 1 };
        this.setState({ MyPlayer: MyNewPlayer });
    }

    joinGame(user, game) {
        axios.get("api/Game/" + game)
        .then(response => {
            const newGame = response.data;
            const newParams = new Component({});
            newParams.state = {
                gameCode: newGame.name,
                deck_size: newGame.deck_size,
                bill_size: newGame.bill_size,
                hand_size: newGame.hand_size
            };
            this.setState({
                init: true,
                playerCount: 1,
                MyParams: newParams,
                MyLaw: new Law({ game_id: game, ActiveLaw: this.blankSlate(newGame.deck_size) }),
                MyBill: new Bill({ deckSize: newGame.deck_size }),
                MyPlayer: new Player({ name: user, Params: newParams})
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
                <Login onInitGame={this.joinGame}> </Login>
            );
        } else {
            var Slate = this.state.MyBill;
            var MyLaw = this.state.MyLaw;
            var MyHand = this.state.MyPlayer;
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9 col-xs-10"><Bill Slate={Slate} onUpdate={this.reviseBill} onVote={this.handleVote} onEdit={this.replaceCard} deckSize={this.state.MyParams.state.deck_size }></Bill></div>
                        <div className="col-md-3 col-xs-2"><Law game_id={this.state.MyParams.state.gameCode} ActiveLaw={MyLaw.state.Laws} ></Law></div>
                    </div>
                    <Player Hand={MyHand}></Player>
                </div>
            );
        }
    }
}
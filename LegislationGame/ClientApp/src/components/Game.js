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
        this.reviseBill = this.reviseBill.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.replaceCard = this.replaceCard.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    reviseBill(Slate) {
        this.setState({ MyBill: Slate });
    }

    replaceCard(issue, score, key) {
        var newBill = this.state.MyBill;
        var newCards = newBill.state.blueCards;
        var repIssue = new BlueCard({ issue, score });
        newCards[key] = repIssue;
        this.state.MyBill.setState({ blueCards: newCards });
    }

    handleVote(Slate) {
        this.setState({ MyBill: Slate });
        if (Slate.Ayes + Slate.Nays < this.state.playerCount)
            return;

        if (Slate.Ayes > Slate.Nays) {
            var searchLaw = undefined;
            var newLaw = this.state.MyLaw;
            var PassedBill = Slate.blueCards;
            for (var pb_law = 0; pb_law < PassedBill.length; pb_law++) {
                searchLaw = newLaw.state.Laws.find(item => item.state.issue === PassedBill[pb_law].state.issue);

                if (searchLaw === undefined)
                    newLaw.state.Laws[newLaw.state.Laws.length] = PassedBill[pb_law];
                else {
                    searchLaw = new Issue({ issue: searchLaw.state.issue, score: searchLaw.state.score + PassedBill[pb_law].state.score });
                    for (var z = 0; z < newLaw.state.Laws.length; z++) {
                        if (newLaw.state.Laws[z].state.issue === PassedBill[pb_law].state.issue) {
                            newLaw.state.Laws[z] = searchLaw;
                            break;
                        }

                    }
                }
            }
            this.setState({ MyLaw: newLaw });

            var goalsPassed = 0;
            var phand = this.state.MyPlayer.state.redCards;
            for (var y = 0; y < this.state.MyParams.state.hand_size; y++) {
                searchLaw = this.state.MyLaw.state.Laws.find(item => item.state.issue === phand[y].state.issue);
                if (searchLaw !== undefined) {
                    if(phand[y].scoreAlign(searchLaw.state.score))
                        goalsPassed++;
                }
            }
            if (goalsPassed >= this.state.MyParams.state.hand_size)
                alert(this.state.MyPlayer.state.name + " wins!");
            
        }

        this.setState({ MyBill: new Bill({ deckSize: this.state.MyParams.state.deck_size }) });

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
                MyParams: newParams,
                MyLaw: new Law({ size: newGame.deck_size }),
                MyBill: new Bill({ deckSize: newGame.deck_size }),
                MyPlayer: new Player({ name: user, Params: newParams})
            });
            alert("Game loaded: " + newGame.name);
        })
        .catch(function (response) {
            alert("Something went wrong\n" + response);
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
                        <div className="col-md-3 col-xs-2"><Law ActiveLaw={MyLaw} size={this.state.MyParams.state.deck_size} ></Law></div>
                    </div>
                    <Player Hand={MyHand}></Player>
                </div>
            );
        }
    }
}
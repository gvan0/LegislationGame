import React, { Component } from 'react';
import Law from './Law.js';
import Bill from './Bill.js';
import Player from './Player.js';
import Issue from './Issue.js';
import BlueCard from './BlueCard.js';
import Parameters from './Parameters.js';
import './Game.css';

export class Game extends Component {
    static displayName = Game.name;

    constructor(props) {
        super(props);
        this.state = {
            blueDeckSize: 8,
            playerCount: 1,
            billSize: 2,
            handSize: 4,
            MyLaw: new Law(),
            MyBill: new Bill(),
            MyPlayer: new Player({ name: "Player 1" })
        };
        this.reviseBill = this.reviseBill.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.replaceCard = this.replaceCard.bind(this);
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
        //this.setState({ MyBill: newBill });
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
            for (var y = 0; y < this.state.handSize; y++) {
                searchLaw = this.state.MyLaw.state.Laws.find(item => item.state.issue === phand[y].state.issue);
                if (searchLaw !== undefined) {
                    if(phand[y].scoreAlign(searchLaw.state.score))
                        goalsPassed++;
                }
            }
            if (goalsPassed >= this.state.handSize)
                alert(this.state.MyPlayer.state.name + " wins!");
            
        }

        this.setState({ MyBill: new Bill() });

        var MyNewPlayer = this.state.MyPlayer;
        MyNewPlayer.state = { name: MyNewPlayer.state.name, redCards: MyNewPlayer.state.redCards, money: MyNewPlayer.state.money + 1 };
        this.setState({ MyPlayer: MyNewPlayer });
        this.forceUpdate();
    }

    render() {
        var Slate = this.state.MyBill;
        var MyLaw = this.state.MyLaw;
        var MyHand = this.state.MyPlayer;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9 col-xs-10"><Bill Slate={Slate} onUpdate={this.reviseBill} onVote={this.handleVote} onEdit={this.replaceCard}></Bill></div>
                    <div className="col-md-3 col-xs-2"><Law ActiveLaw={MyLaw}></Law></div>
                </div>
                <Player Hand={MyHand}></Player>
            </div>
        );
    }
}
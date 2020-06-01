import React, { Component } from 'react';
import Law from './Law.js';
import Bill from './Bill.js';
import Player from './Player.js';
import Parameters from './Parameters.js'
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
    }

    reviseBill(Slate) {
        this.setState({ MyBill: Slate });
    }

    handleVote(Slate) {
        //var Slate = this.state.MyBill.state;
        this.setState({ MyBill: Slate });
        if (Slate.Ayes + Slate.Nays < this.state.playerCount)
            return;

        if (Slate.Ayes > Slate.Nays) {
            var newLaw = this.state.MyLaw;
            var PassedBill = Slate.blueCards;
            for (var pb_law = 0; pb_law < PassedBill.length; pb_law++) {
                var searchLaw = newLaw.state.Laws.find(item => item.key === PassedBill[pb_law].key);
                //TODO: Check for conflicting laws
                if (searchLaw === undefined)
                    newLaw.state.Laws[newLaw.state.Laws.length] = PassedBill[pb_law];
                else if (searchLaw.impact !== PassedBill[pb_law].impact) {
                    for (var z = 0; z < newLaw.state.Laws.length; z++) {
                        if (newLaw.state.Laws[z].key === PassedBill[pb_law].key) {
                            newLaw.state.Laws[z].impact = PassedBill[pb_law].impact;
                            break;
                        }

                    }
                }
            }
            this.setState({ MyLaw: newLaw });
            //TODO: Check victory conditions
            var goalsPassed = 0;
            var phand = this.state.MyPlayer.state.redCards;
            for (var y = 0; y < this.state.handSize; y++) {
                var searchLaw = this.state.MyLaw.state.Laws.find(item => item.key === phand[y].key && item.impact === phand[y].impact);
                if (searchLaw != undefined)
                    goalsPassed++;
            }
            if (goalsPassed >= this.state.handSize)
                alert(this.state.MyPlayer.state.name + " wins!");
            
        }

        this.setState({ MyBill: new Bill() });

        //TODO: Hand out money based on voting results
        //this.state.MyPlayer.setState({ money: this.state.MyPlayer.money + 1 });
    }

    render() {
        var Slate = this.state.MyBill;
        var MyLaw = this.state.MyLaw;
        var MyHand = this.state.MyPlayer;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9 col-xs-10"><Bill Slate={this.state.MyBill} onUpdate={this.reviseBill} onVote={this.handleVote}></Bill></div>
                    <div className="col-md-3 col-xs-2"><Law ActiveLaw={MyLaw}></Law></div>
                </div>
                <Player Hand={MyHand}></Player>
            </div>
        );
    }
}
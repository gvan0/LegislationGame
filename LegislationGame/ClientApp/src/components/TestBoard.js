import React, { Component } from 'react';
import Law from './Law.js';
import TestBill from './TestBill.js';
import './Game.css';

export class TestBoard extends Component {
    static displayName = TestBoard.name;

    constructor(props) {
        super(props);
        var deck_size = this.props.match.params.size ?? 12;
        
        deck_size = Math.min(Math.max(4, deck_size), 99);
        this.state = {
            init: false,

            MyParams: {
                deck_size: deck_size,
                bill_size: 2
            },
            MyLaw: this.blankSlate(deck_size)
        };
        this.blankSlate = this.blankSlate.bind(this);
        this.handlePassage = this.handlePassage.bind(this);
    }

    blankSlate(size) {
        var blankLaw = [];
        for (var x = 0; x < size; x++) {
            var iss = { game_LawID: x, issueID: x + 1, score: 0 };
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
    }

    render() {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9 col-xs-10"><TestBill onPassLaw={this.handlePassage} deckSize={this.state.MyParams.deck_size} minSize={this.state.MyParams.bill_size}></TestBill></div>
                        <div className="col-md-3 col-xs-2"><Law game_id={this.state.game_id} ActiveLaw={this.state.MyLaw} ></Law></div>
                    </div>
                </div>
            );
    }
}
import React, { Component } from 'react';
import Issue from './Issue.js';
import RedCard from './RedCard.js';

export class TestHand extends Component {
    static displayName = TestHand.name;

    constructor(props) {
        super(props);
        this.state = {
            redCards: [],
            deck_size: 12,
            negativeOK: true,
            positiveOK: true,
            duplicateOK: false,
            zeroOK: false
        }
        this.changeDeckSize = this.changeDeckSize.bind(this);
        this.changeNegative = this.changeNegative.bind(this);
        this.changePositive = this.changePositive.bind(this);
        this.changeDuplicate = this.changeDuplicate.bind(this);
        this.changeZero = this.changeZero.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    changeDeckSize(event) {
        this.setState({ deck_size: Number(event.target.value) });
    }

    changeNegative(event) {
        this.setState({ negativeOK: event.target.checked });
    }

    changePositive(event) {
        this.setState({ positiveOK: event.target.checked });
    }

    changeDuplicate(event) {
        this.setState({ duplicateOK: event.target.checked });
    }

    changeZero(event) {
        this.setState({ zeroOK: event.target.checked });
    }

    addCard() {
        if (!this.state.duplicateOK && this.state.redCards.length >= this.state.deck_size)
            return;

        var isss = this.newIssueNumber();
        if (!this.state.duplicateOK) {
            while (this.state.redCards.find(item => item.state.issue === isss) !== undefined) {
                isss = this.newIssueNumber();
            }
        }
        var scor;
        if (!this.state.positiveOK && this.state.negativeOK)
            scor = -1;
        else if (this.state.positiveOK && !this.state.negativeOK)
            scor = 1;
        else 
            scor = (Math.random() > 0.5 ? 1 : -1);
        var redCard_dup = this.state.redCards;
        redCard_dup.push(new Issue({ issue: isss, score: scor }))
        this.setState({ redCards: redCard_dup });
    }

    removeCard(index) {
        var redCard_dup = this.state.redCards;
        redCard_dup[index].state = { issue: redCard_dup[index].state.issue, score: 0};
        this.setState({ redCards: redCard_dup.filter(item => item.state.score !== 0) });
    }

    newIssueNumber() {
        if (this.state.zeroOK)
            return Math.floor(Math.random() * (this.state.deck_size+1));
        else
            return Math.ceil(Math.random() * this.state.deck_size);
    }

    render() {
        return (
            <div className='row justify-content-center'>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Max issue size: {this.state.deck_size} </label><br />
                        <input type="range" className="form-control" value={this.state.deck_size}
                            min="4" max="44" step="1" id="deck_size" onChange={this.changeDeckSize} />
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" checked={this.state.negativeOK} onChange={this.changeNegative} /> Allow negatives
                        </label>
                        <br/>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" checked={this.state.positiveOK} onChange={this.changePositive} /> Allow positives
                        </label>
                        <br/>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" checked={this.state.duplicateOK} onChange={this.changeDuplicate} /> Allow duplicates
                        </label>
                        <br/>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" checked={this.state.zeroOK} onChange={this.changeZero} /> Allow zeroes
                        </label>
                    </div>
                    <br />
                    <button type="button" className="btn btn-primary" onClick={() => this.addCard()}> ADD </button>
                    <div className="row users-cards">
                        {this.state.redCards.map((law, index) => <RedCard key={index} issue={law.state.issue} score={law.state.score} onDiscard={() => this.removeCard(index)} > </RedCard>)}
                    </div>
                </div>
            </div>
        );
    }
}
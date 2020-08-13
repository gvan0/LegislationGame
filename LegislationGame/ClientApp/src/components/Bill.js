import React, {Component} from 'react';
import BlueCard from './BlueCard.js';
import Issue from './Issue.js';
import Issue_Bill from './Issue_Bill.js';

export default class Bill extends Component {
    static displayName = Bill.name;

    constructor(props) {
        super(props);
        if (props.Slate === undefined) {
            this.state = {
                blueCards: this.blankSlate(props.deckSize),
                proposed: false,
                deckSize: props.deckSize,
                Ayes: 0,
                Nays: 0
            };
        } else {
            this.state = {
                blueCards: props.Slate.state.blueCards,
                proposed: false,
                deckSize: props.deckSize,
                Ayes: 0,
                Nays: 0
            };

        }
        this.blankSlate = this.blankSlate.bind(this);
        this.sendProposal = this.sendProposal.bind(this);
        this.CastVote = this.CastVote.bind(this);
    }

    votes() {
        return this.state.Ayes + this.state.Nays;
    }

    blankSlate(size) {
        var blankLaw = [];
        for (var x = 0; x < size; x++) {
            var iss = new Issue({ issue: x + 1, score: 0 });
            blankLaw[x] = iss;
        }
        return blankLaw;
    }

    sendProposal() {
        var propSlate = [];
        for (var x = 0; x < this.state.blueCards.length; x++) {
            var ans = parseInt(this.state.blueCards[x].state.score);
            if (isNaN(ans))
                continue;

            if (ans !== 0)
                propSlate[propSlate.length] = this.state.blueCards[x];
        }
        this.setState({ blueCards: propSlate, proposed: true, Ayes: 0, Nays: 0 });
    }

    deck() {
        return (
            <div className="col-md-3">
                <div className="card-container">
                    <div className="card item" data-name="Blue-Deck">
                        <div className="card-inner blue">
                            <p className="card-title white-text">
                                BLUE DECK
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    CastVote(cast) {
        if (cast > 0) {
            //this.setState({ Ayes: this.state.Ayes + 1 });
            //this.props.Slate.setState({ Ayes: this.props.Slate.state.Ayes + 1 });
            this.props.Slate.state = {
                blueCards: this.props.Slate.state.blueCards,
                Ayes:this.props.Slate.state.Ayes + 1,
                Nays:this.props.Slate.state.Nays
            };
        }
        else if (cast < 0) {
            //this.setState({ Nays: this.state.Nays + 1 });
            //this.props.Slate.setState({ Nays: this.props.Slate.state.Nays + 1 });
            this.props.Slate.state = {
                blueCards: this.props.Slate.state.blueCards,
                Ayes:this.props.Slate.state.Ayes,
                Nays:this.props.Slate.state.Nays + 1
            };
        }
        this.props.onVote(this);
    }

    render() {
        const Slate = this.state.blueCards;
        if (this.state.proposed === true) {
            return (
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='row justify-content-center'>
                            <div className="page-header">
                                <h1>LEGISLATION: THE GAME</h1>
                            </div>
                        </div>
                        <div className="row blue-row">
                            {this.deck()}
                            <div className="col-md-9">
                                <div className="row users-cards">
                                    {Slate.map((law, index) => < BlueCard key={index} issue={law.state.issue} score={law.state.score} > </BlueCard>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='row justify-content-center'>
                            <div className="btn-group btn-group-justified">
                                <button className='btn-lg btn-success' onClick={() => this.CastVote(1)} > AYE </button>
                                <button className='btn-lg btn-danger' onClick={() => this.CastVote(-1)} > NAY </button>
                                <button className='btn-lg btn-primary' disabled onClick={() => this.CastVote(0)} > PRESENT </button>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='row justify-content-center'>
                            <div className="page-header">
                                <h1>LEGISLATION: THE GAME</h1>
                            </div>
                        </div>
                        <ol>
                            {Slate.map((law, index) =>
                                < Issue_Bill key={index} issue={law.state.issue} score={law.state.score} onEdit={this.props.onEdit} > </Issue_Bill>)}
                        </ol>
                    </div>
                    <div className='col-md-12'>
                        <div className='row justify-content-center'>
                            <div className="btn-group btn-group-justified">
                                <button className='btn-lg btn-primary' onClick={() => this.sendProposal()} > PROPOSE </button>
                                <button className='btn-lg btn-primary' onClick={() => alert("X")} > PUT TO VOTE </button>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
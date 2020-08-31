import React, {Component} from 'react';
import BlueCard from './BlueCard.js';
import Issue from './Issue.js';
import IssueBill from './Issue_Bill.js';
import axios from 'axios';

export default class Bill extends Component {
    static displayName = Bill.name;

    constructor(props) {
        super(props);
        this.state = {
            blueCards: this.blankSlate(props.deckSize),
            proposed: false,
            deckSize: props.deckSize,
            Ayes: 0,
            Nays: 0
        };
        this.blankSlate = this.blankSlate.bind(this);
        this.sendProposal = this.sendProposal.bind(this);
        this.amendProposal = this.amendProposal.bind(this);
        this.castVote = this.castVote.bind(this);
        this.replaceIssue = this.replaceIssue.bind(this);
    }

    blankSlate(size) {
        var blankLaw = [];
        for (var x = 0; x < size; x++) {
            var iss = new Issue({ issue: x + 1, score: 0 });
            blankLaw.push(iss);
        }
        return blankLaw;
    }

    sendProposal() {
        this.setState({proposed: true, Ayes: 0, Nays: 0 });
    }

    replaceIssue(key, score) {
        var newBlue = this.state.blueCards;
        var newIssue = new Issue({ issue: key, score: score });
        newBlue[key-1] = newIssue
        this.setState({ blueCards: newBlue });

    }

    amendProposal() {
        this.setState({proposed: false });
    }

    closeVote() {
        if (this.state.Ayes > this.state.Nays) {
            this.props.onPassLaw(this.state.blueCards);
        }
        this.setState({ proposed: false, Ayes: 0, Nays: 0, blueCards: this.blankSlate(this.state.deckSize)})
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

    castVote(cast) {
        //TODO: axios.put

        if (cast > 0) {
            this.setState({ Ayes: this.state.Ayes + 1 });
        }
        else if (cast < 0) {
            this.setState({ Nays: this.state.Nays + 1 });
        }
    }

    render() {
        const Slate = this.state.blueCards;
        if (this.state.proposed === true) {
            return (
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className="row blue-row">
                            <div className="col-md-12">
                                <div className="row users-cards">
                                    {Slate.filter(item => item.state.score !== 0).map((law, index) => < BlueCard key={index} issue={law.state.issue} score={law.state.score} > </BlueCard>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='row justify-content-center'>
                            <div className="btn-group btn-group-justified">
                                <button className='btn-lg btn-success' onClick={() => this.castVote(1)} > AYE ({this.state.Ayes}) </button>
                                <button className='btn-lg btn-danger' onClick={() => this.castVote(-1)} > NAY ({this.state.Nays}) </button>
                                <button className='btn-lg btn-primary' disabled onClick={() => this.castVote(0)} > PRESENT </button>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <button className='btn-lg btn-warning' onClick={() => this.amendProposal()} > AMEND </button>
                            <button className='btn-lg btn-dark' disabled={this.state.Ayes + this.state.Nays === 0} onClick={() => this.closeVote()} > CLOSE VOTE </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <ol>
                            {Slate.map((law, index) =>
                                < IssueBill key={index} issue={law.state.issue} score={law.state.score} onEdit={this.replaceIssue} />)}
                        </ol>
                    </div>
                    <div className='col-md-12'>
                        <div className='row justify-content-center'>
                            <div className="btn-group btn-group-justified">
                                <button className='btn-lg btn-primary' onClick={() => this.sendProposal()} > OPEN VOTE </button>
                                <button className='btn-lg btn-primary' onClick={() => alert("X")} > PROPOSE </button>
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
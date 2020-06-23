import React, {Component} from 'react';
import BlueCard from './BlueCard.js';

export default class Bill extends Component {
    static displayName = Bill.name;

    constructor(props) {
        super(props);
        if (props.Slate === undefined) {
            this.state = {
                blueCards: [],
                deckSize: props.deckSize,
                Ayes: 0,
                Nays: 0
            };
        } else {
            this.state = {
                blueCards: props.Slate.state.blueCards,
                deckSize: props.deckSize,
                Ayes: 0,
                Nays: 0
            };

        }
        this.CastVote = this.CastVote.bind(this);
        this.createBlueCards = this.createBlueCards.bind(this);
        this.addAcard = this.addAcard.bind(this);
    }

    createBlueCards(size,mounted){
        var builtSlate = [];
        if (this.props !== undefined) {
            if(this.props.Slate !== undefined)
                builtSlate = this.props.Slate.state.blueCards;
        }
        if (builtSlate.length === this.state.billSize)
            return (builtSlate);
        while (builtSlate.length < size) {
            var pickissue = Math.floor(Math.random() * this.state.deckSize) + 1;
            if (builtSlate.find(item => item.state.issue === pickissue) === undefined) {
                var newissue = new BlueCard({ issue: pickissue, score: (Math.random() >= 0.5 ? 1 : -1) });
                builtSlate[builtSlate.length] = newissue;
            }
        }
        if(mounted)
            this.setState({ blueCards: builtSlate });
        return (builtSlate);
    }

    votes() {
        return this.state.Ayes + this.state.Nays;
    }

    addAcard() {
        this.props.Slate.state.blueCards = this.createBlueCards(this.props.Slate.state.blueCards.length + 1, true);
        //this.props.onUpdate(this.props.Slate);
    }

    deck() {
        return (
            <div className="col-md-3">
                <div className="card-container">
                    <div className="card item" data-name="Blue-Deck">
                        <div className="box white">
                            <p className="draw-a-card" onClick={() => this.addAcard()}>
                                DRAW A CARD
                            </p>
                        </div>
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

    emptySpot() {
        return (
            <div className="col-md-4">
                <div className="card-container">
                    <div className="card item" data-name="card-3">
                        <div className="card-inner white empty">
                            <p className="card-title ">EMPTY
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    ThisBill(props) {
        const slate = props.issues;
        const slatePrint = slate.map((issue) => <BlueCard issue={issue}></BlueCard>);
        return (
            <div>{slatePrint}</div>
        );
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
        this.props.onVote(this.props.Slate.state);
    }

    render() {
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
                                {this.props.Slate.state.blueCards.map((law, index) => < BlueCard key={index} issue={law.state.issue} score={law.state.score} onEdit={this.props.onEdit} > </BlueCard>)}
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
    }
}
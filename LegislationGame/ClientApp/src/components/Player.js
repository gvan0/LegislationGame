import React, { Component } from 'react';
import RedCard from './RedCard.js';

export default class Player extends Component {
    static displayName = Player.name;

    constructor(props) {
        super(props);
        if (props.Hand === undefined) {
            this.state = {
                name: props.name,
                MyParams: props.Params,
                redCards: this.createRedCards(props.Params.state.hand_size, props.Params.state.deck_size,false),
                money: 4
            };
        } else {
            this.state = {
                name: props.Hand.state.name,
                MyParams: props.Params,
                redCards: props.Hand.state.redCards,
                money: props.Hand.state.money
            };
        }
        this.createRedCards = this.createRedCards.bind(this);
    }

    createRedCards(redSize, blueSize, mounted) {
        var builtSlate = [];
        while (builtSlate.length < redSize) {
            var pickissue = Math.floor(Math.random() * blueSize) + 1;
            if (builtSlate.find(item => item.state.issue === pickissue) === undefined) {
                var newissue = new RedCard({ issue: pickissue, score: (Math.random() >= 0.5 ? 1 : -1) });
                builtSlate[builtSlate.length] = newissue;
            }
        }
        if (mounted)
            this.setState({ redCards: builtSlate });
        return (builtSlate);

    }

    emptySpace(){
        return(
            <div className="col-md-2">
                <div className="card-container">
                    <div className="card item" data-name="card-3">
                        <div className="card-inner white empty">
                            <p className="card-title ">EMPTY</p>
                    </div>
                </div>
            </div>
        </div>
        )
    }


    render() {
        return (
            <div>
                <div className="page-header"><h1>MY HAND</h1></div>

                <div>{this.props.Hand.state.name}</div>
                <div className='col-md-8'>
                    <div className="row users-cards">
                        {this.props.Hand.state.redCards.map((law, index) => < RedCard Issue={law} key={index} > </RedCard>)}
                    </div>
                </div>
                <p>Money: {this.props.Hand.state.money}</p>
            </div>

        );
    }
}
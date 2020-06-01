import React, { Component } from 'react';
import RedCard from './RedCard.js';

export default class Player extends Component {
    static displayName = Player.name;

    constructor(props) {
        super(props);
        if (props.Hand == undefined) {
            this.state = {
                name: props.name,
                redCards: this.createRedCards(),
                money: 4
            };
        } else {
            this.state = {
                name: props.Hand.state.name,
                redCards: props.Hand.state.redCards,
                money: props.Hand.state.money
            };
        }
        this.createRedCards = this.createRedCards.bind(this);
    }

    createRedCards() {
        const iconOptions = ["", "fas fa-handshake", "fas fa-balance-scale", "fas fa-book", "fas fa-flag-usa", "fas fa-piggy-bank", "fas fa-dove", "fas fa-baby", "fas fa-bell"];
        var builtSlate = [];
        while (builtSlate.length < 4) {
            var pickissue = Math.floor(Math.random() * 8) + 1;
            if (builtSlate.find(item => item.key == pickissue) == undefined) {
                var newissue = { key: pickissue, icon: iconOptions[pickissue], impact: (Math.random() >= 0.5 ? "+" : "-") }
                builtSlate[builtSlate.length] = newissue;
            }
        }
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

                <div>{this.state.name}</div>
                <div className='col-md-8'>
                    <div className="row users-cards">
                        {this.state.redCards.map(law => < RedCard key={law.key} cardInfo={law} > </RedCard>)}
                        {this.emptySpace()}
                    </div>
                </div>
                <p>Money: {this.state.money}</p>
            </div>

        );
    }
}
import React, { Component } from 'react';
import RedCard from './RedCard.js';
import Issue from './Issue'
import axios from 'axios';

export default class Player extends Component {
    static displayName = Player.name;

    constructor(props) {
        super(props);
        /*if (props.Hand === undefined) {
            this.state = {
                name: props.name,
                redCards: this.createRedCards(props.Params.state.hand_size, props.Params.state.deck_size,false),
                money: 4
            };
        } else {
            this.state = {
                name: props.Hand.state.name,
                redCards: props.Hand.state.redCards,
                money: props.Hand.state.money
            };
        }*/
        this.state = {
            game: props.game_id,
            player: props.user_id,
            redCards: []
        }
        this.createRedCards = this.createRedCards.bind(this);
    }


    componentDidMount() {
        axios.get("api/Game/" + this.props.game_id + "/" + this.props.user_id)
            .then(response => {
                const newPlay = response.data;
                this.setState({
                    redCards: newPlay.redCards.map(item => new Issue({issue: item.issueID, score: item.score})),
                    money: newPlay.money
                });
            })
            .catch(function (response) {
                alert("Something went wrong: Player.js\n" + response);
            });
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

    render() {
        return (
            <div>
                <div className="page-header"><h1>MY HAND</h1></div>

                <div>{this.state.name}</div>
                <div className='col-md-8'>
                    <div className="row users-cards">
                        {this.state.redCards.map((law, index) => < RedCard Issue={law} key={index} > </RedCard>)}
                    </div>
                </div>
                <p>Money: {this.state.money}</p>
            </div>

        );
    }
}
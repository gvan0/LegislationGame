import React, { Component } from 'react';
import RedCard from './RedCard.js';
import Issue from './Issue'
import axios from 'axios';

export default class Player extends Component {
    static displayName = Player.name;

    constructor(props) {
        super(props);
        this.state = {
            game: props.game_id,
            player: props.user_id,
            redCards: []
        }
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

    render() {
        return (
            <div>
                <div className="page-header"><h1>MY HAND</h1></div>

                <p>{this.state.player}</p>
                <div className='row justify-content-center'>
                    <div className="col-md-12">
                        <div className="row users-cards">
                            {this.state.redCards.map((law, index) => < RedCard key={index} issue={law.state.issue} score={law.state.score} > </RedCard>)}
                        </div>
                    </div>
                </div>
                <p>Money: {this.state.money}</p>
            </div>

        );
    }
}
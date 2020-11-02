import React, { Component } from 'react';
import Issue from './Issue.js';
import './Law.css';

export default class Law extends Component {
    static displayName = Law.name;

    constructor(props) {
        super(props);
        this.state = {
            game_id: props.game_id,
            pushUpdate: () => {alert("x")}
        };
        this.currentBillSize = this.currentBillSize.bind(this);
    }

    currentBillSize(abs) {
        var billScores = this.props.ActiveLaw.map(item => item.score);
        if (abs)
            billScores = billScores.map(item => Math.abs(item));
        return billScores.reduce((total, num) => total + num, 0);
    }

    /*componentDidMount() {
        axios.get("api/Game/" + this.state.game_id)
            .then(response => {
                const newGame = response.data;
                this.setState({
                    Laws: newGame.law
                });
            })
            .catch(function (response) {
                alert("Something went wrong: Law.js\n" + response);
            });
    }*/

    render() {
        var getlaws = this.props.ActiveLaw;
        return (
            <div id="LAWS" className='page-header'>
                <h1>ACTIVE LAWS</h1>
                <ol className='activeLaws'>
                    {getlaws.map(item =>
                        <Issue key={item.game_LawID} issue={item.issueID} score={item.score} ></Issue>
                    )}
                </ol>
                <p>Law size: {this.currentBillSize(true)}<br />Law cost: {this.currentBillSize(false)}</p>
            </div>
        );
}
}
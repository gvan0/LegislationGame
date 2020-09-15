import React, { Component } from 'react';
import Issue from './Issue.js';
import './Law.css';
import axios from 'axios';

export default class Law extends Component {
    static displayName = Law.name;

    constructor(props) {
        super(props);
        this.state = {
            game_id: props.game_id,
            Laws: props.ActiveLaw,
            pushUpdate: () => {alert("x")}
        };
    }

    componentDidMount() {
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
    }

    render() {
        var getlaws = this.props.ActiveLaw;
        return (
            <div id="LAWS" className='page-header'>
                <h1>ACTIVE LAWS</h1>
                <ol className='activeLaws'>
                    {getlaws.map(item =>
                        <Issue key={item.state.issue} issue={item.state.issue} score={item.state.score} ></Issue>
                    )}
                </ol>
            </div>
        );
}
}
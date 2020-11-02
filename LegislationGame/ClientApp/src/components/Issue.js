import React, { Component } from 'react';

export default class Issue extends Component {
    static displayName = Issue.name;

    iconOptions(indx) {
        var options = ["empty", "fas fa-ambulance", "fas fa-bone", "fas fa-cog", "fas fa-dragon",
            "fas fa-eye", "fas fa-fingerprint", "fas fa-gas-pump", "fas fa-horse-head", "fas fa-industry",
            "fas fa-joint", "fas fa-key", "fas fa-link", "fas fa-moon", "fas fa-newspaper",
            "fas fa-oil-can", "fas fa-pepper-hot", "fas fa-quidditch", "fas fa-robot", "fas fa-satellite",
            "fas fa-trophy", "fas fa-utensils", "fas fa-virus", "fas fa-wheelchair", "fas fa-x-ray",
            "fas fa-atom", "fas fa-bullhorn", "fas fa-cloud-rain", "fas fa-dumpster", "fas fa-exclamation-triangle",
            "fas fa-fan", "fas fa-guitar", "fas fa-helicopter", "fas fa-id-card", "fas fa-keyboard",
            "fas fa-landmark", "fas fa-microchip", "fas fa-notes-medical", "fas fa-otter", "fas fa-paw",
            "fas fa-radiation", "fas fa-sun", "fas fa-tablet-alt", "fas fa-user-secret", "fas fa-vial"];
        return options[indx];
    }

    constructor(props) {
        super(props);
        this.state = {
            issue: props.issue,
            score: props.score
        };
        this.scoreAlign = this.scoreAlign.bind(this);
        this.iconOptions = this.iconOptions.bind(this);
        this.scoreString = this.scoreString.bind(this);
    }

    scoreAlign(ans) {
        var scor = this.props.score;
        if(ans === undefined || ans === 0)
            return (scor === 0);
        else if (scor > 0)
            return (ans >= scor);
        else if (scor < 0)
            return (ans <= scor);
        else 
            return (ans === scor);
    }

    scoreString() {
        var scor = this.props.score;
        if (scor > 0)
            return "+" + (scor > 1 ? scor : "");
        else if (scor < 0)
            return "—" + (scor < -1 ? -scor : "");
        else
            return "O";
    }

    render() {
        return (
                <li> <i className={this.iconOptions(this.props.issue)}></i> : {this.props.score}</li>
        );
    }


}
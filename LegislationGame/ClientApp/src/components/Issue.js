﻿import React, { Component } from 'react';

export default class Issue extends Component {
    static displayName = Issue.name;

    iconOptions() {
        return ["empty", "fas fa-ambulance", "fas fa-bone", "fas fa-cog", "fas fa-dragon",
            "fas fa-eye", "fas fa-fan", "fas fa-gas-pump", "fas fa-horse-head", "fas fa-industry",
            "fas fa-joint", "fas fa-key", "fas fa-link", "fas fa-moon", "fas fa-newspaper",
            "fas fa-oil-can", "fas fa-pepper-hot", "fas fa-quidditch", "fas fa-robot", "fas fa-satellite",
            "fas fa-trophy", "fas fa-utensils", "fas fa-virus", "fas fa-wheelchair", "fas fa-water",
            "fas fa-atom", "fas fa-bullhorn", "fas fa-cloud-rain", "fas fa-dumpster", "fas fa-flag-exclamation",
            "fas fa-fingerprint", "fas fa-guitar", "fas fa-helicopter", "fas fa-id-card", "fas fa-keyboard",
            "fas fa-landmark", "fas fa-microchip", "fas fa-notes-medical", "fas fa-otter", "fas fa-paw",
            "fas fa-radiation", "fas fa-sun", "fas fa-tablet-alt", "fas fa-user-secret", "fas fa-vial"];
    }

    constructor(props) {
        super(props);
        this.state = {
            issue: props.issue,
            icon: this.iconOptions()[props.issue],
            score: props.score
        };
        this.scoreAlign = this.scoreAlign.bind(this);
        this.iconOptions = this.iconOptions.bind(this);
    }

    scoreAlign(ans) {
        var scor = this.state.score;
        if(ans === undefined || ans === 0)
            return (scor === 0);
        else if (scor > 0)
            return (ans >= scor);
        else if (scor < 0)
            return (ans <= scor);
        else 
            return (ans === scor);
    }

    render() {
        return (
                <li> <i className={this.state.icon}></i> : {this.props.score}</li>
        );
    }


}
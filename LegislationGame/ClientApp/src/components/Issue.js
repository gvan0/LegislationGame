import React, { Component } from 'react';

export default class Issue extends Component {
    static displayName = Issue.name;

    iconOptions(indx) {
        var options = ["skull-crossbones", "ambulance", "bone", "cog", "dragon",
            "eye", "fingerprint", "gas-pump", "horse-head", "industry",
            "joint", "key", "link", "moon", "newspaper",
            "oil-can", "pepper-hot", "quidditch", "robot", "satellite",
            "trophy", "utensils", "virus", "wheelchair", "x-ray",
            "atom", "bullhorn", "cloud-rain", "dumpster", "eraser",
            "fan", "guitar", "helicopter", "id-card", "keyboard",
            "landmark", "microchip", "notes-medical", "otter", "paw",
            "radiation", "sun", "tooth", "user-secret", "vial"];
        return "fas fa-" + options[indx % options.length];
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
        var absScor = Math.abs(scor);
        if (scor > 0)
            return (<b><i className='fas fa-plus'></i>{(absScor > 1) && (absScor)}</b>);
        else if (scor < 0)
            return (<b><i className='fas fa-minus'></i>{(absScor > 1) && (absScor)}</b>);
        else
            return (<b>O</b>);
    }

    render() {
        return (
            <li> <i className={this.iconOptions(this.props.issue)}></i> : {this.props.score}</li>
        );
    }


}
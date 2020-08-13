import React from 'react';
import Issue from './Issue.js'

export default class Issue_Bill extends Issue {
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
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.bumpScoreChange = this.bumpScoreChange.bind(this);
    }

    bumpScoreChange(event) {
        var ans = parseInt(event.target.value);
        if (isNaN(ans))
            return;

        ans += this.state.score;
        this.setState({ score: ans });
        this.props.onEdit(this.state.issue, ans);
    }

    handleScoreChange(event) {
        var ans = parseInt(event.target.value);
        if (isNaN(ans))
            return;

        this.setState({ score: ans });
        this.props.onEdit(this.state.issue, ans);
    }

    

    render() {
        return (
            <li>
                <div className="input-group input-group-lg mb-2">
                    <div className="input-group-prepend"><span className="input-group-text"><span className={this.state.icon}></span></span></div>
                    <button className="btn btn-dark" value="-1" onClick={this.handleScoreChange}> ◄ </button>
                    <input className="form-control" type="text" value={this.state.score} onChange={this.handleScoreChange} />
                    <button className="btn btn-dark" value="1" onClick={this.handleScoreChange}> ► </button>
                </div>
            </li>
        );
    }


}
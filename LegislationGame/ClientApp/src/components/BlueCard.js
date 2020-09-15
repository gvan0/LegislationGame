import React from 'react';
import Issue from './Issue.js';

export default class BlueCard extends Issue {
    static displayName = BlueCard.name;

    iconOptions() {
        return ["empty", "fas fa-ambulance", "fas fa-bone", "fas fa-cog", "fas fa-dragon",
            "fas fa-eye", "fas fa-fingerprint", "fas fa-gas-pump", "fas fa-horse-head", "fas fa-industry",
            "fas fa-joint", "fas fa-key", "fas fa-link", "fas fa-moon", "fas fa-newspaper",
            "fas fa-oil-can", "fas fa-pepper-hot", "fas fa-quidditch", "fas fa-robot", "fas fa-satellite",
            "fas fa-trophy", "fas fa-utensils", "fas fa-virus", "fas fa-wheelchair", "fas fa-water",
            "fas fa-atom", "fas fa-bullhorn", "fas fa-cloud-rain", "fas fa-dumpster", "fas fa-flag-exclamation",
            "fas fa-fan", "fas fa-guitar", "fas fa-helicopter", "fas fa-id-card", "fas fa-keyboard",
            "fas fa-landmark", "fas fa-microchip", "fas fa-notes-medical", "fas fa-otter", "fas fa-paw",
            "fas fa-radiation", "fas fa-sun", "fas fa-tablet-alt", "fas fa-user-secret", "fas fa-vial"];
    }

    constructor(props) {
        super(props);
        this.state = {
            issue: this.props.issue,
            icon: this.iconOptions()[this.props.issue],
            score: this.props.score,
            edit: false
        };
        this.handleIssueChange = this.handleIssueChange.bind(this);
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.bumpIssue = this.bumpIssue.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.iconOptions = this.iconOptions.bind(this);
    }

    bumpIssue(event) {
        var ans = parseInt(event.target.value);
        if (isNaN(ans))
            return;

        ans += this.state.issue;
        this.setState({ issue: ans, icon: this.iconOptions()[ans]});
    }

    handleIssueChange(event) {
        var ans = parseInt(event.target.value);
        if (!isNaN(ans) && ans > 0)
            this.setState({ issue: ans, icon: this.iconOptions()[ans]});
    }
    handleScoreChange(event) {
        var ans = parseInt(event.target.value);
        if (!isNaN(ans))
            this.setState({ score: ans });
    }

    saveChanges() {
        this.setState({edit: false });
        this.props.onEdit(this.state.issue, this.state.score, this._reactInternalFiber.key);
    }

    render() {
        return (
            <div className="col-md-3">
                <div className="card-container">
                    <div className="card item" data-name="card-1">
                        <div className="box blue">
                            <p className="draw-a-card white-text">
                                CARD {this.state.issue}
                            </p>
                        </div>
                        <div className="card-inner white icon">
                            <i className={this.state.icon}></i>
                            <p className="card-title ">
                                {this.state.score > 0 ? "►" :
                                    this.state.score < 0 ? "◄" : "O"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}